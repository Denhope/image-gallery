export function init() {
  //set constants//
  const clientId = "Itnk5iSBAH9zF0tGrA7AukZxbNHshJ5Nq4EbhRkZVr4";
  const search = document.querySelector(".search-app");
  const submit = document.querySelector(".fas");
  const searchError = document.querySelector(".search-error");
  const galleryContainer = document.querySelector(".gallery__wrapper");
  const closeButton = document.querySelector(".close");
  const cleanButton = document.querySelector(".fa-xmark");
  const body = document.querySelector("body");

  const requestURL = `https://api.unsplash.com/search/photos?query=california&per_page=30&orientation=landscape&client_id=${clientId}`;
  //functions//
  async function getData(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.total > 0) {
        // console.log(data.total);
        searchError.textContent = "";
        showData(data);
      } else {
        searchError.textContent = `Picture '${search.value}' not found, please try again!`;
      }
    } catch (err) {
      console.log(err);
    }
  }

  const showData = (data) => {
    galleryContainer.innerHTML = "";
    data.results.map((value) => {
      const img = `<img class="gallery-img" src="${value.urls.regular}" alt="${value.alt_description}">`;
      galleryContainer.insertAdjacentHTML("beforeend", img);
    });
  };

  const readRequest = (evt) => {
    if (evt.code === "Enter" && search.value.length == 0) {
      searchError.textContent = `Enter something, please!`;
    } else if (evt.code === "Enter" && search.value.length !== 0) {
      changePicture();
    } else if (evt.target === submit) {
      console.log("gecnjq");
    }
  };

  const changePicture = (evt) => {
    const searchURL = `https://api.unsplash.com/search/photos?query=${search.value}&per_page=30&orientation=landscape&client_id=${clientId}`;
    if (search.value) {
      getData(searchURL);
    }
  };

  //view picture functions
  function viewPicture(evt) {
    if (evt.target.tagName != "IMG") {
      return false;
    }
    let bigImg = this.appendChild(document.createElement("DIV"));
    bigImg.style.background = `center / 100% 100% no-repeat url('${evt.target.currentSrc}')`;

    bigImg.addEventListener("click", function () {
      this.addEventListener("transitionend", function () {
        this.remove();
      });
      this.style.height = this.style.width = `0px`;
      galleryContainer.classList.toggle("show");
      body.classList.toggle("body_lock");
    });
    bigImg.classList.toggle("active");
    galleryContainer.classList.toggle("show");
    body.classList.toggle("body_lock");
  }

  getData(requestURL);

  //set listener
  search.addEventListener("keypress", readRequest);
  galleryContainer.addEventListener("click", viewPicture);
  submit.addEventListener("click", function () {
    if (search.value.length == 0) {
      searchError.textContent = `Enter something, please!`;
    } else {
      changePicture();
    }
  });
}
