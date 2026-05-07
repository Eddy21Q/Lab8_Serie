import { getEpisodeList, getShowData, searchShowByName } from "./services/tvmaze.js";

const ID = "2993";

const $form = document.querySelector(".search-form");
const $header = document.querySelector(".show-header");
const $episodes = document.querySelector(".episodes");

const setHTML = ($element, html) => {
  if ("setHTMLUnsafe" in $element) {
    $element.setHTMLUnsafe(html);
    return;
  }

  $element.innerHTML = html;
};

const getRatingClass = (rating) => {
  if (rating === null || rating === undefined) {
    return 0;
  }

  return Math.floor(rating);
};

const removeHTMLTags = (text = "") => text.replace(/<[^>]*>/g, "");

const createHeaderHTML = (show) => `
  <img class="poster" src="${show.image}" alt="Poster de ${show.name}">
  <div>
    <h1>${show.name}</h1>
    <p class="show-rating">Rating: ${show.rating.average ?? "N/A"}</p>
    <p class="show-meta">
      ID: ${show.id} | ${show.language ?? "Idioma no disponible"} | ${show.status ?? "Estado no disponible"}
    </p>
    <p class="show-meta">
      ${show.premiered ?? "Sin fecha de estreno"} | ${show.genres.length > 0 ? show.genres.join(", ") : "Sin generos"}
    </p>
    <p class="summary">${removeHTMLTags(show.summary) || "Sin sinopsis disponible."}</p>
  </div>
`;

const createEpisodeHTML = (episode) => {
  const rating = getRatingClass(episode.rating);
  const title = `Temporada ${episode.season}, episodio ${episode.number}, rating ${episode.rating ?? "N/A"}`;

  return `
    <div class="episode episode-${episode.number} rating-${rating}" title="${title}">
      ${episode.number}
    </div>
  `;
};

const createSeasonHTML = (data, number) => `
  <article class="season">
    <header class="season-header">T${String(number).padStart(2, "0")}</header>
    ${data.map((episode) => createEpisodeHTML(episode)).join("")}
  </article>
`;

const render = async (id = ID) => {
  setHTML($header, '<p class="message">Cargando serie...</p>');
  setHTML($episodes, '<p class="message">Cargando episodios...</p>');

  try {
    const show = await getShowData(id);
    const seasons = await getEpisodeList(id);

    const list = Object.values(seasons).map((season, index) => createSeasonHTML(season, index + 1));

    setHTML($header, createHeaderHTML(show));
    setHTML($episodes, list.join(""));
  } catch (error) {
    setHTML($header, '<p class="message">No se pudo cargar la serie.</p>');
    setHTML($episodes, "");
  }
};

$form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData($form);
  const query = formData.get("show").trim();

  setHTML($header, '<p class="message">Buscando serie...</p>');
  setHTML($episodes, "");

  try {
    const results = await searchShowByName(query);

    if (results.length === 0) {
      setHTML($header, '<p class="message">No se encontro ninguna serie.</p>');
      return;
    }

    render(results[0].id);
  } catch (error) {
    setHTML($header, '<p class="message">No se pudo realizar la busqueda.</p>');
  }
});

render();
