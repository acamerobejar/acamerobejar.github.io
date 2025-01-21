class Marker extends Coordinate{
    constructor(x, y) {
        super(x,y);
        this.cleanCoords();
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    }
    getCopy() {
        return new Marker(this.x, this.y);
    }
    reverse() {
        this.x = -this.x;
        this.y = -this.y;
    }
    getReverse() {
        let copy = this.getCopy();
        copy.reverse();
        return copy;
    }
    isReverse(marker) {
        if (this.equals(marker.getReverse()))
            return true;
        return false;
    }
    isZeroMarker() {
        return (this.x === 0 && this.y === 0);
    }
}