class QuotientGraphEdgeList extends MultiUndirectedGraphEdgeList {
    origin; //Coodinate object
    axes = [];//Array of Coordinate objects
    vertexReps = [];//Array of Coordinate objects in fractional coordinates
    
    constructor() {
        super();
    }
    addOriginFromPair(x, y) {
        this.origin = new Coordinate(x, y);
    }
    addAxisFromPair(x, y) {
        if (this.axes.length < 2)
            this.axes.push(new Coordinate(x, y));
        else
            alert("Axes Error: Trying to add an axis to an already full set of axes. The axis was not added.");
    }
    updateCartVertices() {
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].position.copy(fracToCartCoord(this, this.vertexReps[i]));
        }
    }
    //Input coordinates can be fractional or Cartesian
    addVertexFromPair(x, y, fracC = true) {
        if (fracC) {
            let frac = new Coordinate(x, y);
            frac.makeRep();
            // if (frac.x >= 1 || frac.y >= 1 || frac.x < 0 || frac.y < 0)
            //     return;
            this.vertexReps.push(frac);
            let cart = fracToCartCoord(this, frac);
            super.addVertexFromObj(new GeomVertex(cart));
            return;
        }
        let cart = new Coordinate(x, y);
        let frac = cartToFracCoord(this, cart, true);
        super.addVertexFromObj(new GeomVertex(cart));
        this.vertexReps.push(frac);
    }
    updateVertexFromPair(x, y, i, fracC=true) {
        this.updateVertexFromObject(new Coordinate(x,y), i, fracC);
    }
    updateVertexFromObject(coord, i, fracC=true) {
        if (fracC) {
            coord.makeRep();
            this.vertexReps[i].copy(coord);
            this.vertices[i].position.copy(fracToCartCoord(this, this.vertexReps[i]));
            return;   
        }
        let cart = coord;
        let frac = cartToFracCoord(this, cart, true);
        this.vertexReps[i].copy(frac);
        this.vertices[i].position.copy(cart);
    }
    removeVertexByID(id) {
        if (super.removeVertexByID(id)) {
            if (id > this.vertexReps.length) {
                console.log("ERROR: invalid vertex id");
                return false;
            }
            this.vertexReps.splice(id, 1);
            return true;
        }
        return false;
    }
    translateVertexReps(translation, fracC=true) {
        for (let i = 0; i < this.vertexReps.length; i++)
            this.updateVertexFromObject(this.vertexReps[i].getAddition(translation), i, fracC);
    }
    reset() {
        super.reset();
        this.origin = undefined;
        this.axes = [];
        this.vertexReps = [];
    }
    toArray() {
        let vArr = [];
        let eArr = [];

        for (let i = 0; i < this.vertexReps.length; i++) {
            vArr.push(i);
        }

        for (let i = 0; i < this.edgeList.length; i++) {
            eArr.push([this.edgeList[i].u, this.edgeList[i].v]);
        }

        return [vArr, eArr];
    }
}