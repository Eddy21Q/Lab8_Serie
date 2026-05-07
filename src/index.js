import { getPopularShows, getShowDetails, searchShows } from "./api.js";
import { clearDetails, renderCatalog, renderDetails, renderHero, renderMessage } from "./ui.js";

const hero = document.querySelector("#hero");
const catalog = document.querySelector("#catalog");
const details = document.querySelector("#details");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const catalogTitle = document.querySelector("#catalog-title");
const catalogCount = document.querySelector("#catalog-count");

const loadShowDetails = async (showId) => {
  renderMessage(details, "Cargando detalles...");

  try {
    const show = await getShowDetails(showId);
    renderDetails(details, show);
  } catch (error) {
    renderMessage(details, "No se pudieron cargar los detalles de la serie.");
  }
};

const loadCatalog = async () => {
  catalogTitle.textContent = "Series populares";
  renderMessage(catalog, "Cargando catalogo...");

  try {
    const shows = await getPopularShows();

    renderHero(hero, shows[0]);
    renderCatalog(catalog, catalogCount, shows.slice(0, 30));
  } catch (error) {
    renderMessage(catalog, "No se pudo cargar el catalogo.");
  }
};

const loadSearchResults = async (query) => {
  catalogTitle.textContent = `Resultados para "${query}"`;
  renderMessage(catalog, "Buscando series...");
  clearDetails(details);

  try {
    const shows = await searchShows(query);

    if (shows.length > 0) {
      renderHero(hero, shows[0]);
    }

    renderCatalog(catalog, catalogCount, shows);
  } catch (error) {
    renderMessage(catalog, "No se pudo realizar la busqueda.");
  }
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === "") {
    clearDetails(details);
    loadCatalog();
    return;
  }

  loadSearchResults(query);
});

document.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-detail-id]");

  if (detailButton) {
    loadShowDetails(detailButton.dataset.detailId);
  }
});

loadCatalog();
