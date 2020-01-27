// request
// const axios = require('axios');

// Make a request for a user with a given ID
axios.get('https://eventafisha.com/api/v1/events')
  .then(function (response) {
    // handle success
	console.log(response.data);
	for(let item in response.data) {
		createEventCard(response.data[item]);
	};
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
// request end

function createEventCard(objItem) {
	let test = 
	`<div class="event_card_date_info">
	<div class="event_card_date">
		<div class="event_time">` + objItem.time + `</div>
		<div class="event_pst">PST</div>
	</div>
	<div class="event_card_info">
		<div class="event_title_tag">
			<div class="event_title">` + objItem.title + `</div>
			<div class="event_tag">Webinar</div>
		</div>
		<div class="event_by">by Thinkful Las Vegas</div>
		<div class="event_location_price">
			<div class="event_location">
				<svg xmlns="http://www.w3.org/2000/svg" class="location_icon" viewBox="0 0 24 24"><path fill="#666" d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
				<div class="location_name">` + objItem.address + `</div>
			</div>
			<div class="event_price">
				<svg xmlns="http://www.w3.org/2000/svg" class="price_icon" viewBox="0 0 24 24"><path fill="#666" d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm0 13.5c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5v-6.5h20v6.5zm0-9.5h-20v-1.5c0-.276.224-.5.5-.5h19c.276 0 .5.224.5.5v1.5zm-9 6h-9v-1h9v1zm-3 2h-6v-1h6v1zm10-2h-3v-1h3v1z"/></svg>
				<div class="price">$` + objItem.cost + `</div>
			</div>
		</div>
		<div class="tags_info">
			<div class="event_tag green_tag_info">JavaScript</div>
			<div class="event_tag green_tag_info">HTML</div>
		</div>
	</div>
	</div>
	<svg class="close_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="close_icon_color" d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg>`;
	// console.log(test);

	let listEventsElement = document.querySelector(".container_list_events");
	let eventCardElement = document.createElement('a');
	eventCardElement.href = "/event-page.html?id=" + objItem.id;
	eventCardElement.className = "event_card";
	eventCardElement.innerHTML = test;
  	listEventsElement.append(eventCardElement);
}

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