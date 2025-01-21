class MarkedVertex extends GeomVertex {
    fracPosition;//Coordinate object
    marker;//Marker object
    
    constructor (position, fracPosition, marker, id = -1) {
        super(position, id);
        this.marker = marker;
        this.fracPosition = fracPosition;
    }
    toString() {
        return 'marked vertex: { orbit:' + this.id + ', cart:' + this.position + ', frac:' + this.fracPosition + ', marker:' + this.marker + '}';
    }
}