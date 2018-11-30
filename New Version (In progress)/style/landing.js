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

		setTimeout(function(){
			for(var i = 0; i < introList.length; i++) {
				hide(introList[i]);
			}
		}, 1000);
		// for(var i = 0; i < introList.length; i++) {
		// 	hide(introList[i]);
		// }

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