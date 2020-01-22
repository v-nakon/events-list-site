

var test = ""
let searchIcon = document.getElementById("search_icon");
var searchToggle = document.querySelector('.search_toggle');
searchIcon.addEventListener("click", function() {
	if(!searchToggle.classList.contains("show_toggle_search")) {
		searchToggle.classList.add("show_toggle_search");
	} else {
		searchToggle.classList.remove("show_toggle_search");
	}
  });

  $(function(){
	$('.datepicker-here').datepicker({
	   onSelect: function (dateText, inst) {
		   test = dateText;
		  console.log(test)
	   }
	});
 });


 function watchWidthDisplay(widthMedia) {
	if (widthMedia.matches) { // If media query matches
		searchToggle.classList.remove("show_toggle_search");
	}
  }
  
  var widthMedia = window.matchMedia("(min-width: 768px)")
  watchWidthDisplay(widthMedia) // Call listener function at run time
  widthMedia.addListener(watchWidthDisplay)