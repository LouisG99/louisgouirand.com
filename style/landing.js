/* Add SVG graphs on first section
	Add timeline that goes on as scroll down the website 
*/

function makeVisible(list_elem) {
	for(var i = 0; i < list_elem.size(); i++) {
		list_elem[i].style.visbility = "visible";
	}
}

var mobile = null;
window.onload = function(){ 
	mobile = window.innerHeight > window.innerWidth;

	var introList = document.getElementsByClassName("intro");
	var introName = document.getElementById("name-intro");
	var afterIntro = document.getElementsByClassName("static");

	var first_link = document.getElementsByClassName("experience-link Lyft")[0];
	if (mobile) {
		first_link.style.borderBottom = "5px solid #0077b3";
	}
	else {
		first_link.style.borderLeft = "5px solid #0077b3";
	}

	introName.addEventListener("animationend", function( event ) { 
	    for(var i = 0; i < afterIntro.length; i++) {
	    	show(afterIntro[i]);

		}
	},false);


	// animation for timeline
	// let timeline = document.getElementsByClassName("timeline-container")[0];
	// window.addEventListener('scroll', function(event) {
	// 	if (isInViewport(timeline)) {
	// 		grow_period();
	// 	}
	// } );
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
for (var i = 0; i < projects.length; i++) {
	var p = projects[i];
	var id = p.getAttribute('id')
	p.onmouseover = function(){move_up(id)};
}

function displayWorkExp(companyName) {
	var xps = document.getElementsByClassName("work-descript");
	for (var i = 0; i < xps.length; i++) {
		var elem = xps[i]; 
		if (elem.id === companyName) {
			elem.style.visibility = "visible"; 

		}
		else {
			elem.style.visibility = "hidden";
		}
	}

	var coNames = ['Lyft', 'CME', 'ProQuest', 'MIS', 'Hyperloop'];
	for (var i = 0; i < coNames.length; i++) {
		var link = document.getElementsByClassName("experience-link "+coNames[i])[0];
		if (coNames[i] === companyName) {
			if (mobile) {
				link.style.borderBottom = "5px solid #0077b3";
			}
			else {
				link.style.borderLeft = "5px solid #0077b3";
			}
		}
		else {
			if (mobile) {
				link.style.borderBottom = "5px solid transparent";
			}
			else {
				link.style.borderLeft = "5px solid transparent";
			}
		}
	}
}

//// CAROUSEL 
var slide_i = 0; 
const loc_index = {
	0: 'Peninsula Iceland', 
	1: 'Lisbon', 
	2: 'Cambridge', 
	3: 'New York', 
	4: 'Niagara Falls', 
	5: 'Nice', 
	6: 'Chicago'
};

const loc_coords = { 
	'Peninsula Iceland': {lat: 64.908068, lng: -23.112769}, 
	'Chicago': {lat: 41.882788, lng: -87.623342}, 
	'Nice': {lat: 43.694387, lng: 7.281815}, 
	'New York' : {lat: 40.7128, lng : -74.0060}, 
	'Cambridge' : {lat: 52.2053, lng: 0.1218}, 
	'Lisbon' : {lat: 38.7223, lng: -9.1393}, 
	'Niagara Falls' : {lat: 43.0962, lng: -79.0377}
};

function plusSlides(incr) {
	var imgs = document.getElementsByClassName("image-fade");
	var nbr_slides = imgs.length;

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
}

function changeCenter(origin, goal, init) {
	if (init) {
		map = new google.maps.Map(
	document.getElementById('GoogleMap'), {zoom: 5, center: goal});

		marker = new google.maps.Marker({position: goal, map: map});
		return;
	}

	// doesnt work if click 2 in a row
	var arrows_prev = document.getElementsByClassName("prev");
	var arrows_next = document.getElementsByClassName("next");
	clickValue(false, arrows_prev, arrows_next);

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
			clickValue(true, arrows_prev, arrows_next);
			clearInterval(zooming)
		}
		else if (!zoom_out_done) {
			map.setZoom(map.getZoom()-d_zoom);
		}
		else if (zoom_out_done) {
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

function clickValue(bool, arr1, arr2) {
	var val1 = false; 
	var val2 = false; 

	if (bool) {
		const slideBack = function() {
			plusSlides(-1);
		}
		const slideFront = function() {
			plusSlides(1);
		}
		val1 = slideBack;
		val2 = slideFront;
	}

	for (var i = 0; i < arr1.length; i++) {
		arr1[i].onclick = val1;
	}
	for (var i = 0; i < arr2.length; i++) {
		arr2[i].onclick = val2;
	}
}

function grow_period() {
	var tings = document.getElementsByClassName("period");
	for (var i = 0; i < tings.length; i++){
		tings[i].style.height = '50%';
	}
}