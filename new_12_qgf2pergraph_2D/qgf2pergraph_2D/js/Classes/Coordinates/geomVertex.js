class GeomVertex {
    position;//Coordinate object
    id;
    
    constructor (position, id = -1) {
        this.position = position;
        this.id = id;
    }
    getCopy() {
        return new GeomVertex(this.position.getCopy(), this.id);
    }
    updatePosition(x, y) {
        this.position.updatePosition(x,y);
        // this.position.copy(new Coordinate(x,y));
    }
    toString() {
        return 'geometric vertex: {' + this.id + ',' + this.position + '}';
    }
}