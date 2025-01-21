//Draws the given point
function drawPoint(ctx, point, pointColor = POINT_COLOR, borderColor = POINT_BORDER_COLOR, weight = POINT_BORDER_WEIGHT, radius = POINT_RADIUS) { 
    ctx.strokeStyle= borderColor; 
    ctx.fillStyle = pointColor;
    ctx.lineWidth = weight; 
    ctx.beginPath(); 
    ctx.arc(point.x, point.y, radius, 0 , 2* Math.PI); 
    ctx.stroke();
    ctx.fill(); 
    ctx.closePath(); 
}
//Draws Id number on a point 
function drawId(ctx, id, point, idColor = ID_COLOR) { 
    if(!SHOWV_CHKBOX.checked || !SHOWVL_CHKBOX.checked) { 
        return; 
    }
    ctx.save(); //Save font settings
    ctx.translate(point.x - POINT_RADIUS/3.5 * id.toString().length, point.y - POINT_RADIUS/3.5 - 1);
    ctx.scale(1,-1);
    ctx.fillStyle = idColor; 
    ctx.font = PT_FONT_glb;
    ctx.beginPath();
    ctx.fillText(id,0,0);
    ctx.closePath();
    ctx.restore();//Restore font settings
}
//Draws all selected points as highlighted points
function drawAllHighlightedPoints(ctx, vertices, colors) { 
    let selectedVerticesIds = [vertexSelected, headSelected, tailSelected];
    for (let id of selectedVerticesIds) { 
        if (id!= -1 && id < vertices.length) { 
            drawHighlightedPoint(ctx, vertices[id].position, colors[vertices[id].id]); 
            drawId(ctx, id, vertices[id].position); 
        }
    }
}

//Draws the given point with a border highlight in the given color
function drawHighlightedPoint(ctx, point, color) {
    ctx.lineWidth = POINT_BORDER_WEIGHT; 
    ctx.shadowBlur = 20; 
    if(SHOWV_CHKBOX.checked) { //When vertices are shown
        ctx.shadowColor = HIGHLIGHT_COLOR2; 
	   drawPoint(ctx, point, color); 
    } 
    else {
        //When vertices are hidden
        ctx.shadowColor = HIGHLIGHT_COLOR1; 
        drawPoint(ctx, point, "transparent", "white"); 
    }
    //Clear shadow
    ctx.shadowColor= "transparent"; 
    ctx.shadowBlur = null;  
    // ctx.closePath(); 
}
function drawAxis(ctx, origin, axis, color) {
    ctx.strokeStyle = color; 
    ctx.fillStyle = color;
    ctx.lineWidth = AXES_WEIGHT;
    let head = origin.getCopy();
    head.add(axis);
    let ctrlPt = findMultiEdgeControlPoint(origin, head, 0);
    drawQuadraticCurve(ctx, origin, ctrlPt, head); 
    drawArrowhead(ctx, ctrlPt, head, color, ORIGIN_RADIUS, true);
}    
/* Draw an edge between two points
   Arrow head pointing from v1 to v2 is drawn if showDirEdges is true
*/
function drawEdge(ctx, edge, v1, v2, label = "", curvature = 0, edgeColor = EDGE_COLOR) { 
    ctx.save();
    ctx.strokeStyle = edgeColor; 
    ctx.fillStyle = edgeColor;
    ctx.lineWidth = EDGE_WEIGHT;
    let ctrlPt; 

    //Draw self loops
    if(edge.v == edge.u) { 
        drawSelfLoop(ctx, v1.position, curvature, label);
        return;
    }
    //Forces ctx to draw all edges between the same vertices 
    // from the vertex with a smaller id to one with larger id to prevent overlaps
    if(edge.v > edge.u) { 
        ctrlPt = findMultiEdgeControlPoint(v2.position, v1.position, curvature); 
    } else { 
        ctrlPt = findMultiEdgeControlPoint(v1.position, v2.position, curvature); 
    }
    if (SHOWEL_CHKBOX.checked && (!v2.marker || (v2.marker && v2.marker.isZeroMarker()))) {
        drawLabeledEdge(ctx, v1.position, v2.position, ctrlPt, label, curvature); 
    } else {
        drawQuadraticCurve(ctx, v1.position, ctrlPt, v2.position); 
    }
    drawArrowhead(ctx, ctrlPt, v2.position, edgeColor);
    ctx.restore();
}
/* Draw a quadratic bezier curve given start point, control point, and end point
 */
function drawQuadraticCurve(ctx, startPoint, ctrlPt, endPoint) { 
    ctx.beginPath(); 
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.quadraticCurveTo(ctrlPt.x, ctrlPt.y, endPoint.x, endPoint.y);
    ctx.stroke();
    ctx.closePath(); 
}
function drawBezierCurve(ctx, pt, ctrlPt1, ctrlPt2) { 
    ctx.beginPath(); 
    ctx.moveTo(pt.x, pt.y);
    ctx.bezierCurveTo(ctrlPt1.x, ctrlPt1.y, ctrlPt2.x, ctrlPt2.y, pt.x, pt.y);
    ctx.stroke();
    ctx.closePath(); 
}
//Draw a self loop centered at a given point
// Used: https://www.victoriakirst.com/beziertool/ for help
function drawSelfLoop(ctx, pt, curvature, label = "") {
    const SCALE = -5 * ((curvature + 1));  //controls size of self loop
    const CIRCULARITY = 90; //lower values make self loop less circular
    let ctrlPt1 = new Coordinate(SCALE/CIRCULARITY * POINT_RADIUS + pt.x, SCALE * POINT_RADIUS + pt.y);
    let ctrlPt2 = new Coordinate(SCALE * POINT_RADIUS + pt.x, SCALE/CIRCULARITY * POINT_RADIUS + pt.y);
    let edgeLength = quadraticBezierLength(ctrlPt1, ctrlPt2, pt);
    let gap = POINT_RADIUS * (label.toString().length / 2);
    if (SHOWEL_CHKBOX.checked)
        ctx.setLineDash([0.47 * (edgeLength - gap), gap]);
    drawBezierCurve(ctx, pt, ctrlPt1, ctrlPt2);
    ctx.setLineDash([]);
    
    if (SHOWEL_CHKBOX.checked)
        drawEdgeLabel(ctx, getCubicBezierPoint(pt, ctrlPt1, ctrlPt2, pt), label);
    else {
        // ctx.closePath(); 
        ctx.restore(); //Restore font settings
    }
}
/* Draw an edge with the given label at its 
   midpoint and a gap in its line for the label
*/
function drawLabeledEdge(ctx, pt1, pt2, ctrlPt, label="", curvature) { 
    let edgeLength = Math.sqrt(getDistSqrd(pt1.x, pt1.y, pt2.x, pt2.y));
    let gap = POINT_RADIUS * (label.toString().length / 2);
    if (curvature !== 0)
       edgeLength = quadraticBezierLength(pt1, ctrlPt, pt2);
    ctx.setLineDash([0.5 * (edgeLength - gap), gap]);
    drawQuadraticCurve(ctx, pt1, ctrlPt, pt2);
    //Reset line dash
    ctx.setLineDash([]);
    //Draw the label at midpoint of edge
    drawEdgeLabel(ctx, getQuadraticCurvePoint(pt1, ctrlPt, pt2), label); 
}
//Draws the label of an edge
function drawEdgeLabel(ctx, midPt, label="") { 
    ctx.save(); //Save font settings
    // ctx.setTransform(1, 0, 0, -1, midPt.x, CANVAS_HEIGHT - midPt.y);
    // ctx.scale(1,-1); 
    ctx.translate(midPt.x, midPt.y);
    ctx.scale(1,-1);
    ctx.fillStyle = EDGE_COLOR;
    ctx.font = EDGE_FONT_glb;
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.beginPath(); 
    ctx.fillText(label, 0, 0);
    ctx.closePath(); 
    ctx.restore(); //Restore font settings
}
/* Draw an arrowhead at the end of an directed edge 
from (x1, y1) to (x2, y2) */
function drawArrowhead(ctx, ctrlPt, pt2, color = EDGE_COLOR, radius = POINT_RADIUS, axis=false) {
    let offsetX = 0; 
    let offsetY = 0;  
    let angle = Math.atan2(pt2.y - ctrlPt.y, pt2.x - ctrlPt.x); //radian angle from horizontal of line from ctrlPt to pt2
    if(SHOWV_CHKBOX.checked && !axis) { 
        //Convert angle to conventional CCW degree coordinates 
        let angleInDeg = toStandardAngle(angle * (180/Math.PI)); 
        let offsets = getPointOnCircle(radius, angleInDeg * (Math.PI/180)); 
        offsetX = offsets.x; 
        offsetY = offsets.y;  
    } 
    ctx.save(); 
    ctx.translate(pt2.x - offsetX, pt2.y + offsetY); 
    ctx.rotate(angle); 
    ctx.fillStyle = color; 
    ctx.strokeStyle = color; 
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-ARROW_HEIGHT * radius, radius * -ARROW_WIDTH);
    ctx.lineTo(-ARROW_HEIGHT * radius, radius * ARROW_WIDTH);
    ctx.fill();
    ctx.closePath();
    ctx.restore(); //Restore unrotated canvas context
}
function drawQuadrilateral(ctx, origin, axes, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(axes[0].x + origin.x, axes[0].y + origin.y);
  ctx.lineTo(axes[0].x + axes[1].x + origin.x, axes[0].y + axes[1].y + origin.y);
  ctx.lineTo(axes[1].x + origin.x, axes[1].y + origin.y);
  ctx.closePath();
  ctx.fill(); 
  
}
/* Draws all the vertices, edges, vertex ids, and labels of a given graph  */
function drawGraph(ctx, g, dict) {
    ctx.clearRect(-CANVAS_WIDTH/2, -CANVAS_HEIGHT/2, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.save();
    ctx.setTransform(1,0,0,-1,0,CANVAS_HEIGHT);
    ctx.translate(CANVAS_WIDTH/2,CANVAS_HEIGHT/2);
    let vertices = g.vertices;
    
    if (g.origin && g.axes) {
        if (g.axes.length === 2) {
            if (SHOWUC_CHKBOX.checked)
                drawQuadrilateral(ctx, g.origin, g.axes, UCELL_COLOR);
            if (SHOWA_CHKBOX.checked)
                drawAxis(ctx, g.origin, g.axes[1], AXES_COLORS[1]);
        }
        if (g.axes.length >= 1 && SHOWA_CHKBOX.checked)
            drawAxis(ctx, g.origin, g.axes[0], AXES_COLORS[0]);
    }
    if (g.origin && SHOWO_CHKBOX.checked)
        drawPoint(ctx, g.origin, ORIGIN_COLOR, ORIGIN_BORDER_COLOR, ORIGIN_BORDER_WEIGHT, ORIGIN_RADIUS)
    if (vertices.length > 0){
        //Draw Edges
        if (SHOWE_CHKBOX.checked)
            if (dict) {
                for (const [key, [count, eIds]] of Object.entries(dict)) {
                    for (let i = 0; i < count; i++) {
                        e = g.edgeList[eIds[i]];
                        let curvature = (count % 2 === 0) ? (i + 1) : i;
                        // drawEdge(ctx, e, vertices[e.u], vertices[e.v], eIds[i], curvature);
                        drawEdge(ctx, e, vertices[e.u], vertices[e.v], e.marker, curvature, EDGE_COLORS[eIds[i]]);
                    }
                }
            }
            else {
                for (let j = 0; j < g.edgeList.length; j++)
                    drawEdge(ctx, g.edgeList[j], vertices[g.edgeList[j].u], vertices[g.edgeList[j].v], g.edgeList[j].marker, 0, EDGE_COLORS[g.edgeList[j].id]);
            }
        //Draw vertices
        if (SHOWV_CHKBOX.checked) {
            for (let v of vertices) { 
                drawPoint(ctx, v.position, POINT_COLORS[v.id]); 
                if (!v.marker || (v.marker && v.marker.isZeroMarker()))
                    drawId(ctx, v.id, v.position); 
            }
        }
        //Highlight selected vertices, if any
        if (dict)
            drawAllHighlightedPoints(ctx, vertices, POINT_COLORS); 
    }
}
