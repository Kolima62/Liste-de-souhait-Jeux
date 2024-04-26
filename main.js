import { fetchData } from "./fetch.js";

const API_KEY = "ede47c8dc0c84d55a1182f6e353eb223";
const API_URL = "https://api.rawg.io/api/games";

const root = document.querySelector("#root");
const main = document.createElement("main");
root.append(main);

fetchData({
  ...{ url: `https://api.rawg.io/api/games?key=${API_KEY}` },
}).then((data) => {
  data.results.map((game) => {
    //   console.log(game.rating);
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const titreCard = document.createElement("h2");
    titreCard.innerText = game.name;
    const image = document.createElement("div");
    image.style.background = `url(${game.background_image}) no-repeat center center / cover`;
    image.setAttribute("class", "image");
    const content = document.createElement("ol");
    const separator = document.createElement("hr");
    const rating = document.createElement("div");
    rating.setAttribute("class", "rating");
    rating.innerText = `Note: ${game.rating}`;
    card.append(titreCard, image, content, separator, rating);
    main.append(card);
  });
});

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

async function searchAPI(query) {
  try {
    const response = await fetch(`${API_URL}?q=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
  }
}

async function handleSearch(event) {
  const query = event.target.value;
  if (query.length > 0) {
    const results = await searchAPI(query);
    displayResults(results);
  } else {
    searchResults.innerHTML = ""; // Effacer les résultats si la recherche est vide
  }
}

function displayResults(results) {
  searchResults.innerHTML = ""; // Effacer les anciens résultats
  results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = result.card; // Adapter en fonction de la structure de vos données
    searchResults.appendChild(li);
  });
}

searchInput.addEventListener("input", handleSearch);
