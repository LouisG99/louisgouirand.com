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
const loc_index = {
	0: 'Peninsula Iceland', 
	1: 'Umich', 
	2: 'Copenhagen', 
	3: 'Chicago'
};

const loc_coords = { 
	'Umich': {lat: 42.1642, lng: -83.44177}, 
	'Peninsula Iceland': {lat: 64.908068, lng: -23.112769}, 
	'Copenhagen': {lat: 55.676707, lng: 12.584278}, 
	'Chicago': {lat: 41.882788, lng: -87.623342}
};

function plusSlides(incr) {
	var imgs = document.getElementsByClassName("image-fade");
	var nbr_slides = imgs.length;
	console.log(nbr_slides);

	var prev_slide_i = slide_i; // for maps

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

	// take care google maps now
	changeCenter(loc_coords[loc_index[prev_slide_i]], 
		loc_coords[loc_index[slide_i]], false);
}

var map = null;
var marker = null;

function initMap() {
	changeCenter(loc_coords[loc_index[0]], 
		loc_coords[loc_index[0]], true);
	return;

	marker = new google.maps.Marker({position: goal, map: map});

}

function changeCenter(origin, goal, init) {
	if (init) {
		map = new google.maps.Map(
	document.getElementById('GoogleMap'), {zoom: 5, center: goal});

		marker = new google.maps.Marker({position: goal, map: map});
		return;
	}

	const d_zoom = 1; 
	const min_zoom = 1;
	const max_zoom = 5;

	var zoom_out_done = false;
	var zoom_in_done = false;

	// in case centered somewhere else
	map.setCenter(origin);
	map.setZoom(5);

	var zooming = setInterval(function() {

		if (zoom_in_done && zoom_out_done) {
			console.log("effect done");
			clearInterval(zooming)
		}
		else if (!zoom_out_done) {
			console.log("zooming out");
			map.setZoom(map.getZoom()-d_zoom);
		}
		else if (zoom_out_done) {
			console.log("zooming in");
			map.setZoom(map.getZoom()+d_zoom);
		}

		if (map.getZoom() == min_zoom) {
			zoom_out_done = true;
			map.setCenter(goal);
			marker = new google.maps.Marker({position: goal, map: map});
		}
		else if (zoom_out_done && map.getZoom()==max_zoom) {
			zoom_in_done = true;
		}

	}, 150); 
}

