/* Add SVG graphs on first section
	Add timeline that goes on as scroll down the website 
	Add a carousel for some cool pictures
*/

function makeVisible(list_elem) {
	for(var i = 0; i < list_elem.size(); i++) {
		list_elem[i].style.visbility = "visible";
	}
}

window.onload = function(){ 
	var introList = document.getElementsByClassName("intro");
	var introName = document.getElementById("name-intro");
	var afterIntro = document.getElementsByClassName("static");

	var CME_link = document.getElementsByClassName("experience-link CME")[0];
	CME_link.style.borderLeft = "5px solid #0077b3";

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
	console.log("done");
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
	// console.log(i);
	var p = projects[i];
	var id = p.getAttribute('id')
	p.onmouseover = function(){move_up(id)};
}

function displayWorkExp(companyName) {
	// console.log("physics");
	// console.log(companyName);

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

	var coNames = ['CME', 'MIS', 'Deloitte'];
	for (var i = 0; i < coNames.length; i++) {
		var link = document.getElementsByClassName("experience-link "+coNames[i])[0];
		if (coNames[i] === companyName) {
			link.style.borderLeft = "5px solid #0077b3";
		}
		else {
			link.style.borderLeft = "5px solid transparent";
		}
	}

	// slide_work_bar(companyName);
}

//// CAROUSEL 
var slide_i = 0; 

function plusSlides(incr) {
	var imgs = document.getElementsByClassName("image-fade");
	var nbr_slides = imgs.length;
	console.log(nbr_slides);

	imgs[slide_i].style.opacity = "0";

	if (slide_i===0 && incr<0) {
		imgs[nbr_slides-1].style.opacity = "1";
		slide_i = nbr_slides-1;
	}
	else if (slide_i===nbr_slides-1 && incr>0) {
		imgs[0].style.opacity = "1";
		slide_i = 0;
	}
	else {
		imgs[slide_i+incr].style.opacity = "1";
		slide_i += incr;
	}
}

function slide_work_bar(companyGoal) {
	// var elem = document.getElementsByClassName("experience-link "+companyGoal)[0];
	// var height = document.getElementsByClassName("experience-link")[0].clientHeight;
	// // console.log(height);

	// var container = document.getElementById("work-cursor");
	// container.style.height = height+'px'; 


	
	// var id = setInterval(frame, 100);
	// var pos = elem.style.top; 
	// var incr = pos ? 1 : -1;

	// console.log(pos);
	// function frame() {
	// 	container.style.top += "100px";
	// 	container.style.bottom += "100px";
	// 	// console.log(elem.style.top);
	// }

	// var dh = elem.style.top;


}
