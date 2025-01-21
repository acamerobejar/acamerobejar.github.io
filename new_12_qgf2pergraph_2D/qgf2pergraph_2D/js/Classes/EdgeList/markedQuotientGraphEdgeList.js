class MarkedQuotientGraphEdgeList extends QuotientGraphEdgeList {
    /* Note: unlike a QuotientGraphEdgeList object, MarkedQuotientGraphEdgeList objects have directed marked edges*/
    constructor() {
        super();
    }
    //Returns false if the edge was not added, true otherwise
    addEdgeFromPair(u, v) {
        let edge = new MEdge(u,v, new Marker(0, 0));
        return super.addEdgeFromObj(edge);
    }
    //Removes the first copy that matches the edge
    //Returns the index that was removed
    removeEdgeByInfo(u, v, x, y) {
        let edge = new MEdge(u,v, new Marker(x, y));
        return super.removeEdgeByObj(edge);
    }
    removeEdgeByPair(u, v) {
        let edge = new DEdge(u,v);
        return super.removeEdgeByObj(edge);
    }
    containsDirEdge(edge) {
        for (let i = 0; i < this.edgeList.length; i++)
            if (this.edgeList[i].equalsDir(edge))
                return true;
        return false;
    }
    switchVertexOrder(id1, id2) {
        for (let i = 0; i < this.edgeList.length; i++) {
            if (this.edgeList[i].u === id1)
                this.edgeList[i].u = id2;
            else if (this.edgeList[i].u === id2)
                this.edgeList[i].u = id1;
            if (this.edgeList[i].v === id1)
                this.edgeList[i].v = id2;
            else if (this.edgeList[i].v === id2)
                this.edgeList[i].v = id1;
        }
        let temp = this.vertexReps[id1].getCopy();
        this.vertexReps[id1].copy(this.vertexReps[id2]);
        this.vertexReps[id2].copy(temp);
        this.vertices[id1].position.copy(fracToCartCoord(this, this.vertexReps[id1]));
        this.vertices[id2].position.copy(fracToCartCoord(this, this.vertexReps[id2]));
    }
    translateVertexReps(translation, fracC = true) {
        let fracDists = [];
        for (let i = 0; i < this.edgeList.length; i++) {
            let headFrac = this.vertexReps[this.edgeList[i].v].getAddition(this.edgeList[i].marker);
            fracDists.push(headFrac.getSubtraction(this.vertexReps[this.edgeList[i].u]));
        }
        super.translateVertexReps(translation, fracC);
        for (let i = 0; i < this.edgeList.length; i++) {//Update markers of the edges
            let headFrac = fracDists[i].getAddition(this.vertexReps[this.edgeList[i].u]);
            this.edgeList[i].marker.copy(headFrac.getMarker().getSubtraction(this.vertexReps[this.edgeList[i].u].getMarker()));
        }
    }
    reorderVertices(newOrder) {
        if (newOrder.length !== this.vertexReps.length) {
            console.log("ERROR: Vertices could not be reordered. The new ordering given does not match the number of vertices in the graph.");
            return;
        }
        let oldCoords = [];
        for (let i = 0; i < this.vertexReps.length; i++) {
            oldCoords.push(this.vertexReps[i].getCopy());
        }
        for (let i = 0; i < this.edgeList.length; i++) {
            this.edgeList[i].u = newOrder[this.edgeList[i].u];
            this.edgeList[i].v = newOrder[this.edgeList[i].v];
        }
        // console.log("");
        for (let i = 0; i < newOrder.length; i++) {
            this.updateVertexFromObject(oldCoords[i], newOrder[i]);
        }

    }
    toJsonString() {
        let str = "{";
        str += '"origin":' + JSON.stringify(this.origin) + ",";
        str += '"axes":' + JSON.stringify(this.axes) + ",";
        str += '"vertexReps":' + JSON.stringify(this.vertexReps) + ",";
        str += '"edgeReps":'+ JSON.stringify(this.edgeList) + "}";
        return str;
    }
}