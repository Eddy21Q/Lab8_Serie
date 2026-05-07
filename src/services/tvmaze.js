const PLACEHOLDER_IMAGE = "https://placehold.co/210x295";

export const getShowData = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}`;
  const data = await fetch(URL).then((res) => res.json());

  return {
    id: data.id,
    name: data.name,
    rating: data.rating,
    image: data.image?.medium ?? PLACEHOLDER_IMAGE,
    summary: data.summary,
    language: data.language,
    genres: data.genres,
    status: data.status,
    premiered: data.premiered,
  };
};

export const searchShowByName = async (name) => {
  const URL = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(name)}`;
  const results = await fetch(URL).then((res) => res.json());

  return results.map((result) => ({
    id: result.show.id,
    name: result.show.name,
  }));
};

export const getEpisodeList = async (id) => {
  const URL = `https://api.tvmaze.com/shows/${id}/episodes`;
  const episodes = await fetch(URL).then((res) => res.json());

  const episodeList = episodes.map((episode) => ({
    number: episode.number,
    season: episode.season,
    rating: episode.rating.average,
  }));

  if (Object.groupBy) {
    return Object.groupBy(episodeList, (episode) => episode.season);
  }

  return episodeList.reduce((episodesBySeason, episode) => {
    episodesBySeason[episode.season] ??= [];
    episodesBySeason[episode.season].push(episode);
    return episodesBySeason;
  }, {});
};
