//Based on https://stackoverflow.com/questions/7846520/how-can-i-make-sure-that-a-web-page-opens-up-with-scrollbar-in-the-middle
function setScrollToMid(id) {
    let elem = document.getElementById(id);
    let elemWidth = elem.scrollWidth;
    let elemHeight = elem.scrollHeight;
    let elemVisibleWidth = elem.offsetWidth;
    let elemVisibleHeight = elem.offsetHeight;
    elem.scrollLeft = (elemWidth - elemVisibleWidth) / 2;
    elem.scrollTop = (elemHeight - elemVisibleHeight) / 2;
}