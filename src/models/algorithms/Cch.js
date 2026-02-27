import PathfindingAlgorithm from "./PathfindingAlgorithm";

/**
 * Customizable Contraction Hierarchies (CCH).
 *
 * CCH separates preprocessing into two phases:
 *   Phase 1 – Topology (metric-independent): build the hierarchy order.
 *     Here we use a geographic ordering (sort by lat+lng) instead of the
 *     degree-based ordering used by plain CH.  This gives a visually
 *     different exploration pattern.
 *   Phase 2 – Metric customization: apply actual edge weights (fast, O(m)).
 *
 * Query: same bidirectional Dijkstra on the upward graph as CH.
 *
 * Like Ch.js, the full query is pre-computed in start(); nextStep() replays
 * the exploration sequence one node at a time for the animation.
 */
class Cch extends PathfindingAlgorithm {
    constructor() {
        super();
        this.steps = [];
        this.stepIndex = 0;
    }

    // ── Witness search (same as CH) ───────────────────────────────────────────
    _witnessSearch(fwdAdj, src, target, skip, maxCost, maxNodes = 50) {
        const dist = new Map([[src, 0]]);
        const visited = new Set();
        const pq = [{ id: src, cost: 0 }];

        while (pq.length > 0) {
            pq.sort((a, b) => a.cost - b.cost);
            const { id: cur, cost } = pq.shift();
            if (visited.has(cur)) continue;
            if (cost > maxCost) break;
            visited.add(cur);
            if (cur === target) return cost;
            if (visited.size >= maxNodes) break;

            for (const { to, weight } of fwdAdj.get(cur) ?? []) {
                if (to === skip || visited.has(to)) continue;
                const nd = cost + weight;
                if (nd <= maxCost && nd < (dist.get(to) ?? Infinity)) {
                    dist.set(to, nd);
                    pq.push({ id: to, cost: nd });
                }
            }
        }
        return dist.get(target) ?? Infinity;
    }

    start(startNode, endNode) {
        super.start(startNode, endNode);
        this.steps = [];
        this.stepIndex = 0;

        // ── Collect all nodes ────────────────────────────────────────────────
        const nodeMap = new Map();
        const seen = new Set([startNode.id]);
        const bfsQ = [startNode];
        while (bfsQ.length > 0) {
            const n = bfsQ.shift();
            nodeMap.set(n.id, n);
            for (const { node: nb } of n.neighbors) {
                if (!seen.has(nb.id)) { seen.add(nb.id); bfsQ.push(nb); }
            }
        }
        const allIds = Array.from(nodeMap.keys());

        // ── Build mutable adjacency lists ────────────────────────────────────
        const fwdAdj = new Map();
        const revAdj = new Map();
        for (const id of allIds) { fwdAdj.set(id, []); revAdj.set(id, []); }
        for (const [id, node] of nodeMap) {
            for (const { node: nb, edge } of node.neighbors) {
                fwdAdj.get(id).push({ to: nb.id, weight: edge.weight });
                revAdj.get(nb.id).push({ to: id, weight: edge.weight });
            }
        }

        // ── Phase 1: Topology ordering – geographic sort (lat + lng) ─────────
        // Nodes near the "bottom-left" of the bounding box are contracted first.
        // This is metric-independent and reusable across weight changes.
        const order = [...allIds].sort((a, b) => {
            const na = nodeMap.get(a);
            const nb = nodeMap.get(b);
            return (na.latitude + na.longitude) - (nb.latitude + nb.longitude);
        });
        const level = new Map();
        order.forEach((id, i) => level.set(id, i));

        // ── Phase 2: Metric customization – contraction with actual weights ───
        const contracted = new Set();
        for (const v of order) {
            contracted.add(v);
            const inEdges  = (revAdj.get(v) ?? []).filter(e => !contracted.has(e.to));
            const outEdges = (fwdAdj.get(v) ?? []).filter(e => !contracted.has(e.to));

            for (const { to: u, weight: wu } of inEdges) {
                for (const { to: w, weight: wv } of outEdges) {
                    if (u === w) continue;
                    const scCost = wu + wv;
                    const witness = this._witnessSearch(fwdAdj, u, w, v, scCost);
                    if (witness > scCost) {
                        fwdAdj.get(u).push({ to: w, weight: scCost });
                        revAdj.get(w).push({ to: u, weight: scCost });
                    }
                }
            }
        }

        // ── Build upward graph ────────────────────────────────────────────────
        const upEdges   = new Map();
        const downEdges = new Map();
        for (const id of allIds) { upEdges.set(id, []); downEdges.set(id, []); }
        for (const [u, edges] of fwdAdj) {
            const lu = level.get(u);
            for (const { to: w, weight } of edges) {
                const lw = level.get(w);
                if (lw > lu) {
                    upEdges.get(u).push({ to: w, weight });
                    downEdges.get(w).push({ to: u, weight });
                }
            }
        }

        // ── Bidirectional Dijkstra on CCH graph ───────────────────────────────
        const distF = new Map();
        const distB = new Map();
        const parentF = new Map([[startNode.id, null]]);
        const parentB = new Map([[endNode.id, null]]);
        const visitedF = new Set();
        const visitedB = new Set();
        for (const id of allIds) { distF.set(id, Infinity); distB.set(id, Infinity); }
        distF.set(startNode.id, 0);
        distB.set(endNode.id, 0);

        const pqF = [{ id: startNode.id, cost: 0 }];
        const pqB = [{ id: endNode.id,   cost: 0 }];
        const explorationF = [];
        const explorationB = [];

        let bestDist = Infinity;
        let meetId = null;

        while (pqF.length > 0 || pqB.length > 0) {
            if (pqF.length > 0) {
                pqF.sort((a, b) => a.cost - b.cost);
                const { id: cur, cost } = pqF.shift();
                if (!visitedF.has(cur) && cost <= bestDist) {
                    visitedF.add(cur);
                    explorationF.push({ id: cur, parentId: parentF.get(cur) ?? null });
                    const total = cost + (distB.get(cur) ?? Infinity);
                    if (total < bestDist) { bestDist = total; meetId = cur; }
                    for (const { to, weight } of upEdges.get(cur) ?? []) {
                        if (visitedF.has(to)) continue;
                        const nd = cost + weight;
                        if (nd < (distF.get(to) ?? Infinity)) {
                            distF.set(to, nd);
                            parentF.set(to, cur);
                            pqF.push({ id: to, cost: nd });
                        }
                    }
                }
            }
            if (pqB.length > 0) {
                pqB.sort((a, b) => a.cost - b.cost);
                const { id: cur, cost } = pqB.shift();
                if (!visitedB.has(cur) && cost <= bestDist) {
                    visitedB.add(cur);
                    explorationB.push({ id: cur, parentId: parentB.get(cur) ?? null });
                    const total = (distF.get(cur) ?? Infinity) + cost;
                    if (total < bestDist) { bestDist = total; meetId = cur; }
                    for (const { to, weight } of downEdges.get(cur) ?? []) {
                        if (visitedB.has(to)) continue;
                        const nd = cost + weight;
                        if (nd < (distB.get(to) ?? Infinity)) {
                            distB.set(to, nd);
                            parentB.set(to, cur);
                            pqB.push({ id: to, cost: nd });
                        }
                    }
                }
            }
        }

        // ── Build animation step sequence ─────────────────────────────────────
        const maxLen = Math.max(explorationF.length, explorationB.length);
        for (let i = 0; i < maxLen; i++) {
            if (i < explorationF.length) {
                const { id, parentId } = explorationF[i];
                this.steps.push({
                    node: nodeMap.get(id),
                    referer: parentId ? nodeMap.get(parentId) : null,
                });
            }
            if (i < explorationB.length) {
                const { id, parentId } = explorationB[i];
                this.steps.push({
                    node: nodeMap.get(id),
                    referer: parentId ? nodeMap.get(parentId) : null,
                });
            }
        }

        // ── Reconstruct path and set parent pointers ──────────────────────────
        if (meetId) {
            const fwdPath = [];
            let cur = meetId;
            while (cur !== null) {
                fwdPath.unshift(nodeMap.get(cur));
                cur = parentF.get(cur) ?? null;
            }
            const bwdPath = [];
            let b = parentB.get(meetId) ?? null;
            while (b !== null) {
                bwdPath.push(nodeMap.get(b));
                b = parentB.get(b) ?? null;
            }
            const fullPath = [...fwdPath, ...bwdPath];
            for (let i = 1; i < fullPath.length; i++) {
                fullPath[i].parent = fullPath[i - 1];
            }
        }
    }

    nextStep() {
        if (this.stepIndex >= this.steps.length) {
            this.finished = true;
            return [];
        }

        const { node, referer } = this.steps[this.stepIndex++];
        node.visited = true;
        node.referer = referer;

        if (this.stepIndex >= this.steps.length) {
            this.finished = true;
        }

        return [node];
    }
}

export default Cch;
