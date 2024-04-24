import { fetchData } from "./fetch.js";

const API_KEY = "ede47c8dc0c84d55a1182f6e353eb223";

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
  });
  const separator = document.createElement("hr");
  const rating = document.createElement("div");
  rating.setAttribute("class", "rating");
  rating.innerText = `Note: ${game.rating}`;

  card.append(titreCard, image, content, separator, rating);
  main.append(card);
});
