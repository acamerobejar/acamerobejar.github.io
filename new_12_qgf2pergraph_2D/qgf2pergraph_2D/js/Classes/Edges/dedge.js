class DEdge {
    u;//tail
    v;//head
    
    constructor(u, v) {
        this.u = u;
        this.v = v;
    }
    equals(dedge) {
        if (dedge.u === this.u && dedge.v === this.v)
            return true;
        return false;
    }
    getReverse() {
        return new DEdge(this.v, this.u);
    }
    isReverse(dedge) {
        let copy = this.getReverse();
        return copy.equals(dedge);
    }
    getCopy() {
        return new DEdge(this.u, this.v);
    }
    /*Returns standardized string used for dictionary indexing */
    stdString() {
        if (this.u <= this.v)
            return 'dedge: (' + this.u + ',' +  this.v + ')';
        return 'dedge: (' + this.v + ',' +  this.u + ')';
    }
    toString() {
        return 'dedge: (' + this.u + '->' +    this.v + ')';
    }
}