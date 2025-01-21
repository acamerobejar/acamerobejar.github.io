const PT_FONT_BOLD_glb = "bold " + getFont();
const PT_FONT_NORMAL_glb = getFont();
var PT_FONT_glb = PT_FONT_NORMAL_glb;
const EDGE_FONT_NORMAL_glb = getFont(.7);
const EDGE_FONT_BOLD_glb = "bold " + getFont(.7);
var EDGE_FONT_glb = EDGE_FONT_BOLD_glb;

/* https://stackoverflow.com/questions/22943186/html5-canvas-font-size-based-on-canvas-size */
function getFont(scale = 1) {
    var ratio = .2;
    var size = (LEFT_CANVAS.width * ratio) * scale;   // get font size based on current width
    return size + 'px Arial'; // set font
}