function makeVisible(list_elem) {
	for(var i = 0; i < list_elem.size(); i++) {
		list_elem[i].style.visbility = "visible";
	}
}

window.onload = function(){ 
	var introList = document.getElementsByClassName("intro");
	var introName = document.getElementById("name-intro");
	var afterIntro = document.getElementsByClassName("static");
	introName.addEventListener("animationend", function( event ) { 
	    for(var i = 0; i < afterIntro.length; i++) {
			show(afterIntro[i]);
		}
	},false);
}

function hide(elem){
	elem.style.opacity = 0;
	elem.style.transition = "opacity 2s linear";
}
function show(elem){
	elem.style.opacity = 1;
	elem.style.transition = "opacity 1s linear";
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView();
}

window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);
    var x = 50;
    scroll = function(c, a, b, i) {
        i++; if (i > x) return;
        c.scrollTop = a + (b - a) / x * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

function unrollProject(projectName){
	console.log("yeet");
}

var projects = document.getElementsByClassName("ye");
console.log("wtf", projects.length);
for (var i = 0; i < projects.length; i++) {
	console.log(i);
	var p = projects[i];
	var id = p.getAttribute('id')
	p.onmouseover = function(){move_up(id)};
}

function displayWorkExp(companyName) {
	console.log("physics");
	console.log(companyName);

	var xps = document.getElementsByClassName("work-descript");
	for (var i = 0; i < xps.length; i++) {
		var elem = xps[i]; 
		// elem.style.color = 
		if (elem.id === companyName) {
			elem.style.visibility = "visible"; 
		}
		else {
			elem.style.visibility = "hidden";
		}
	}
}


// introName.addEventListener("animationend", function( event ) { 
// 	console.log("triggered");
//     for(var i = 0; i < afterIntro.size(); i++) {
// 		afterIntro[i].style.visbility = "hidden";
// 	}
// },false);


// var nameTitle = document.getElementsByClassName("name-header")[0];
// // text.style.color = "blue"; 
// // text.style.opacity = 0.5;

// function hoverMenu() {
// 	console.log("yeet");
// 	var contentElem = document.getElementsByClassName("landing-content")[0];
// 	contentElem.style.gridTemplateColumns = "2fr 3fr";
// }

// function menuItemSelected(event) {
// 	var contentElem = document.getElementsByClassName("landing-content")[0];
// 	contentElem.style.gridTemplateColumns = "1fr 3fr";
// 	event.target.style.border = "none";
// }