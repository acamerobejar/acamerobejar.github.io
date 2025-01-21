//Helpers for listener events
/* Changes current state to the one represented by the selected radio button  */
function setState(newState) {
    curr_drawing_state = newState;
    updateInstructions(newState);
    clearSelections(CTX_L, left_g, multiEDict_left);
}
function updateShowVertexIdCheckbox() {
    if (!SHOWV_CHKBOX.checked) { 
        SHOWVL_CHKBOX.checked = false;
        SHOWVL_CHKBOX.disabled = true;
    }
    else { 
        SHOWVL_CHKBOX.disabled = false; 
        SHOWVL_CHKBOX.checked = true;
    }
}
function updateShowEdgeLabelsCheckbox() {
    if (!SHOWE_CHKBOX.checked) { 
        SHOWEL_CHKBOX.checked = false;
        SHOWEL_CHKBOX.disabled = true;
    }
    else { 
        SHOWEL_CHKBOX.disabled = false; 
        SHOWEL_CHKBOX.checked = true;
    }
}
//Event Listeners
/* Add event listeners to the state buttons */
function addStateBtnEventListeners() {
    for (let i = 0; i < STATES_BTN.length; i++ ) { 
        STATES_BTN[i].addEventListener("change", () => { setState(STATES[STATES_BTN[i].value])}); //'change' ignores click on already checked buttons
    }
}
LEFT_CANVAS.addEventListener('mousedown', leftClickResponse); 
LEFT_CANVAS.addEventListener('mousemove', leftMouseMoveResponse); 
LEFT_CANVAS.addEventListener('mouseup', leftMouseUpResponse);
CLEAR_BTN.addEventListener("click", clearGraphs); 

addStateBtnEventListeners(); 
SHOWV_CHKBOX.addEventListener('click', () => {
    updateShowVertexIdCheckbox();
    clearSelections(CTX_L, left_g, multiEDict_left); 
    drawGraph(CTX_R, right_g); 
}); 
SHOWVL_CHKBOX.addEventListener('click', () => { 
    clearSelections(CTX_L, left_g, multiEDict_left); 
    drawGraph(CTX_R, right_g); 
}); 
SHOWE_CHKBOX.addEventListener('click', () => {
    updateShowEdgeLabelsCheckbox();
    clearSelections(CTX_L, left_g, multiEDict_left);
    drawGraph(CTX_R, right_g); 
});
SHOWEL_CHKBOX.addEventListener('click', () => { 
    clearSelections(CTX_L, left_g, multiEDict_left); 
    drawGraph(CTX_R, right_g); 
}); 
SHOWO_CHKBOX.addEventListener('click', () => { 
    clearSelections(CTX_L, left_g, multiEDict_left); 
    drawGraph(CTX_R, right_g); 
}); 
SHOWA_CHKBOX.addEventListener('click', () => { 
    clearSelections(CTX_L, left_g, multiEDict_left); 
    drawGraph(CTX_R, right_g); 
}); 
SHOWUC_CHKBOX.addEventListener('click', () => { 
    clearSelections(CTX_L, left_g, multiEDict_left); 
    drawGraph(CTX_R, right_g); 
}); 