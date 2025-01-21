/**  Returns control Point object, given the end points of an edge and 
 *  a number initCurvature representing the order of the multi edge. Adjust edge height with EDGE_HEIGHT_FACTOR
 *  @author Emma Civello
 *  mod. Joanna
*/
function findMultiEdgeControlPoint(pt1, pt2, initCurvature) {
    let curvature = initCurvature + 1;
    let scale = Math.floor(curvature/2);
    let direction;
    curvature%2 == 0 ? direction = -1 * EDGE_HEIGHTFACTOR : direction = EDGE_HEIGHTFACTOR; //Flips side of the multi edge,
    
    let midPt = new Coordinate((pt2.x - pt1.x)/2, (pt2.y - pt1.y)/2);
    let rise = pt2.y - pt1.y;
    let run = pt1.x  - pt2.x ;
    
    edgeLength = Math.sqrt(getDistSqrd(pt1.x, pt1.y, pt2.x, pt2.y)); 
    let ctrlX = pt1.x + scale * direction * rise/edgeLength + midPt.x;
    let ctrlY = pt1.y + scale * direction * run/edgeLength + midPt.y
    let ctrlPt = new Coordinate(ctrlX, ctrlY);

    return ctrlPt;
}
//https://stackoverflow.com/questions/9194558/center-point-on-html-quadratic-curve
function _getQBezierValue(t, p1, p2, p3) {
    var iT = 1 - t;
    return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
}
/*Returns a point along the quadratic curve. 
  Setting t to .5 gives the midpoint of the curve
*/
function getQuadraticCurvePoint(pt1, ctrlPt, pt2, t = .5) {
    return new Coordinate(_getQBezierValue(t, pt1.x, ctrlPt.x, pt2.x),
                _getQBezierValue(t, pt1.y, ctrlPt.y, pt2.y));
}
function cube(x) {
    return Math.pow(x,3);
}
function sqr(x) {
    return Math.pow(x,2);
}
//https://en.wikipedia.org/wiki/B%C3%A9zier_curve
function getCubicBezierPoint(pt0, pt1, pt2, pt3, t = .5) {
    let x = (cube(1-t) * pt0.x) + (3 * sqr(1-t) * t * pt1.x) + (3 * (1-t) * sqr(t) * pt2.x) + (cube(t) * pt3.x);
    let y = (cube(1-t) * pt0.y) + (3 * sqr(1-t) * t * pt1.y) + (3 * (1-t) * sqr(t) * pt2.y) + (cube(t) * pt3.y);
   return new Coordinate(x,y);
}
//https://gist.github.com/tunght13488/6744e77c242cc7a94859
function quadraticBezierLength(p0, p1, p2) {
    var ax = p0.x - 2 * p1.x + p2.x;
    var ay = p0.y - 2 * p1.y + p2.y;
    var bx = 2 * p1.x - 2 * p0.x;
    var by = 2 * p1.y - 2 * p0.y;
    var A = 4 * (ax * ax + ay * ay);
    var B = 4 * (ax * bx + ay * by);
    var C = bx * bx + by * by;

    var Sabc = 2 * Math.sqrt(A+B+C);
    var A_2 = Math.sqrt(A);
    var A_32 = 2 * A * A_2;
    var C_2 = 2 * Math.sqrt(C);
    var BA = B / A_2;

    return (A_32 * Sabc + A_2 * B * (Sabc - C_2) + (4 * C * A - B * B) * Math.log((2 * A_2 + BA + Sabc) / (BA + C_2))) / (4 * A_32);
}
function getPointOnCircle(radius, angle) { 
    let pointOnCircle = { 
        x: radius * Math.cos(angle), 
        y: radius * Math.sin(angle)
    }
    return pointOnCircle; 
}