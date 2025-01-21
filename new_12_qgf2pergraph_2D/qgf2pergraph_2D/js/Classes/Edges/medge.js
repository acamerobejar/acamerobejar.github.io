class MEdge extends DEdge{
    marker;//Marker object
    
    constructor(u, v, marker) {
        super(u,v);
        this.marker = marker;
    }
    equalsDir(medge) {
        if (super.equals(medge) && this.marker.equals(medge.marker))
            return true;
        return false;
    }
    equals(medge) {
        if (this.equalsDir(medge) || this.isReverse(medge))
            return true;
        return false;
    }
    getReverse() {
        return new MEdge(this.v, this.u, this.marker.getReverse());
    }
    isReverse(medge) {
        if (super.equals(medge.getReverse()) && this.marker.isReverse(medge.marker))
            return true;
        return false;
    }
    getCopy() {
        return new MEdge(this.u, this.v, this.marker.getCopy());
    }
    toString() {
        return 'medge: (' + this.u + '->' +    this.v + ') with marker ' + this.marker;
    }
}