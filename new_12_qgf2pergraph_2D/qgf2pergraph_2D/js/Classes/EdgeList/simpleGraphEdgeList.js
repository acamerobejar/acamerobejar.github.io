class SimpleGraphEdgeList extends GraphEdgeList {
    constructor() {
        super();
    }
    addVertexFromPair(x, y) {
        super.addVertexFromObj(new Vertex(new Coordinate(x, y)));
    }
    //Returns false if the edge was not added, true otherwise
    addEdgeFromObj(edge) {
        if (edge.u === edge.v) {
            console.log("ERROR: cannot add loops to a simple graph.");
            return false;
        }
        for (let i = 0; i < this.edgeList.length; i++) 
            if (this.edgeList[i].equals(edge)) {
                console.log("ERROR: cannot add an edge that already exists.");
                return false;
            }
        return super.addEdgeFromObj(edge);
    }
}