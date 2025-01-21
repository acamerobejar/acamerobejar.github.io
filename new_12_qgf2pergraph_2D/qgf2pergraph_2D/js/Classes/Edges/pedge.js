class PEdge extends MEdge{
    uOrbit;//Integer; Vertex Orbit of tail
    vOrbit;//Integer; Vertex Orbit of head
    id;//Integer; Edge Orbit
    
    constructor(u, v, uOrbit, vOrbit, marker, id) {
        super(u,v, marker);
        this.uOrbit = uOrbit;
        this.vOrbit = vOrbit;
        this.id = id;
    }
    getCopy() {
        return new PEdge(this.u, this.v, this.uOrbit, this.vOrbit, this.marker.getCopy(), this.id);
    }
    toString() {
        return 'pedge: { orbit: ' + this.id + ' edge:(' + this.u + '->' +    this.v + '), edgeRep:(' + this.u + '->' +    this.v + ') with marker ' + this.marker + '}';
    }
}   