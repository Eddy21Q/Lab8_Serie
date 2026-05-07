const API_URL = "https://api.tvmaze.com";

export const getPopularShows = async () => {
  const response = await fetch(`${API_URL}/shows?page=1`);
  return response.json();
};

export const searchShows = async (query) => {
  const response = await fetch(`${API_URL}/search/shows?q=${encodeURIComponent(query)}`);
  const results = await response.json();

  return results.map((result) => result.show);
};

export const getShowDetails = async (showId) => {
  const response = await fetch(`${API_URL}/shows/${showId}?embed[]=seasons&embed[]=episodes`);
  return response.json();
};
