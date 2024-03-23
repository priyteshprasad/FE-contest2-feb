document.addEventListener("DOMContentLoaded", function () {
  function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    getImageOfTheDay(currentDate);
  }

  function getImageOfTheDay(date) {
    const apiKey = "M0bkgB9TVMLLvy6HttvQgZHHvXSef3xguf3utmLd";
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        displayImage(data);
        saveSearch(date);
        addSearchToHistory();
      })
      .catch((error) => console.log(error));
  }

  function displayImage(data) {
    const imageContainer = document.getElementById("current-image-container");
    const imageTitle = document.getElementById("image-title");
    const imageElement = document.createElement("img");
    imageElement.src = data.url;
    imageElement.alt = data.title;
    imageContainer.innerHTML = "";
    imageContainer.appendChild(imageElement);
    imageTitle.innerHTML = data.title;

    let imageDescription = document.getElementById("image-description");
    imageDescription.innerHTML = data.explanation;
  }

  function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  }

  function addSearchToHistory() {
    const searchHistory = document.getElementById("search-history");
    searchHistory.innerHTML = "";
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.forEach((date) => {
      const listItem = document.createElement("li");
      listItem.textContent = date;
      listItem.addEventListener("click", function () {
        getImageOfTheDay(date);
      });
      searchHistory.appendChild(listItem);
    });
  }

  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchInput = document.getElementById("search-input");
    const selectedDate = searchInput.value;
    getImageOfTheDay(selectedDate);
    searchInput.value = "";
  });

  // Load current image of the day when the page loads
  getCurrentImageOfTheDay();
});
