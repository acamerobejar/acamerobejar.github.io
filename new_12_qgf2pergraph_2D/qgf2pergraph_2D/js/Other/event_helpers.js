/* Return the id of the vertex whose point was closest to the mouse click 
   If the mouse click did not land within the radius of the point, -1 is returned. 
*/
function getIdOfClosestPointClicked(canvas, ctx, graph) { 
    if (graph.vertices.length > 0) { 
        let idOfClosestPt = 0; 
        let mousePos = getMousePos(event, canvas, ctx, graph); 
        let minDistSqrd = getDistSqrd(graph.vertices[0].position.x, graph.vertices[0].position.y, mousePos.x, mousePos.y); 
        //Compare distances of mouse click from all point centers
        for (let v of graph.vertices) { 
            let currDistSqrd = getDistSqrd(v.position.x, v.position.y, mousePos.x, mousePos.y); 
            if (currDistSqrd < minDistSqrd) { 
                minDistSqrd = currDistSqrd; 
                idOfClosestPt = v.id; 
            }
        }
        if (minDistSqrd > Math.pow(POINT_RADIUS + POINT_BORDER_WEIGHT, 2))
            return -1; 
        return idOfClosestPt; 
    }
    else
        return -1; 
}
/* Return the id of the axis whose head was closest to the mouse click 
   If the mouse click did not land within the radius of an axis head, -1 is returned. 
*/
function getIdOfClosestAxisClicked(canvas, ctx, graph) {
    if (graph.axes.length > 0) { 
        let idOfClosestAxis = 0; 
        let mousePos = getMousePos(event, canvas, ctx, graph);
        let minDistSqrd = getDistSqrd(graph.axes[0].x + graph.origin.x, graph.axes[0].y + graph.origin.y, mousePos.x, mousePos.y); 
        //Compare distances of mouse click from all point centers
        for (let i = 1; i < graph.axes.length; i++) { 
            let currDistSqrd = getDistSqrd(graph.axes[i].x + graph.origin.x, graph.axes[i].y + graph.origin.y, mousePos.x, mousePos.y); 
            if (currDistSqrd < minDistSqrd) { 
                minDistSqrd = currDistSqrd; 
                idOfClosestAxis = i; 
            }
        }
        if (minDistSqrd > Math.pow(POINT_RADIUS + POINT_BORDER_WEIGHT, 2))
            return -1; 
        return idOfClosestAxis; 
    }
    else
        return -1; 
}
/* Return the id of the edge whose mid point was closest to the mouse click 
   If the mouse click did not land within the radius of a mid point, -1 is returned. 
*/
function getIdOfClosestEdgeClicked(canvas, ctx, graph, dict) {
    if (graph.edgeList.length > 0) { 
        let idOfClosestEdge = 0; 
        let mousePos = getMousePos(event, canvas, ctx, graph);
        let minDistSqrd = getDistSqrd(0, 0, mousePos.x, mousePos.y);
        for (const [key, [count, eIds]] of Object.entries(dict)) {
            for (let i = 0; i < count; i++) {
                e = graph.edgeList[eIds[i]];
                let curvature = (count % 2 === 0) ? (i + 1) : i;
                let midPt = -1;
                if (e.u === e.v) {
                    const SCALE = -5 * ((curvature + 1));
                    const CIRCULARITY = 90;
                    let ctrlPt1 = new Coordinate(SCALE/CIRCULARITY * POINT_RADIUS + graph.vertices[e.u].position.x, SCALE * POINT_RADIUS + graph.vertices[e.u].position.y);
                    let ctrlPt2 = new Coordinate(SCALE * POINT_RADIUS + graph.vertices[e.u].position.x, SCALE/CIRCULARITY * POINT_RADIUS + graph.vertices[e.u].position.y);
                    midPt = getCubicBezierPoint(graph.vertices[e.u].position, ctrlPt1, ctrlPt2, graph.vertices[e.u].position);
                }
                else {
                    let ctrPt;
                    if (e.v > e.u)
                        ctrlPt = findMultiEdgeControlPoint(graph.vertices[e.v].position, graph.vertices[e.u].position, curvature);
                    else 
                        ctrlPt = findMultiEdgeControlPoint(graph.vertices[e.u].position, graph.vertices[e.v].position, curvature);
                    midPt = getQuadraticCurvePoint(graph.vertices[e.u].position, ctrlPt, graph.vertices[e.v].position);
                }
                // drawEdge(ctx, e, vertices[e.u].position, vertices[e.v].position, e.marker, curvature);
                let currDistSqrd = getDistSqrd(midPt.x, midPt.y, mousePos.x, mousePos.y); 
                if (currDistSqrd < minDistSqrd) {
                    minDistSqrd = currDistSqrd;
                    idOfClosestEdge = eIds[i];
                }
            }
        }
        if (minDistSqrd > Math.pow(POINT_RADIUS + POINT_BORDER_WEIGHT, 2))
            return -1; 
        return idOfClosestEdge; 
    } 
    else
        return -1; 
}