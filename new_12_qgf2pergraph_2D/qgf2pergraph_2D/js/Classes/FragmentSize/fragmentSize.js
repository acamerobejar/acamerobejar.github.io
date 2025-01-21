/*######################### Class #########################*/
class FragmentSize {
    #minx;
	#maxx;
	#miny;
	#maxy;
	constructor(size) {
        this.minx = Math.round(Number(size[0][0]));
        this.maxx = Math.round(Number(size[0][1]));
        this.miny = Math.round(Number(size[1][0]));
        this.maxy = Math.round(Number(size[1][1]));
    }
	copy(fragSize) {
        this.minx = Math.round(Number(fragSize.minx));
		this.maxx = Math.round(Number(fragSize.maxx));
        this.miny = Math.round(Number(fragSize.miny));
        this.maxy = Math.round(Number(fragSize.maxy));
    }
    getCopy() {
        let copy = new FragmentSize([[this.minx, this.maxx],[this.miny, this.maxy]]);
        return copy;
    }
    equal(fragSize) {
        if (this.minx !== fragSize.minx)
          return false;
        if (this.maxx !== fragSize.maxx)
          return false;
        if (this.miny !== fragSize.miny)
          return false;
        if (this.maxy !== fragSize.maxy)
          return false;
        return true;
    }
	get minx() {
		return Math.round(Number(this._minx));
	}
	get maxx() {
		return Math.round(Number(this._maxx));
	}
	get miny() {
		return Math.round(Number(this._miny));
	}
	get maxy() {
		return Math.round(Number(this._maxy));
	}
  set minx(value) {
		this._minx = Math.round(Number(value));
	}
	set maxx(value) {
		this._maxx = Math.round(Number(value));
	}
	set miny(value) {
		this._miny = Math.round(Number(value));
	}
	set maxy(value) {
		this._maxy = Math.round(Number(value));
	}
	toString() {
		return "(" + this.minx + ", " + this.maxx + "), (" +  this.miny + ", " + this.maxy + ")";
	}
}