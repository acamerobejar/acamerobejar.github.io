class PeriodicGraphEdgeList extends SimpleDirectedGraphEdgeList {
    origin;//Coordinate Object
    axes;//Array of Coordinate Objects
    
    constructor(mqg) {
        super();
        if (mqg.origin)
            this.origin = mqg.origin.getCopy();
        if (mqg.axes) {
            this.axes = [];
            if (mqg.axes[0])
                this.axes.push(mqg.axes[0].getCopy());
            if (mqg.axes[1])
                this.axes.push(mqg.axes[1].getCopy());
        }
    }
    addVertexFromRep(vertexRep) {
        
    }
    addEdgeFromRep(medge) {
        
    }
    reset() {
        super.reset();
        this.origin = undefined;
        this.axes = undefined;
    }
}