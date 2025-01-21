class UEdge {
    u;
    v;
  
    constructor(u, v) {
        this.u = u;
        this.v = v;
    }
    equals(uedge) {
        if (uedge.u === this.u && uedge.v === this.v)
            return true;
        if (uedge.v === this.u && uedge.u === this.v)
            return true;
        return false;
    }
    contains(w) {
        if (this.u === w || this.v === w)
            return true;
        return false;
    }
    opposite(w) {
        if (this.u === w)
            return this.v;
        if (this.v === w)
            return this.u;
        return -1;
    }
    getReverse() {
        return new UEdge(this.v, this.u);
    }
    getCopy() {
        return new UEdge(this.u, this.v);
    }
    /*Returns standardized string used for dictionary indexing */
    stdString() {
        if (this.u <= this.v)
            return 'uedge: (' + this.u + ',' +  this.v + ')';
        return 'uedge: (' + this.v + ',' +  this.u + ')';
    }
    toString() {
        return 'uedge: (' + this.u + ',' +  this.v + ')';
    }
}