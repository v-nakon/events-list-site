let urlStringParams = window.location.search;
let urlParams = new URLSearchParams(urlStringParams);
let idEvent = urlParams.get('id')
console.log(idEvent);


axios.get('https://eventafisha.com/api/v1/events/' + idEvent)
  .then(function (response) {
    document.title = response.data.title;
	console.log(response.data);
    setTitle(response.data);
    setDate(response.data);
    setLocation(response.data);
    setPrice(response.data);
    setBuyLink(response.data);
    setDescription(response.data);
    setImg(response.data);
    setCategory(response.data);
    setTags(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

 function setTitle(obj) {
     let title = obj.title;
     let titleElement = document.querySelector(".event_info_title");
     titleElement.innerHTML = title;
 }
 function setDate(obj) {
     let startDate = new Date(obj.start_date);
     let endDate = new Date(obj.end_date);
     let dateElement = document.querySelector(".location_date");
     dateElement.innerHTML = startDate.toLocaleDateString() + " - " + endDate.toLocaleDateString();
 }
 function setLocation(obj) {
     let location = obj.address;
     let locationElement = document.querySelector(".location_name");
     locationElement.innerHTML = location;
 }
 function setPrice(obj) {
     let price = obj.cost;
     let priceElement = document.querySelector(".price");
     priceElement.innerHTML = price;
 }
 function setBuyLink(obj) {
     let buyLink = obj.buy_link;
     let buyBtn = document.getElementById("btn_buy");
     buyBtn.addEventListener( "click" , () => window.open(buyLink));
 }
 function setDescription(obj) {
     let description = obj.desc;
     let descriptionElement = document.querySelector(".description");
     descriptionElement.innerHTML = description;
 }
 function setImg(obj) {
     let imgPath = obj.images;
    //  console.log("https://eventafisha.com/storage/" + imgPath);
     let imgElement = document.querySelector(".event_img");
     imgElement.src = "https://eventafisha.com/storage/" + imgPath;

     let imgDesc = document.querySelector(".img_desc");
     imgDesc.src = "https://eventafisha.com/storage/" + imgPath;
 }
 function setCategory(obj) {
    let category = obj.category.title;
    let categoryElement = document.querySelector(".event_info_tag");
    categoryElement.innerHTML = category;
}
function setTags(obj) {
    let tags = "";
    let tagsElement = document.querySelector(".group_tags");
	for(let i=0; i < obj.tags.length; i++) {
		// console.log("tags", arr[i].title);
		tags += '<div class="event_tag green_tag_info event_tag_big">' + obj.tags[i].title + '</div>';
    };
    tagsElement.innerHTML = tags;
}