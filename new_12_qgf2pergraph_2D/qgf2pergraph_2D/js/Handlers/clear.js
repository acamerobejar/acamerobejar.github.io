function clearSelections(ctx = CTX_L, graph = left_g, dict = multiEDict_left) { 
    headSelected = -1; 
    tailSelected = -1; 
    vertexSelected = -1;
    axisSelected = -1;
    drawGraph(CTX_L, left_g, multiEDict_left); 
}
function clearGraphs() {
    curr_drawing_state = STATES.origin;
    curr_dfs_state = undefined;
    starting_dfs_v = -1;
    
    clearGraph(CTX_L, left_g, multiEDict_left);
    clearGraph(CTX_R, right_g);
}

function clearGraph(ctx, graph, dict) {
    graph.reset();
    /*Doing dict = {}; to clear the data in the dictionary
      changes the local refence of the variable. 
      It creates issues with uploadGraph() */
    if (dict)
        for (let key in dict){
            if (dict.hasOwnProperty(key)) {
                delete dict[key];
            }
        }
    drawGraph(ctx, graph, dict);
}