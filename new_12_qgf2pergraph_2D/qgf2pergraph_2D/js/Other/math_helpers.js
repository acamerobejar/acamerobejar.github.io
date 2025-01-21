/* isEqualEdges */
/* Returns true if two edges connect the same 2 vertices, in any order */
function isEqualEdges(e1, e2) { 
    //Check inputs are edges
    if (!(e1 instanceof Edge) || !(e2 instanceof Edge)){ 
        return "Error: inputs must be edges"; 
    }
    if (e1.getHead() == e2.getHead() && e1.getTail() == e2.getTail()) { 
        return true; 
    } else if (e1.getHead() == e2.getTail() && e1.getTail() == e2.getHead()) { 
        return true
    }
    return false; 
 }

/* Given a max value for a range, returns a random integer within the range */
 function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/* Return the squared distance between two coordinates */
function getDistSqrd(x1, y1, x2, y2) { 
    return ((x1-x2) * (x1-x2)) + ((y1-y2) * (y1 - y2)); 
}

/* Converts JavaScript angles (in degrees) to conventional angles 
    (counterclockwise from positive x-axis on the right, 
    running from 0 to 2*PI) 
*/
function toStandardAngle(angle) { 
    //Zero angle
    if (angle == 0) { 
        return 0; 
    } else if (angle > 0){ //Positive angle
        return (360) - angle; 
    } else { //Negative angles
        return -1 * angle; 
    }
}

/* Finds the coordinates of a point 
   on a circle, given the radius and 
   the counterclockwise angle from the 
   positive x-axis
*/
function getPtOnCircle(radius, angle) { 
    let ptOnCircle = { 
        x: radius * Math.cos(angle), 
        y: radius * Math.sin(angle)
    }
    return ptOnCircle; 
}