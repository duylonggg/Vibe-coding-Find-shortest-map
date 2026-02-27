import PathfindingAlgorithm from "./PathfindingAlgorithm";

/**
 * ALT – A* with Landmarks and Triangle Inequality.
 *
 * Preprocessing (in start()):
 *   1. Pick k geographically-extreme landmark nodes.
 *   2. Run single-source Dijkstra from each landmark.
 *
 * Heuristic for node v toward target t:
 *   h(v) = max(euclidean(v, t),  max_L { d(L,t) - d(L,v) })
 *
 * Query: plain A* using h(v) as distanceToEnd.
 */
class Alt extends PathfindingAlgorithm {
    constructor() {
        super();
        this.openList = [];
        this.closedList = [];
        this.lmDists = [];
    }

    /** Dijkstra from sourceNode over the graph, returns Map<nodeId, dist>. */
    _dijkstraFrom(sourceNode) {
        const dist = new Map();
        const visited = new Set();
        const pq = [{ node: sourceNode, cost: 0 }];
        dist.set(sourceNode.id, 0);

        while (pq.length > 0) {
            pq.sort((a, b) => a.cost - b.cost);
            const { node: cur, cost } = pq.shift();
            if (visited.has(cur.id)) continue;
            visited.add(cur.id);
            for (const { node: nb, edge } of cur.neighbors) {
                if (visited.has(nb.id)) continue;
                const nd = cost + edge.weight;
                if (nd < (dist.get(nb.id) ?? Infinity)) {
                    dist.set(nb.id, nd);
                    pq.push({ node: nb, cost: nd });
                }
            }
        }
        return dist;
    }

    /** Collect all reachable nodes from startNode via BFS. */
    _collectNodes(startNode) {
        const nodes = [];
        const seen = new Set([startNode.id]);
        const q = [startNode];
        while (q.length > 0) {
            const n = q.shift();
            nodes.push(n);
            for (const { node: nb } of n.neighbors) {
                if (!seen.has(nb.id)) {
                    seen.add(nb.id);
                    q.push(nb);
                }
            }
        }
        return nodes;
    }

    start(startNode, endNode) {
        super.start(startNode, endNode);

        const allNodes = this._collectNodes(startNode);

        // Select up to 4 geographically extreme landmarks
        const byLat = [...allNodes].sort((a, b) => a.latitude - b.latitude);
        const byLng = [...allNodes].sort((a, b) => a.longitude - b.longitude);
        const lmSet = new Set([
            byLat[0],
            byLat[byLat.length - 1],
            byLng[0],
            byLng[byLng.length - 1],
        ]);

        this.lmDists = [...lmSet].map(lm => this._dijkstraFrom(lm));

        // Initialize A* open/closed lists
        this.openList = [startNode];
        this.closedList = [];
        startNode.distanceFromStart = 0;
        startNode.distanceToEnd = this._h(startNode);
    }

    _h(node) {
        // Euclidean lower bound
        let bound = Math.hypot(
            node.longitude - this.endNode.longitude,
            node.latitude - this.endNode.latitude
        );
        // Triangle-inequality bounds from each landmark
        for (const dists of this.lmDists) {
            const dLT = dists.get(this.endNode.id) ?? Infinity;
            const dLV = dists.get(node.id) ?? Infinity;
            if (dLT < Infinity && dLV < Infinity) {
                bound = Math.max(bound, dLT - dLV);
            }
        }
        return Math.max(0, bound);
    }

    nextStep() {
        if (this.openList.length === 0) {
            this.finished = true;
            return [];
        }

        const updatedNodes = [];
        const currentNode = this.openList.reduce(
            (best, cur) => cur.totalDistance < best.totalDistance ? cur : best,
            this.openList[0]
        );
        this.openList.splice(this.openList.indexOf(currentNode), 1);
        currentNode.visited = true;
        const refEdge = currentNode.edges.find(e => e.getOtherNode(currentNode) === currentNode.referer);
        if (refEdge) refEdge.visited = true;

        if (currentNode.id === this.endNode.id) {
            this.openList = [];
            this.finished = true;
            return [currentNode];
        }

        for (const n of currentNode.neighbors) {
            const neighbor = n.node;
            const edge = n.edge;
            const newCost = currentNode.distanceFromStart + edge.weight;

            if (neighbor.visited && !edge.visited) {
                edge.visited = true;
                neighbor.referer = currentNode;
                updatedNodes.push(neighbor);
            }

            if (this.openList.includes(neighbor)) {
                if (neighbor.distanceFromStart <= newCost) continue;
            } else if (this.closedList.includes(neighbor)) {
                if (neighbor.distanceFromStart <= newCost) continue;
                this.closedList.splice(this.closedList.indexOf(neighbor), 1);
                this.openList.push(neighbor);
            } else {
                this.openList.push(neighbor);
                neighbor.distanceToEnd = this._h(neighbor);
            }

            neighbor.distanceFromStart = newCost;
            neighbor.referer = currentNode;
            neighbor.parent = currentNode;
        }

        this.closedList.push(currentNode);
        return [...updatedNodes, currentNode];
    }
}

export default Alt;
