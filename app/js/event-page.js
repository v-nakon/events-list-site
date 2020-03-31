let urlStringParams = window.location.search;
let urlParams = new URLSearchParams(urlStringParams);
let idEvent = urlParams.get('id');

axios.get('https://eventafisha.com/api/v1/events/' + idEvent)
    .then(function (response) {
        checkMetaData(response.data);
        document.title = response.data.title;
        setTitle(response.data);
        setDate(response.data);
        setLocation(response.data);
        setPrice(response.data);
        setBuyLink(response.data);
        setDescription(response.data);
        setImg(response.data);
        setCategory(response.data);
        setTags(response.data);
        setPromo(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
function checkMetaData(response) {
    if (response.seo.meta_title !== null) {
        setMetaData("title", response.seo.meta_title);
    } else {
        setMetaData("title", response.title);
    }
    if (response.seo.meta_desc !== null) {
        setMetaData("description", response.seo.meta_desc);
    }
    if (response.seo.meta_keywords !== null) {
        setMetaData("keywords", response.seo.meta_keywords);
    }
}
function setMetaData(name, data) {
    let meta = document.createElement('meta');
    meta.name = name;
    meta.content = data;
    document.querySelector("head").appendChild(meta);
}
function setTitle(obj) {
    let title = obj.title;
    let titleElement = document.querySelector(".event_info_title");
    titleElement.innerHTML = title;
};
function setDate(obj) {
    let startDate = new Date(obj.start_date);
    let endDate = new Date(obj.end_date);
    let dateElement = document.querySelector(".location_date");
    dateElement.innerHTML = startDate.toLocaleDateString() + " - " + endDate.toLocaleDateString();
};
function setLocation(obj) {
    let location = obj.address;
    let locationElement = document.querySelector(".location_name");
    locationElement.innerHTML = location;
};
function setPrice(obj) {
    let price = obj.cost;
    if (price == 0) {
        document.querySelector(".info_event_price").classList.add("hide_element");
        renameBtn();
    } else {
        let priceElement = document.querySelector(".price");
        priceElement.innerHTML = price;
    }
};
function setBuyLink(obj) {
    let buyLink = obj.buy_link;
    let id = obj.id;
    let redirectLink = "https://eventafisha.com/events/" + id + "/redirect-page"
    if (buyLink === null) {
        document.querySelector(".container_btn").classList.add("hide_element");
    } else {
        let buyBtn = document.getElementById("btn_buy");
        buyBtn.addEventListener("click", () => window.open(redirectLink));
    }
};
function setDescription(obj) {
    let description_parsed = obj.desc;
    let description_first = obj.description_first;
    let description_second = obj.description_second;
    let descriptionElementPars = document.querySelector(".description_parsed");
    descriptionElementPars.innerHTML = description_parsed;
    if (description_first !== null) {
        let descriptionElement1 = document.querySelector(".description_first");
        descriptionElement1.innerHTML = description_first;
    }
    if (description_second !== null) {
        let descriptionElement2 = document.querySelector(".description_second");
        descriptionElement2.innerHTML = description_second;
    }
};
function setImg(obj) {
    let imgPath = obj.images;
    //  console.log("https://eventafisha.com/storage/" + imgPath);
    let imgElement = document.querySelector(".event_img");
    imgElement.src = "https://eventafisha.com/storage/" + imgPath;

    let imgDesc = document.querySelector(".img_desc");
    imgDesc.src = "https://eventafisha.com/storage/" + imgPath;
};
function setCategory(obj) {
    let category = obj.category.title;
    let categoryElement = document.querySelector(".event_info_tag");
    categoryElement.innerHTML = category;
};
function setTags(obj) {
    let tags = "";
    let tagsElement = document.querySelector(".group_tags");
    for (let i = 0; i < obj.tags.length; i++) {
        // console.log("tags", arr[i].title);
        tags += '<div class="event_tag green_tag_info event_tag_big">' + obj.tags[i].title + '</div>';
    };
    tagsElement.innerHTML = tags;
};
function setPromo(obj) {
    let promo = obj.promocode;
    if (promo === null) {
        document.querySelector(".info_event_promocode").classList.add("hide_element");
    } else {
        let promoElement = document.querySelector(".promocode");
        promoElement.innerHTML = promo;
    }
};
function renameBtn() {
    let btn = document.querySelector("#btn_buy");
    btn.value = "РЕГИСТРАЦИЯ"
};
