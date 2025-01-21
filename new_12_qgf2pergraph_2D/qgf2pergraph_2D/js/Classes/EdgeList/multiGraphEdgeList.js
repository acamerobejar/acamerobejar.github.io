class MultiGraphEdgeList extends GraphEdgeList {
    constructor() {
        super();
    }
    addVertexFromPair(x, y) {
        super.addVertexFromObj(new Vertex(new Coordinate(x, y)));
    }
    //Returns false if the edge was not added, true otherwise
    addEdgeFromObj(edge) {
        return super.addEdgeFromObj(edge);
    }
}