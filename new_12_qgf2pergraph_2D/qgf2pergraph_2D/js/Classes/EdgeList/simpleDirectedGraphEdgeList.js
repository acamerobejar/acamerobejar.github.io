class SimpleDirectedGraphEdgeList extends SimpleGraphEdgeList {
    constructor() {
        super();
    }
    //Returns false if the edge was not added, true otherwise
    addEdgeFromPair(u, v) {
        let edge = new DEdge(u,v);
        return super.addEdgeFromObj(edge);
    }
    removeEdgeByPair(u, v) {
        let edge = new DEdge(u,v)
        return super.removeEdgeByObj(edge);
    }
}