class MultiUndirectedGraphEdgeList extends GraphEdgeList {
    constructor() {
        super();
    }
    addVertexFromPair(x, y) {
        super.addVertexFromObj(new Vertex(new Coordinate(x, y)));
    }
    //Returns false if the edge was not added, true otherwise
    addEdgeFromPair(u, v) {
        let edge = new UEdge(u,v);
        return super.addEdgeFromObj(edge);
    }
    //Removes the first copy that matches the edge
    //Returns the index that was removed
    removeEdgeByPair(u, v) {
        let edge = new UEdge(u,v);
        return super.removeEdgeByObj(edge);
    }
}