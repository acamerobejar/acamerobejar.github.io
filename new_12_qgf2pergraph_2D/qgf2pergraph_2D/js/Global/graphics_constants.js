const CANVAS_ASPECT_RATIO_glb = 1;// size of width / size of height
const CANVAS_HEIGHT = window.innerHeight*3;//Controls how zoomed in the picture is
const CANVAS_WIDTH = CANVAS_ASPECT_RATIO_glb * CANVAS_HEIGHT;

const ORIGIN_RADIUS = 32; 
const ORIGIN_BORDER_WEIGHT = 1; 
const ORIGIN_COLOR = "black";
const ORIGIN_BORDER_COLOR = "black";

const AXES_WEIGHT = 7;  
const AXES_COLORS = ["red", "green"];

const POINT_RADIUS = 32; 
const POINT_BORDER_WEIGHT = 3; 
const POINT_COLOR = "lightgray"; //default color
const POINT_BORDER_COLOR = "darkslategray"; 

const EDGE_WEIGHT = 9; 
const EDGE_COLOR = "darkslategray"; 
const EDGE_HEIGHTFACTOR = 100; //How much the multi-edges curve out

const ID_COLOR = "black"; 

const HIGHLIGHT_COLOR1 = "darkblue"; 
const HIGHLIGHT_COLOR2 = "darkorange"; 
const HIGHLIGHT_COLOR3 = "red"; 

const ARROW_WIDTH = 0.5;
const ARROW_HEIGHT = 0.9;

const UCELL_OPACITY = 0.5;
const UCELL_COLOR = "rgba(220, 220, 220," +  UCELL_OPACITY + ")";

const POINT_COLORS = ["deepskyblue", "gold", "hotpink", "greenyellow", "orangered", "limegreen", "mediumvioletred", "darkgray", "skyblue", "chocolate", "mediumspringgreen", "darkviolet", "bisque", "olive", "lavender", "blue",  "aquamarine"];
const EDGE_COLORS = ["darkorange", "darkmagenta", "lime", "royalblue", "crimson", "darkolivegreen", "deeppink", "teal", "goldenrod", "navy",  "khaki", "darkgreen", "saddlebrown", "yellowgreen", "peachpuff", "gray", "orangered", "palegreen", "rosybrown", "black"];