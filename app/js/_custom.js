var searchIcon = document.getElementById("search_icon");
var searchToggle = document.querySelector('.search_toggle');
var listEventsElement = document.querySelector(".container_list_events");
var searchNameMob = document.querySelector("#event_name_mob");
var searchLocationMob = document.querySelector("#location_mob");
var searchName = document.querySelector("#event_name");
var searchLocation = document.querySelector("#location");
var modalNotFound = document.querySelector(".container_modal_notfound");
var closeModalNotfound = document.querySelector(".close_modal_notfound");
// getAllEvents();
getCities("location");
getCities("location_mob");

closeModalNotfound.addEventListener("click", function() {
	modalNotFound.style.display = "none";
	document.location.href = "/";
  });

searchIcon.addEventListener("click", () => showHideSearch());

var webinarCategory = document.querySelector("#search_webinar3");
webinarCategory.addEventListener('click',() => paginationAjax('#pagination', "", "", "", "1"));

let btnSearch = document.getElementById("btn_search");
btnSearch.addEventListener('click',() => searchTitleCity("event_name", "location"));

let btnSearchMob = document.getElementById("btn_search_mob");
btnSearchMob.addEventListener('click',() => searchTitleCity("event_name_mob", "location_mob"));

function showHideSearch() {
	if(!searchToggle.classList.contains("show_toggle_search")) {
		searchToggle.classList.add("show_toggle_search");
	} else {
		searchToggle.classList.remove("show_toggle_search");
	}
};
function hideSearch(){
	searchToggle.classList.remove("show_toggle_search");
}
function createTagsElement(arr) {
	let tags = "";
	for(let i=0; i < arr.length; i++) {
		// console.log("tags", arr[i].title);
		tags += '<div class="event_tag green_tag_info">' + arr[i].title + '</div>';
	}
	// console.log(tags);
	return tags;
}
function createEventCard(objItem) {
	let eventCardElements = 
	`<div class="event_card_date_info">
	<div class="event_card_date">
		<img class="event_card_img" src="https://eventafisha.com/storage/` + objItem.images + `" alt="title">
		<div class="event_time">` + new Date(objItem.start_date).toLocaleDateString() + `</div>
	</div>
	<div class="event_card_info">
		<div class="event_title_tag">
			<div class="title_img_mob">
				<img class="event_card_img_mob" src="https://eventafisha.com/storage/` + objItem.images + `" alt="title">
				<div class="event_title">` + objItem.title + `</div>
			</div>
			<div class="event_tag">` + objItem.category.title + `</div>
		</div>
		<div class="event_time_mob">` + new Date(objItem.start_date).toLocaleDateString() + `</div>
		<div class="event_location_price">
			<div class="event_location">
				<svg xmlns="http://www.w3.org/2000/svg" class="location_icon" viewBox="0 0 24 24"><path fill="#666" d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
				<div class="location_name">` + objItem.address + `</div>
			</div>
			<div class="event_price">
				<svg xmlns="http://www.w3.org/2000/svg" class="price_icon" viewBox="0 0 24 24"><path fill="#666" d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm0 13.5c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5v-6.5h20v6.5zm0-9.5h-20v-1.5c0-.276.224-.5.5-.5h19c.276 0 .5.224.5.5v1.5zm-9 6h-9v-1h9v1zm-3 2h-6v-1h6v1zm10-2h-3v-1h3v1z"/></svg>
				<div class="price">` + objItem.cost + `</div>
			</div>
		</div>
		<div class="tags_info">` + createTagsElement(objItem.tags) + `</div>
	</div>
	</div>
	<svg xmlns="http://www.w3.org/2000/svg" class="info_icon" viewBox="0 0 24 24"><path class="info_icon_color" d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z"/></svg>`;
	// console.log(test);

	let eventCardElement = document.createElement('a');
	eventCardElement.setAttribute('target', '_blank');
	eventCardElement.href = "/event-page.html?id=" + objItem.id;
	eventCardElement.className = "event_card";
	eventCardElement.innerHTML = eventCardElements;
  	listEventsElement.append(eventCardElement);
}
 function watchWidthDisplay(widthMedia) {
	if (widthMedia.matches) { // If media query matches
		searchToggle.classList.remove("show_toggle_search");
	}
  } 
  var widthMedia = window.matchMedia("(min-width: 768px)")
  watchWidthDisplay(widthMedia) // Call listener function at run time
  widthMedia.addListener(watchWidthDisplay)


  function getCities(elementSelect) {
    axios.get('https://eventafisha.com/api/v1/cities')
    .then(function (response) {
      for(let item in response.data) {
        addOptionSelect(response.data[item], elementSelect);
      };
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};
function addOptionSelect(item, elementSelect) {
    let selectCategory = document.getElementById(elementSelect);
    let option = document.createElement("option");
    option.value = item.id;
    option.innerHTML = item.title;
    selectCategory.add(option);
  }

// для поиска по названию/городу
function searchTitleCity(titleEl, cityEl) {
	let nameEvent = document.getElementById(titleEl).value;
	let cityEvent = document.getElementById(cityEl).value;
	// searchRequest(nameEvent, cityEvent);
	paginationAjax('#pagination', nameEvent, cityEvent, "", "");
}
function removeEventList() {
	var listEventEl = document.querySelector(".container_list_events");
	while (listEventEl.firstChild) {
		listEventEl.removeChild(listEventEl.firstChild);
	}
}

$(function(){
	$('.datepicker-here').datepicker({
	   onSelect: function (dateText, inst) {
		  console.log(dateText)
		  paginationAjax("#pagination", "", "", dateText, "");
	   },
	   minDate: new Date()
	});
 });

 $(function() {
	paginationAjax('#pagination', '', '', '', '');
});

function checkSearchParam(title, city, date, category) {
	let link = "https://eventafisha.com/api/v1/events?paginate=";
	if(title !== "") {
		link += "&title=" + title;
	}
	if(city !== "") {
		link += "&city_id=" + city;
	}
	if(date !== "") {
		link += "&date=" + date;
	}
	if(category !== "") {
		link += "&category_id=" + category;
	}
	return link;
};

function paginationAjax(name, title, city, date, category) {
	let url = checkSearchParam(title, city, date, category);
	var container = $(name);
	container.pagination({
	  dataSource: url,
	  locator: 'data',
	  totalNumberLocator: function(dataSource) {
		// you can return totalNumber by analyzing response content
		console.log("test", dataSource.total)
		return dataSource.total;
	},
	  pageSize: 20,
	  showPageNumbers: true,
	  showPrevious: true,
	  showNext: true,
	  // showNavigator: true,
	  showFirstOnEllipsisShow: true,
	  showLastOnEllipsisShow: true,
	  className: 'paginationjs-theme-blue paginationjs-small',
	  alias: {
	  	pageNumber: 'page',
		pageSize: 'limit',
	  },
	  ajax: {
		// beforeSend: function() {
		//   container.prev().html('Загрузка данных');
		// }
	  },
	  callback: function(response, pagination) {
		window.console && console.log(22, response, pagination.pageNumber);
		console.log(pagination.pageNumber);
		console.log("res len", response.length);
		if(response.length === 0) {
			modalNotFound.style.display = "block";
		} else {
			removeEventList();
			$.each(response, function (index, item) {
				createEventCard(item);
			});
		}
		searchName.value = "";
		searchLocation.value = "";
		
		if (window.matchMedia("(max-width: 768px)").matches){
			hideSearch();
			searchNameMob.value = "";
			searchLocationMob.value = "";
		}
	  }
	})
  };


	//   function getAllEvents() {
	// 	axios.get('https://eventafisha.com/api/v1/events')
	// 	.then(function (response) {
	// 	  // handle success
	// 	  let allEvent = response.data.data;
	// 	  console.log(response.data);
	// 	  for(let item in allEvent) {
	// 		  createEventCard(allEvent[item]);
	// 	  };
	// 	})
	// 	.catch(function (error) {
	// 	  // handle error
	// 	  console.log(error);
	// 	})
	// 	.then(function () {
	// 	  // always executed
	// 	});
	// };

	//   function searchRequest(title, city) {
	// 	console.log("title", title);
	// 	removeEventList();
	// 	axios.get('https://eventafisha.com/api/v1/events', {
	// 		params: {
	// 			title: title,
	// 			city: city
	// 		  }
	// 	 })
	// 	 .then(function (response) {
	// 		console.log(response);
	// 		let searchResponse = response.data.data;
	// 		for(let item in searchResponse) {
	// 			createEventCard(searchResponse[item]);
	// 		};
	// 		if (window.matchMedia("(max-width: 768px)").matches){
	// 			showHideSearch();
	// 		}
	// 	 })
	// 	 .catch(function (error) {
	// 		console.log(error);
	// 	 });
	// };




	//   $(function() {
	// 	(function(name, title) {
	// 	  var container = $(name);
	// 	  container.pagination({
	// 		dataSource: 'https://eventafisha.com/api/v1/events?title=' + title,
	// 		locator: 'data',
	// 		totalNumberLocator: function(dataSource) {
	// 		  // you can return totalNumber by analyzing response content
	// 		  console.log("test", dataSource.pagination.total)
	// 		  return dataSource.pagination.total;
	// 	  },
	// 		pageSize: 15,
	// 		showPageNumbers: true,
	// 		showPrevious: true,
	// 		showNext: true,
	// 		// showNavigator: true,
	// 		showFirstOnEllipsisShow: true,
	// 		showLastOnEllipsisShow: true,
	// 		className: 'paginationjs-theme-blue paginationjs-small',
	// 		alias: {
	// 			pageNumber: 'page',
	// 		  pageSize: 'limit',
	// 		},
	// 		ajax: {
	// 		  // beforeSend: function() {
	// 		  //   container.prev().html('Загрузка данных');
	// 		  // }
	// 		},
	// 		callback: function(response, pagination) {
	// 		  window.console && console.log(22, response, pagination.pageNumber);
	// 		  console.log(pagination.pageNumber);
	// 		  removeEventList();
	// 		  $.each(response, function (index, item) {
	// 			  createEventCard(item);
	// 		  });
	// 		}
	// 	  })
	// 	})('#pagination', '');
	//   });