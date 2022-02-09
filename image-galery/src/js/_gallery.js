export function init() {
  //set constants
  const clientId = "Itnk5iSBAH9zF0tGrA7AukZxbNHshJ5Nq4EbhRkZVr4";
  const search = document.querySelector(".search");
  const searchError = document.querySelector(".search-error");
  const galleryContainer = document.querySelector(".gallery__wrapper");
  const requestURL = `https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=${clientId}`;
  //functions
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
        //   showError();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function showData(data) {
    galleryContainer.innerHTML = "";
    data.results.map((value) => {
      const img = `<img class="gallery-img" src="${value.urls.regular}" alt="${value.alt_description}">`;
      galleryContainer.insertAdjacentHTML("beforeend", img);
    });
  }

  function showError(evt) {
    if (evt.code === "Enter" && search.value.length == 0) {
      searchError.textContent = `Error! Enter somthing, please!`;
    }
  }

  function changePicture(event) {
    const searchURL = `https://api.unsplash.com/search/photos?query=${search.value}&per_page=30&orientation=landscape&client_id=${clientId}`;
    event.preventDefault();
    if (search.value) {
      getData(searchURL);
      console.log(searchURL);
      console.log(search.value);
    }
  }
  getData(requestURL);

  //set listener
  search.addEventListener("change", changePicture);
  search.addEventListener("keypress", showError);
}