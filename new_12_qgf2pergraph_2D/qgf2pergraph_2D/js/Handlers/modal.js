// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const closeModal = function() {
    document.getElementById("app-content").style.visibility = "visible";
    modal.style.display = "none";
    modal.classList.add("inactive");
}

//Show Modal
window.onload = function() {
    modal.style.display = "block";
}

// When the user clicks anywhere, close the modal
window.onclick = closeModal;

//When 4 seconds pass, close the modal
setTimeout(closeModal, MODALTIME);

/*
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}*/