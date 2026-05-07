const fallbackImage = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";

const removeHtmlTags = (text = "") => text.replace(/<[^>]*>/g, "");

const getImage = (show) => show.image?.original ?? show.image?.medium ?? fallbackImage;

const getGenres = (show) => (show.genres.length > 0 ? show.genres.join(", ") : "Sin generos");

export const renderMessage = (container, message) => {
  container.innerHTML = `<p class="message">${message}</p>`;
};

export const clearDetails = (details) => {
  details.innerHTML = "";
};

export const renderHero = (hero, show) => {
  const summary = removeHtmlTags(show.summary) || "Sin sinopsis disponible.";

  hero.innerHTML = `
    <div class="hero-content">
      <img src="${getImage(show)}" alt="Poster de ${show.name}" />
      <div>
        <h2>${show.name}</h2>
        <div class="meta">
          <span>${show.premiered ?? "Sin estreno"}</span>
          <span>${show.language ?? "Idioma no disponible"}</span>
          <span>${getGenres(show)}</span>
          <span>Rating: ${show.rating.average ?? "N/A"}</span>
        </div>
        <p>${summary}</p>
        <div class="actions">
          <button type="button" data-detail-id="${show.id}">Ver detalles</button>
          <a class="link-button secondary" href="https://www.youtube.com/results?search_query=${encodeURIComponent(`${show.name} trailer`)}" target="_blank" rel="noreferrer">Trailer</a>
        </div>
      </div>
    </div>
  `;
};

export const renderCatalog = (catalog, catalogCount, items) => {
  catalogCount.textContent = `${items.length} series`;

  if (items.length === 0) {
    renderMessage(catalog, "No se encontraron series.");
    return;
  }

  catalog.innerHTML = items
    .map(
      (show) => `
        <button class="show-card" type="button" data-detail-id="${show.id}">
          <img class="poster" src="${show.image?.medium ?? fallbackImage}" alt="Poster de ${show.name}" />
          <h3>${show.name}</h3>
          <p>${show.language ?? "Idioma no disponible"}</p>
        </button>
      `,
    )
    .join("");
};

export const renderDetails = (details, show) => {
  const seasons = show._embedded.seasons;
  const episodes = show._embedded.episodes;
  const summary = removeHtmlTags(show.summary) || "Sin sinopsis disponible.";
  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${show.name} trailer`)}`;

  details.innerHTML = `
    <div class="details-panel">
      <img src="${show.image?.medium ?? fallbackImage}" alt="Poster de ${show.name}" />
      <div>
        <h2>${show.name}</h2>
        <p>${summary}</p>

        <div class="actions">
          <a class="link-button" href="${trailerUrl}" target="_blank" rel="noreferrer">Buscar trailer</a>
          <a class="link-button secondary" href="${show.url}" target="_blank" rel="noreferrer">Ver en TVMaze</a>
        </div>

        <div class="details-grid">
          <div class="detail-box"><span>ID</span>${show.id}</div>
          <div class="detail-box"><span>Estado</span>${show.status ?? "No disponible"}</div>
          <div class="detail-box"><span>Tipo</span>${show.type ?? "No disponible"}</div>
          <div class="detail-box"><span>Idioma</span>${show.language ?? "No disponible"}</div>
          <div class="detail-box"><span>Generos</span>${getGenres(show)}</div>
          <div class="detail-box"><span>Episodios</span>${episodes.length}</div>
        </div>

        <h3>Temporadas</h3>
        <div class="seasons">
          ${
            seasons.length > 0
              ? seasons
                  .map(
                    (season) => `
                      <div class="season">
                        <strong>Temporada ${season.number}</strong>
                        <span>${season.episodeOrder ?? "?"} episodios</span>
                      </div>
                    `,
                  )
                  .join("")
              : '<p class="muted">No hay informacion de temporadas.</p>'
          }
        </div>
      </div>
    </div>
  `;

  details.scrollIntoView({ behavior: "smooth", block: "start" });
};
