
var modal = document.querySelector(".container_modal");
var createEventBtn = document.querySelector(".container_create_event");
var closeModal = document.querySelector(".close_modal");
var imgBase64 = "";
getCategories();
getTags();
getCities();
// When the user clicks the button, open the modal 
createEventBtn.addEventListener("click", function() {
    modal.style.display = "block";
});
// When the user clicks on <span> (x), close the modal
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});
// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

function getCategories() {
    axios.get('https://eventafisha.com/api/v1/categories')
    .then(function (response) {
      for(let item in response.data) {
        addOptionSelect(response.data[item], "modal_category");
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
function getTags() {
    axios.get('https://eventafisha.com/api/v1/tags')
    .then(function (response) {
      for(let item in response.data) {
        addOptionSelect(response.data[item], "modal_tags");
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
function getCities() {
    axios.get('https://eventafisha.com/api/v1/cities')
    .then(function (response) {
      for(let item in response.data) {
        addOptionSelect(response.data[item], "modal_city");
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
function getBase64() {
   let file = document.querySelector("#modal_img").files[0];
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
    //  console.log(reader.result);
     imgBase64 = reader.result;
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
};
 
function getInputValue() {
    let nameEvent = document.querySelector("#modal_event_name").value;
    let startDateEvent = document.querySelector("#modal_start_date").value;
    let endDateEvent = document.querySelector("#modal_end_date").value;
    let timeEvent = document.querySelector("#modal_time").value;
    let priceEvent = document.querySelector("#modal_price").value;
    let categoryEvent = document.querySelector("#modal_category").value;
    let tagsElement = document.querySelector("#modal_tags");
    let tagsEvent = [];
        for (var i = 0; i < tagsElement.length; i++) {
            if (tagsElement.options[i].selected) tagsEvent.push(tagsElement.options[i].value);
        }
    let cityEvent = document.querySelector("#modal_city").value;
    let addressEvent = document.querySelector("#modal_address").value;
    let descEvent = document.querySelector("#modal_description").value;
    let imgEvent = imgBase64;
    // let organizerEvent = document.querySelector("#modal_organizer").value;
    let urlEvent = document.querySelector("#modal_url").value;
    let clientInfoEvent = document.querySelector("#modal_client_info").value;
    let objData = {
        title: nameEvent,
        start_date: startDateEvent,
        end_date: endDateEvent,
        time: timeEvent,
        address: addressEvent,
        cost: priceEvent,
        city_id: cityEvent,
        category_id: categoryEvent,
        tags: tagsEvent, //array
        // organizer_id: organizerEvent,
        buy_link: urlEvent,
        desc: descEvent,
        image: imgEvent, //file
        client: clientInfoEvent // info client(phone, mail ...)
    };
    console.log(objData);
    axios.post('https://eventafisha.com/api/v1/events', {
        title: nameEvent,
        start_date: startDateEvent,
        end_date: endDateEvent,
        time: timeEvent,
        address: addressEvent,
        cost: priceEvent,
        city_id: cityEvent,
        category_id: categoryEvent,
        tags: tagsEvent, //array
        // organizer_id: organizerEvent,
        buy_link: urlEvent,
        desc: descEvent,
        image: imgEvent, //file
        client: clientInfoEvent // info client(phone, mail ...)
     })
     .then(function (response) {
        console.log(response);
     })
     .catch(function (error) {
        console.log(error);
     });
}
