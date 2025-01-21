class Coordinate {
    x;
    y;
    constructor(x, y) {
        this.x = Number(x);
        this.y = Number(y);
    }
    copy(coordinate) {
        this.x = Number(coordinate.x);
        this.y = Number(coordinate.y);
    }
    getCopy() {
        return new Coordinate(this.x, this.y);
    }
    distance(coordinate) {
        return Math.sqrt((this.x - coordinate.x)**2 
                                     + (this.y - coordinate.y)**2);
    }
    add(coordinate) {
        this.x = Number(this.x) + Number(coordinate.x);
        this.y = Number(this.y) + Number(coordinate.y);
    }
    subtract(coordinate) {
        this.x = Number(this.x) - Number(coordinate.x);
        this.y = Number(this.y) - Number(coordinate.y);
    }
    multiply(multiplier) {
        this.x = Number(this.x * multiplier);
        this.y = Number(this.y * multiplier);
    }
    equals(coord) {
        if (Math.abs(this.x - coord.x) < ERROR_TOLERANCE_glb && Math.abs(this.y - coord.y) < ERROR_TOLERANCE_glb)
            return true;
        return false;
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    }
    dot(coord) {
        return this.x * coord.x + this.y * coord.y;
    }
    rotate(angle) {
        let x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        let y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        this.x = x;
        this.y = y;
        this.cleanCoords();
    }
    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }
    swapXY() {
        let temp = this.x;
        this.x = this.y;
        this.y = temp;
    }
    cleanCoords() {
        this.x = Math.round((this.x + Number.EPSILON) * (1/PRECISION_glb)) / (1/PRECISION_glb);
        if (Math.abs(this.x) < ERROR_TOLERANCE_glb)
            this.x = 0;
        else if (Math.abs(this.x - Math.floor(this.x)) < ERROR_TOLERANCE_glb)
            this.x = Math.floor(this.x);
        else if (Math.abs(this.x - Math.ceil(this.x)) < ERROR_TOLERANCE_glb)
            this.x = Math.ceil(this.x);
        this.y = Math.round((this.y + Number.EPSILON) * (1/PRECISION_glb)) / (1/PRECISION_glb);
        if (Math.abs(this.y) < ERROR_TOLERANCE_glb)
            this.y = 0;
        else if (Math.abs(this.y - Math.floor(this.y)) < ERROR_TOLERANCE_glb)
            this.y = Math.floor(this.y);
        else if (Math.abs(this.y - Math.ceil(this.y)) < ERROR_TOLERANCE_glb)
            this.y = Math.ceil(this.y);
    }
    isInIntegers() {
        return this.equals(new Coordinate(Math.round(this.x), Math.round(this.y)));
    }
    isLonger(vector) {//For comparing vector lengths
        return this.magnitude() > vector.magnitude()
    }
    isLongerEq(vector) {//For comparing vector lengths
        return this.magnitude() >= vector.magnitude()
    }
    getSubtraction(coord) {
        let sub = this.getCopy();
        sub.subtract(coord);
        return sub;
    }
    getAddition(coord) {
        let sum = this.getCopy();
        sum.add(coord);
        return sum;
    }
    getMarker() {//For fractional coordinates
        this.cleanCoords();
        return new Marker(this.x, this.y);
    }
    getSwappedXY() {
        let coord = this.getCopy();
        coord.swapXY();
        return coord;
    }
    makeRep() {
        return this.subtract(this.getMarker());
    }
    set x(value) {
        this._x = Number(value);
    }
    set y(value) {
        this._y = Number(value);
    }
    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}