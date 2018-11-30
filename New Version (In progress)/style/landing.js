var nameTitle = document.getElementsByClassName("name-header")[0];
// text.style.color = "blue"; 
// text.style.opacity = 0.5;

function hoverMenu() {
	console.log("yeet");
	var contentElem = document.getElementsByClassName("landing-content")[0];
	contentElem.style.gridTemplateColumns = "2fr 3fr";
}

function menuItemSelected(event) {
	var contentElem = document.getElementsByClassName("landing-content")[0];
	contentElem.style.gridTemplateColumns = "1fr 3fr";
	event.target.style.border = "none";
}