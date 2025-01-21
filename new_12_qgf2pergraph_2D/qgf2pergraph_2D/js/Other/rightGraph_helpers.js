function updateRightGraph(left) {
    right_g = new FragmentGraphEdgeList(left, RIGHT_FSIZE.getCopy());
    drawGraph(CTX_R, right_g);
}