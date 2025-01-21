/* Updates instructons text by state */
function updateInstructions(state) {
    switch(state) { 
        case 1: 
            document.getElementById('instructions').innerHTML = ORIGININSTRUCTIONS; 
            break; 
        case 2: 
            document.getElementById('instructions').innerHTML = AXESINSTRUCTIONS; 
            break; 
        case 3: 
            document.getElementById('instructions').innerHTML = VERTEXINSTRUCTIONS; 
            break; 
        case 4: 
            document.getElementById('instructions').innerHTML = EDGEINSTRUCTIONS; 
            break;
        case 5:
            document.getElementById('instructions').innerHTML = SHIFTINSTRUCTIONS;
            break;
        default: 
            document.getElementById("instructions").innerHTML = DEFAULTINSTRUCTIONS; 
    }
}
function leftClickResponse(event) {
    getClickResponse(event, LEFT_CANVAS, CTX_L, left_g, multiEDict_left);
}

function leftMouseUpResponse(event) {
    getMouseUpResponse(CTX_L, left_g, multiEDict_left);
}
/* Responds to mouse clicks on canvas with appropriate functions depending on state of the program */
function getClickResponse(event, canvas, ctx, graph, dict) {
    onClick = true;
    let mousePos = getMousePos(event, canvas, ctx, graph);
    switch(curr_drawing_state) {
        case STATES.origin: //Origin Mode
            if (!SHOWO_CHKBOX.checked)
                return;
            //Creating origin
            if (graph.origin === undefined || graph.origin === null) {
                graph.addOriginFromPair(mousePos.x, mousePos.y);
                updateRightGraph(graph);
            }
            //Moving origin
            else
                canvas.onmousemove = getMouseMoveResponse(event, canvas, ctx, graph, dict); 
            break;
        case STATES.axes: //Axes Mode
            if (!graph.origin || !SHOWA_CHKBOX.checked)
                return;
            axisSelected = getIdOfClosestAxisClicked(canvas, ctx, graph);
            //Creating axis
            if (axisSelected === -1 && graph.axes.length < 2){ 
                graph.addAxisFromPair(mousePos.x - graph.origin.x, mousePos.y - graph.origin.y);
                updateRightGraph(graph);
            } 
            //Moving axis
            else if (axisSelected !== -1)
                canvas.onmousemove = getMouseMoveResponse(event, canvas, ctx, graph, dict); 
                
            break;
        case STATES.vertex: //Vertex Mode
            if (!graph.origin || graph.axes.length < 2 || !SHOWV_CHKBOX.checked)
                return;
            vertexSelected = getIdOfClosestPointClicked(canvas, ctx, graph);
            //Click while ctrl/cmd key is pressed 
            if ((event.ctrlKey || event.metaKey) && vertexSelected != -1) {
                if (graph.removeVertexByID(vertexSelected)) {
                    //remove all edges from dictionary
                    for (let key in dict){
                        if (dict.hasOwnProperty(key)) {
                            delete dict[key];
                        }
                    }
                    for (let i = 0; i < graph.edgeList.length; i++)
                        addEdgeToMultiEDict(dict, graph.edgeList, i);
                    clearSelections(ctx, graph, dict);
                    drawGraph(ctx, graph, dict);
                    updateRightGraph(graph);
                }
            }
            //Clicked on space without a point
            else if (vertexSelected == -1) {
                graph.addVertexFromPair(mousePos.x, mousePos.y, false);
                drawGraph(ctx, graph, dict); 
                updateRightGraph(graph);
            } 
            //Clicked on existing point
            else { 
                canvas.onmousemove = getMouseMoveResponse(event, canvas, ctx, graph, dict); 
            }
            break;
        case STATES.edge: //Edge mode
            if (!SHOWE_CHKBOX.checked || !SHOWV_CHKBOX.checked)
                return;
            if (tailSelected != -1) { 
                headSelected = -1; 
                tailSelected = -1; 
            }
            if (headSelected == -1) { 
                headSelected = getIdOfClosestPointClicked(canvas, ctx, graph); 
            } 
            else { 
                tailSelected = getIdOfClosestPointClicked(canvas, ctx, graph); 
                drawGraph(ctx, graph, dict);
                //Timeout to allow tail to be highlighted on canvas before trying to add an edge
                setTimeout(() => {
                //Adding or Removing edges 
                if ((event.ctrlKey || event.metaKey) && getIdOfClosestPointClicked(canvas, ctx, graph) != -1) { 
                    let eId = graph.removeEdgeByPair(headSelected, tailSelected);
                    if (eId != -1) { 
                        //console.log('Removal was successful'); 
                        let e = new DEdge(headSelected, tailSelected);
                        removeEdgeFromMultiEDict(dict, graph.edgeList, e.stdString(), eId);
                        updateRightGraph(graph);
                    }
                } 
                else {
                    if (graph.addEdgeFromPair(headSelected, tailSelected)) { //Checks if edge addition was successful
                        let index = graph.edgeList.length - 1;
                        addEdgeToMultiEDict(dict, graph.edgeList, index);
                        updateRightGraph(graph);
                    } 
                }
                clearSelections(ctx, graph, dict);
                },100);
            } 
            break; 
        case STATES.marker: //Marker mode
            if (!SHOWEL_CHKBOX.checked)
                return;
            let edgeSelected = getIdOfClosestEdgeClicked(canvas, ctx, graph, dict);
            if (edgeSelected !== -1) {
                let copy = graph.edgeList[edgeSelected].getCopy();
                changeMarker(copy);
                //Update marker if edge it creates is not already in the graph
                if (!graph.containsEdge(copy)) {
                    graph.edgeList[edgeSelected].marker = copy.marker;
                    drawGraph(ctx, graph, dict);
                    updateRightGraph(graph);
                }
                else if (!graph.edgeList[edgeSelected].marker.equals(copy.marker))
                    alert("Failed to change marker. Attempted edge is already in the graph.");
            }
            onClick = false;
            break; 
    }
}
function leftMouseMoveResponse(event) {
    getMouseMoveResponse(event, LEFT_CANVAS, CTX_L, left_g, multiEDict_left);
}
/* Responds to mouse moves */
function getMouseMoveResponse(event, canvas, ctx, graph, dict) {
    if (canvas != undefined) {
        let mousePos = getMousePos(event, canvas, ctx, graph); 
        switch(curr_drawing_state) { 
            case STATES.origin:
                if (!onClick || !SHOWO_CHKBOX.checked)
                    return;
                graph.origin.updatePosition(mousePos.x, mousePos.y);
                graph.updateCartVertices();
                drawGraph(ctx, graph, dict);
                updateRightGraph(graph);
                break;
            case STATES.axes:
                if (!onClick || !SHOWA_CHKBOX.checked)
                    return;
                if (axisSelected !== -1) {
                    graph.axes[axisSelected].updatePosition(mousePos.x - graph.origin.x, mousePos.y - graph.origin.y);
                    graph.updateCartVertices();
                    drawGraph(ctx, graph, dict);
                    updateRightGraph(graph);
                }
                break;
            case STATES.vertex:
                if (vertexSelected != -1) {
                    graph.updateVertexFromPair(mousePos.x, mousePos.y, vertexSelected, false);
                    drawGraph(ctx, graph, dict);
                    updateRightGraph(graph);
                } 
                break; 
        }
    }
}
/* Responds to mouse up */
function getMouseUpResponse(ctx, graph, dict) { 
    vertexSelected = -1;
    axisSelected = -1;
    onClick = false;
    drawGraph(ctx, graph, dict);
}
/* Returns the x and y mouse position of a mouse click */
    /* From Emma Civello's adaptation of 
    https://www.geeksforgeeks.org/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/ 
    https://stackoverflow.com/questions/23744605/javascript-get-x-and-y-coordinates-on-mouse-click
*/
function getMousePos(event, canvas, ctx, graph) {
    let boundRect = canvas.getBoundingClientRect(); //Adjust for canvas position
    let mousePos = { 
        x: (event.clientX - boundRect.left) * CANVAS_WIDTH/(canvas.offsetWidth) - CANVAS_WIDTH/2,
        y: (-event.clientY + boundRect.top) * CANVAS_HEIGHT/(canvas.offsetHeight) + CANVAS_HEIGHT/2
    }; 
    
    return mousePos; 
}