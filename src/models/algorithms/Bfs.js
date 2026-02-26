import PathfindingAlgorithm from "./PathfindingAlgorithm";

class Bfs extends PathfindingAlgorithm {
    constructor() {
        super();
        this.queue = [];
        this.queued = new Set();
    }

    start(startNode, endNode) {
        super.start(startNode, endNode);
        this.queue = [startNode];
        this.queued = new Set([startNode.id]);
    }

    nextStep() {
        if (this.queue.length === 0) {
            this.finished = true;
            return [];
        }

        const updatedNodes = [];
        const currentNode = this.queue.shift();
        currentNode.visited = true;
        const refEdge = currentNode.edges.find(e => e.getOtherNode(currentNode) === currentNode.referer);
        if (refEdge) refEdge.visited = true;

        if (currentNode.id === this.endNode.id) {
            this.queue = [];
            this.finished = true;
            return [currentNode];
        }

        for (const n of currentNode.neighbors) {
            const neighbor = n.node;
            const edge = n.edge;

            if (neighbor.visited && !edge.visited) {
                edge.visited = true;
                neighbor.referer = currentNode;
                updatedNodes.push(neighbor);
            }

            if (neighbor.visited || this.queued.has(neighbor.id)) continue;

            this.queued.add(neighbor.id);
            this.queue.push(neighbor);
            neighbor.parent = currentNode;
            neighbor.referer = currentNode;
        }

        return [...updatedNodes, currentNode];
    }
}

export default Bfs;
