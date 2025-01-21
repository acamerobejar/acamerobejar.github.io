//changed mouseout to mouseleave (in 3 places)
function setupMenus(){
  document.getElementById("leftMenu").addEventListener("mouseover", function(){
    document.getElementById("body-contents").style.gridTemplateColumns = leftStretchCols;
    document.getElementById("leftMenuContents").classList.remove("invisible");
  });
  document.getElementById("leftMenu").addEventListener("mouseleave", function(){
    document.getElementById("body-contents").style.gridTemplateColumns = normalCols;
    document.getElementById("leftMenuContents").classList.add("invisible");
  });
  document.getElementById("bottomMenu").addEventListener("mouseover", function(){
    document.getElementById("bottomMenu").style.marginTop = OPENBOTTOMHEIGHT;
    document.getElementById("bottomMenuContents").classList.remove("invisible");
  });
  document.getElementById("bottomMenu").addEventListener("mouseleave", function(){
    document.getElementById("bottomMenu").style.marginTop = CLOSEDBOTTOMHEIGHT;
    document.getElementById("bottomMenuContents").classList.add("invisible");
    document.getElementById("download").checked = false;
  });
}