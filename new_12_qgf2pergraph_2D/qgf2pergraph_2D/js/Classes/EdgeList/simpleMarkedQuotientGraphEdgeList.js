class SimpleMarkedQuotientGraphEdgeList extends MarkedQuotientGraphEdgeList {
    constructor() {
        super();
    }
    addEdgeFromPair(u, v) {
        let edge = new MEdge(u,v, new Marker(0, 0));
        if (changeMarker(edge))
            return this.addEdgeFromObj(edge);
        return false;
    }
    addEdgeFromObj(edge) {
        if (edge.marker.isZeroMarker() && edge.u === edge.v) {
            console.log("ERROR: cannot add loops with marker (0,0).");
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