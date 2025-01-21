class GraphEdgeList {
    edgeList;//arr of edge objects
    vertices;//arr of vertex objects

    constructor() {
        this.edgeList = [];
        this.vertices = [];
    }
    /*========================================*/
    /*=============== VERTICES ===============*/
    /*========================================*/
    addVertexFromObj(vertex) {
        let nrV = this.vertices.length;
        this.vertices.push(vertex);
        this.vertices[nrV].id = nrV;
    }
    removeVertexByID(id) {
        if (id > this.vertices.length) {
            console.log("ERROR: invalid vertex id");
            return false;
        }
        this.removeVFromEdgeList(id);
        this.vertices.splice(id, 1);
        this.updateVIds(id);
        return true;
    }
    removeVFromEdgeList(id) {
        for (let i = this.edgeList.length - 1; i > -1; i--) {
            let e = this.edgeList[i];
            if (e.u === id || e.v === id)
                this.edgeList.splice(i, 1);
        }
        if (this.edgeList.length > 0)
            this.updateEdgeListVIds(id);
    }
    updateEdgeListVIds(id) {
        for (let i = 0; i < this.edgeList.length; i++) {
            let e = this.edgeList[i];
            if (e.v > id)
                e.v -= 1;
            if (e.u > id)
                e.u -= 1;
        }
    }
    updateVIds(id) {
        for (let i = 0; i < this.vertices.length; i++)
            if (this.vertices[i].id > id)
                this.vertices[i].id--;
    }
    /*=====================================*/
    /*=============== EDGES ===============*/
    /*=====================================*/
    addEdgeFromObj(edge) {
        if (edge.u >= this.vertices.length || edge.v >= this.vertices.length || edge.u < 0 || edge.v < 0) {
            console.log("ERROR: at least one edge endpoint does not exist");
            return false;
        }
        this.edgeList.push(edge);
        return true;
    }
    removeEdgeByID(id) {
        if (id > this.edgeList.length) {
            console.log("ERROR: invalid edge id");
            return false;
        }
        this.edgeList.splice(id, 1);
        return true;
    }
    //Returns the index that was removed
    removeEdgeByObj(edge) {
        for (let i = 0; i < this.edgeList.length; i++)
            // if (edge.equals(this.edgeList[i])) {
            if (this.edgeList[i].equals(edge)) {
                this.edgeList.splice(i, 1);
                return i;
            }
        console.log("ERROR: the edge could not be found");
        return -1;
    }
    containsEdge(edge) {
        for (let i = 0; i < this.edgeList.length; i++)
            if (this.edgeList[i].equals(edge))
                return true;
        return false;
    }
    /*=====================================*/
    /*=============== OTHER ===============*/
    /*=====================================*/
    reset() {
        this.edgeList = [];
        this.vertices = [];
    }
    getCopy() {
        let copy = new GraphEdgeList();
        for (let i = 0; i < this.vertices.length; i++)
            copy.vertices.push(this.vertices[i].getCopy());
        for (let i = 0; i < this.edgeList.length; i++) {
            copy.edgeList.push(this.edgeList[i].getCopy());
            if (this.edgeList[i].u >= copy.nrV)
                copy.nrV = this.edgeList[i].u + 1;
            if (this.edgeList[i].v >= copy.nrV)
                copy.nrV = this.edgeList[i].v + 1;
        }
        return copy;
    }
    toString() {
        let str = '{';
        for (let i = 0; i < this.vertices.length; i++)
            str += '\n' + this.vertices[i];
        for (let i = 0; i < this.edgeList.length; i++)
            str += '\n' + this.edgeList[i];
        return str + '}' 
    }
}