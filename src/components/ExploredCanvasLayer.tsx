import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import type { LatLng } from '../Algorithm/types';

const EXPLORED_NODE_RADIUS = 4;
const EXPLORED_NODE_COLOR = 'rgba(59, 130, 246, 0.5)';

interface Props {
  positions: LatLng[];
}

/**
 * Renders all explored positions on a single HTML canvas instead of
 * individual React CircleMarker components.
 *
 * Optimisations:
 * - Viewport culling: only draws nodes that fall within the current map bounds.
 * - Redraws only on `viewreset`, `moveend`, and `zoomend` (not on every frame
 *   during active panning / zooming) to avoid overloading the renderer.
 * - Uses requestAnimationFrame so redraws never block the main thread.
 */
export function ExploredCanvasLayer({ positions }: Props) {
  const map = useMap();

  // Keep a mutable ref so map event callbacks always see the latest positions
  // without needing to be re-registered on every render.
  const positionsRef = useRef(positions);
  const animFrameRef = useRef(0);
  const scheduleRef = useRef<(() => void) | null>(null);

  positionsRef.current = positions;

  useEffect(() => {
    const pane = map.getPanes().overlayPane;
    if (!pane) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.pointerEvents = 'none';
    pane.appendChild(canvas);

    function redraw() {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (positionsRef.current.length === 0) return;

      // Only draw points inside the current viewport (with a small padding)
      const bounds = map.getBounds().pad(0.1);
      ctx.fillStyle = EXPLORED_NODE_COLOR;

      for (const pos of positionsRef.current) {
        if (!bounds.contains(L.latLng(pos.lat, pos.lng))) continue;
        const pt = map.latLngToContainerPoint(L.latLng(pos.lat, pos.lng));
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, EXPLORED_NODE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function schedule() {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(redraw);
    }

    // Reposition the canvas to cover the visible map area and schedule a redraw.
    // The canvas lives inside overlayPane which Leaflet CSS-transforms during
    // panning, so we only need to reset on viewreset / moveend / zoomend.
    function reset() {
      const topLeft = map.containerPointToLayerPoint(L.point(0, 0));
      L.DomUtil.setPosition(canvas, topLeft);
      const size = map.getSize();
      canvas.width = size.x;
      canvas.height = size.y;
      schedule();
    }

    scheduleRef.current = schedule;
    map.on('viewreset moveend zoomend', reset);
    reset();

    return () => {
      map.off('viewreset moveend zoomend', reset);
      cancelAnimationFrame(animFrameRef.current);
      pane.removeChild(canvas);
      scheduleRef.current = null;
    };
  }, [map]);

  // When the positions array changes, trigger a canvas redraw without touching
  // the DOM structure.
  useEffect(() => {
    scheduleRef.current?.();
  }, [positions]);

  return null;
}
