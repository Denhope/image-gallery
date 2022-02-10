export function init() {
  //set constants//
  const clientId = "Itnk5iSBAH9zF0tGrA7AukZxbNHshJ5Nq4EbhRkZVr4";
  const search = document.querySelector(".search");
  const submit = document.querySelector(".fas");
  const searchError = document.querySelector(".search-error");
  const galleryContainer = document.querySelector(".gallery__wrapper");
  const requestURL = `https://api.unsplash.com/search/photos?query=california&per_page=30&orientation=landscape&client_id=${clientId}`;
  //functions//
  async function getData(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.total > 0) {
        console.log(data.total);
        searchError.textContent = "";
        showData(data);
      } else {
        searchError.textContent = `Error! Picture '${search.value}' not found, pleese try again!`;
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

  const showError = (evt) => {
    if (evt.code === "Enter" && search.value.length == 0) {
      searchError.textContent = `Error! Enter somthing, please!`;
    }
  };

  const changePicture = (evt) => {
    const searchURL = `https://api.unsplash.com/search/photos?query=${search.value}&per_page=30&orientation=landscape&client_id=${clientId}`;
    evt.preventDefault();
    if (search.value) {
      getData(searchURL);
      console.log(searchURL);
      console.log(search.value);
    }
  };
  getData(requestURL);

  //set listener
  search.addEventListener("change", changePicture);
  search.addEventListener("keypress", showError);
  submit.addEventListener("click", changePicture);
}
