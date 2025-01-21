class FragmentGraphEdgeList extends PeriodicGraphEdgeList {
    fragSize;//FragmentSize Object
    
    constructor(mqg, fSize) {
        super(mqg);
        this.fragSize = fSize;
        if (mqg.vertexReps)
            for (let i = 0; i < mqg.vertexReps.length; i++)
                this.addVertexOrbitFromRep(mqg.vertexReps[i], i);
        if (mqg.edgeList)
            for (let j = 0; j < mqg.edgeList.length; j++)
                this.addEdgeObitFromRep(mqg.edgeList[j], j);
            
    }
    addVertexOrbitFromRep(vertexRep, orbitId) {
        for (let i = this.fragSize.minx; i <= this.fragSize.maxx; i++) {
            for (let j = this.fragSize.miny; j <= this.fragSize.maxy; j++) {
                let marker = new Marker(i, j);
                let markedV = vertexRep.getCopy();
                markedV.add(marker);
                this.vertices.push(new MarkedVertex(fracToCartCoord(this, markedV), vertexRep.getCopy(), marker, orbitId));
            }
        }
    }
    addEdgeObitFromRep(mqgEdge, orbitId) {
        let tailOrbit = mqgEdge.u;
        let headOrbit = mqgEdge.v;
        let emarker = mqgEdge.marker;
        let rangeY = this.fragSize.maxy - this.fragSize.miny + 1;
        let rangeX = this.fragSize.maxx - this.fragSize.minx + 1;
        let tailStartId = this.vertices.findIndex((element) => element.id === tailOrbit);
        let headStartId = this.vertices.findIndex((element) => element.id === headOrbit);
        
        let tailCurrId = tailStartId; 
        let headCurrId = headStartId + (emarker.x * rangeY) + emarker.y;//the head vertex copy that is emarker away from headCurrId
        
        //suppose the edge rep is vertex orbit pair (0,0) with marker (-1, 0).
        //then headCurrId above would be -rangeY which is a negative number meaning the index is out of bounds.
        //To deal with this, we have the following if statement
        if (headCurrId < headStartId) {
            headCurrId = headStartId;
            tailCurrId = tailStartId + (emarker.x * rangeY * (-1)) + (emarker.y * (-1));
        }
        for (let i = 0; i < rangeX * rangeY; i++) {
            if (tailCurrId >= this.vertices.length || headCurrId >= this.vertices.length)
                break;
            if (tailCurrId >= 0 && headCurrId >=0 ) {
                if (this.vertices[tailCurrId].id !== tailOrbit || this.vertices[headCurrId].id !== headOrbit)
                    break;
                //Make an edge if the pair of vertices has the marker we want
                if (markerSumIsEqual(emarker, this.vertices[tailCurrId].marker, this.vertices[headCurrId].marker)) {
                    let pedge = new PEdge(tailCurrId, headCurrId, tailOrbit, headOrbit, emarker, orbitId);
                    this.edgeList.push(pedge);
                }
            }
            tailCurrId++;
            headCurrId++;
        }
    }
}