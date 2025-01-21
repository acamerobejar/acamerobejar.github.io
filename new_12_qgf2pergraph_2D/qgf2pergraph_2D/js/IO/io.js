/* ====================================== */
/* ============== DOWNLOAD ============== */
/* ====================================== */
function downloadGraph(graph) {
    let format = 'json';
    let encodedGraph = graph.toJsonString();
    let filename;
    let title;

    title = document.getElementById("downloadTitle").value;
    if (title === "")
        title = "Untitled";
    filename = title + "." + "gmqg";
    let downloadElement = document.createElement('a');
    downloadElement.setAttribute('href', `data:text/` + format + `;charset=utf-8,${encodeURIComponent(encodedGraph)}`);
    downloadElement.setAttribute('download', filename); 
    downloadElement.style.display = 'none';
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
}
/* ==================================== */
/* ============== UPLOAD ============== */
/* ==================================== */
function loadExample(ctx, graph, dict, fileLocation) {
    return fetch(fileLocation).then((res) => res.text()).then((text) => {
        parseJson(graph, dict, JSON.parse(text));
        drawGraph(ctx, graph, dict);
        updateRightGraph(graph);
    })
    .catch((e) => console.error(e));
}
function uploadSQGraph(ctx, graph, dict, upload) {
    if (typeof(upload.files[0]) !== "undefined") {
        clearGraphs();
        
        let uploadFile = upload.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            let fileString = event.target.result;
            parseJson(graph, dict, JSON.parse(fileString));
            drawGraph(ctx, graph, dict);
            updateRightGraph(graph);
        }
        fileReader.readAsText(uploadFile);
    }
    //to reset the value of the uploadFile input. If this is not done you cannot upload the same file back to back
    upload.value = null;
}
/* ===================================== */
/* ============== PARSERS ============== */
/* ===================================== */
function parseJson(graph, dict, jsonObj) {
    parseOrigin(graph, jsonObj.origin);
    parseAxes(graph, jsonObj.axes);
    parseVertexReps(graph, jsonObj.vertexReps);
    //parseEdgeList(graph, dict, jsonObj.edgeList);
    parseEdgeList(graph, dict, jsonObj.edgeReps);
}
function parseOrigin(graph, oObjs) {
    if (oObjs) {
        let x = parseFloat(oObjs.x);
        let y = parseFloat(oObjs.y);
        graph.addOriginFromPair(x, y);
    }
    else {
        alert("Upload Failed: Missing origin information. Please try again.");
        clearGraphs(); 
        return;
    }
}
function parseAxes(graph, aObjs) {
    if (aObjs) {
        for (let i = 0; i < aObjs.length; i++) {
            let x = parseFloat(aObjs[i].x);
            let y = parseFloat(aObjs[i].y);
            graph.addAxisFromPair(x, y);
        }
    }
    else {
        alert("Upload Failed: Missing axes information. Please try again.");
        clearGraphs(); 
        return;
    }
}
function parseVertexReps(graph, vObjs) {
    if (vObjs) {
        for (let i = 0; i < vObjs.length; i++) {
            let x = parseFloat(vObjs[i].x);
            let y = parseFloat(vObjs[i].y);
            graph.addVertexFromPair(x, y);
        }
    }
    else {
        alert("Upload Failed: Missing vertexReps information. Please try again.");
        clearGraphs(); 
        return;
    }
}
function parseEdgeList(graph, dict, eObjs) {
    if (eObjs)
        for (let i = 0; i < eObjs.length; i++) {
						let medge;
						if (eObjs[i].marker !== undefined)
							medge = new MEdge( parseInt(eObjs[i].u), parseInt(eObjs[i].v), new Marker(parseInt(eObjs[i].marker.x), parseInt(eObjs[i].marker.y)));
            else
							medge = new MEdge( parseInt(eObjs[i].u), parseInt(eObjs[i].v), new Marker(parseInt(eObjs[i].marker.x), parseInt(eObjs[i].marker.y)));
						if (graph.addEdgeFromObj(medge)) {
                addEdgeToMultiEDict(dict, graph.edgeList, i);
            }
            else {
                alert("Upload Failed: Invalid edge detected. Please try agan.");
                clearGraphs();
                return;
            }
        }
    else {
        alert("Upload Failed: Missing edgeList information. Please try again.");
        clearGraphs(); 
        return;
    }
}