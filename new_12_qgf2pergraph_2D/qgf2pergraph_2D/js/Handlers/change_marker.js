function changeMarker(edge) {
    let marker = edge.marker;
    let xMarker = parseInt(prompt("Enter the x value of the marker", marker.x), 5);
    if (isNaN(xMarker))
        return false;
    let yMarker = parseInt(prompt("Enter the y value of the marker", marker.y), 5);
    if (isNaN(yMarker))
        return false;
    if (edge.u !== edge.v || !(xMarker === 0 && yMarker === 0)) {
        marker.x = xMarker;
        marker.y = yMarker;
        return true;
    }
    else {
        alert("Loops cannot have markers of (0,0). Please try again.");
        return false;
    }
}