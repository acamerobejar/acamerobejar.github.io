const MODALTIME = 4000;//in milliseconds; the time it takes for the intro modal to close

//Used for comparing if two coordinates are equal
const ERROR_TOLERANCE_glb = 0.001;

//Used for rounding numbers
const PRECISION_glb = 0.00001;

//Default size used for drawing the periodic fragment
const DEFAULT_FRAG_SIZE = [[-10,10],[-10,10]];

//height of bottom menu
const OPENBOTTOMHEIGHT = "-14vh";
const CLOSEDBOTTOMHEIGHT = "1vh";

// Create variables for DOM elements
const LEFT_CANVAS = document.getElementById('canvas-left'); 
const RIGHT_CANVAS = document.getElementById('canvas-right'); 
const SHOWV_CHKBOX = document.getElementById('showVertices');
const SHOWVL_CHKBOX = document.getElementById('showVertexIds');
const SHOWE_CHKBOX = document.getElementById('showEdges');
const SHOWEL_CHKBOX = document.getElementById('showEdgeLabels');
const SHOWO_CHKBOX = document.getElementById('showOrigin');
const SHOWA_CHKBOX = document.getElementById('showAxes');
const SHOWUC_CHKBOX = document.getElementById('showUC');

const COPYL2R_BTN = document.getElementById('copyLToRBtn'); //copyLToRBtn
const STARTDFS_BTN = document.getElementById('startDfsBtn');//startDfsBtn
const CLEAR_BTN = document.getElementById('clearBtn'); //clearBtn
const STATES_BTN = document.querySelectorAll('input[name="state"]');
 
const CTX_L = LEFT_CANVAS.getContext("2d");
const CTX_R = RIGHT_CANVAS.getContext("2d");

//Initialize State, Vertex, and Edge Selections
let currentState;
let vertexSelected = -1; 
let axisSelected = -1; 
let headSelected = -1; 
let tailSelected = -1; 

//Event variables
let onClick = false;

// Program states 
const STATES = { 
    default: 0,
    origin: 1,
    axes: 2,
    vertex: 3, 
    edge: 4,
    marker: 5
}; 

//Instructions for program STATES
const DEFAULTINSTRUCTIONS = ""; 
const ORIGININSTRUCTIONS = "<kbd>Click</kbd> to place origin <br><br> <kbd>Click</kbd> or drag to move origin <br><br>"; 
const AXESINSTRUCTIONS = "<kbd>Click</kbd> to add axis <br><br> <kbd>Click</kbd> and drag to select and move an axis <br><br>"; 
const VERTEXINSTRUCTIONS = "<kbd>Click</kbd> inside the shaded area to add vertices <br><br> <kbd>Click</kbd> and drag to select and move vertices <br><br> (<kbd>Crtl</kbd> or <kbd>Cmd</kbd>) + <kbd>Click</kbd> to remove vertices <br><br> You cannot make edits while vertices are hidden"; 
const EDGEINSTRUCTIONS = "To add an edge: <kbd>Click</kbd> on the tail vertex, then <kbd>Click</kbd> on the head <br><br> To remove an edge: (<kbd>Crtl</kbd> or <kbd>Cmd</kbd>) + <kbd>Click</kbd> on the tail vertex, then the head <br><br> You cannot make edits while edges or vertices hidden"; 
const SHIFTINSTRUCTIONS = "<kbd>Click</kbd> on the label of an edge to edit its marker <br><br> You cannot make edits while edge labels are hidden"; 