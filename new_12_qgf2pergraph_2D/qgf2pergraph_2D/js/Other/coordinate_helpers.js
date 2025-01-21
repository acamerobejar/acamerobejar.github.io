/*=======================================================================*/
/*================================ FRAC =================================*/
/*=======================================================================*/
//origin + u*xaxis + v*yaxis;
function fracToCartCoord(graph, coordinate) {
  var cartCoord = new Coordinate(graph.axes[0].x, graph.axes[0].y);
  cartCoord.multiply(coordinate.x);
  cartCoord.add(graph.origin);
  var temp = new Coordinate(graph.axes[1].x, graph.axes[1].y);
  temp.multiply(coordinate.y);
  cartCoord.add(temp);
  
  return cartCoord;
}
function fracToCartCoords(graph, fracCoords) {
  let cartCoords = [];
  for (let i = 0; i < fracCoords.length; i++) {
    cartCoords.push(fracToCartCoord(graph, fracCoords[i]));
  }
  return cartCoords;
}
/*=======================================================================*/
/*================================ CART =================================*/
/*=======================================================================*/
//new coordinates = inv(new basis) * old coordinates
function cartToFracCoord(graph, coordinate, asRep = false) {
  var markedCoord = new Coordinate(coordinate.x, coordinate.y);
  markedCoord.subtract(graph.origin);
  var newBasis = [[graph.axes[0].x, graph.axes[0].y], [graph.axes[1].x, graph.axes[1].y]];
  var inverseNewBasis = invert2DMatrix(newBasis);
  var newX = (inverseNewBasis[0][0] * markedCoord.x) + (inverseNewBasis[1][0] * markedCoord.y);
  var newY = (inverseNewBasis[0][1] * markedCoord.x) + (inverseNewBasis[1][1] * markedCoord.y);
  
  if (asRep) {
    if (newX < 0)
      newX = 1 + newX - Math.trunc(newX);
    else if (newX >= 1)
      newX = newX - Math.trunc(newX);
    if (newY < 0)
      newY = 1 + newY - Math.trunc(newY);
    else if (newY >= 1)
      newY = newY - Math.trunc(newY);
  }
  return new Coordinate(newX, newY);
}
function cartToFracCoords(graph, cartCoords) {
  var fracCoords = [];
  for (let i = 0; i < cartCoords.length; i++) {
    fracCoords.push(cartToFracCoord(graph, cartCoords[i]));
  }
  return fracCoords;
}
function cartToRepFracCoords(graph, cartCoords) {
  var fracCoords = [];
  for (let i = 0; i < cartCoords.length; i++) {
    fracCoords.push(cartToFracCoord(graph, cartCoords[i], true));
  }
  return fracCoords;
}
function invert2DMatrix(matrix) {
  var a = matrix[0][0];
  var b = matrix[1][0];
  var c = matrix[0][1];
  var d = matrix[1][1];
  
  var det = (a * d) - (b * c);
  var inverse = [[d/det,-c/det],[-b/det, a/det]];//each array is a column
  return inverse;
}
/*========================================================================*/
/*================================ SHIFT =================================*/
/*========================================================================*/
function markerSumIsEqual(goalMarker, markerHead, markerTail) { 
  var testMarker = new Coordinate(markerTail.x, markerTail.y);
  testMarker.subtract(markerHead);
  if (testMarker.x === goalMarker.x && testMarker.y === goalMarker.y) {
    return true;
  }
  return false;
}