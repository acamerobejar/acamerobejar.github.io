setupMenus();

console.log("Maybe Add default origin and axes (for uploading files that don't have it)");
console.log("Add sliders for fragment size");
console.log("Add code that checks the smallest possible frag size for the current graph drawn");
console.log("Test the code");

const EXAMPLE_FILE = "example.json";

LEFT_CANVAS.width = CANVAS_WIDTH; 
LEFT_CANVAS.height = CANVAS_HEIGHT; 
RIGHT_CANVAS.width = CANVAS_WIDTH; 
RIGHT_CANVAS.height = CANVAS_HEIGHT;

setScrollToMid("container-left");
setScrollToMid("container-right");

// Initialize Graphs
let left_g = new SimpleMarkedQuotientGraphEdgeList();
let right_g;

//Dictionaries used for recording multiplicity of parallel edges
let multiEDict_left = {};

//Fragment size used for drawing periodic graph
const RIGHT_FSIZE = new FragmentSize(DEFAULT_FRAG_SIZE);

//Set default starting state
setState(STATES.origin);

loadExample(CTX_L, left_g, multiEDict_left, EXAMPLE_FILE);