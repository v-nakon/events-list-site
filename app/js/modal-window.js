
var modal = document.querySelector(".container_modal");
var createEventBtn = document.querySelector(".container_create_event");
var closeModal = document.querySelector(".close_modal");
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