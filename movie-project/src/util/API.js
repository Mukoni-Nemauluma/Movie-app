const API_BASEURL = "https://api.themoviedb.org/3";
const API_KEY = "e5bee31cf0d4f485f077a15a1474531e";

const fetchAPI = async (endpoint, params = {}) => {
  try {
    const url = new URL(`${API_BASEURL}${endpoint}`);
    url.searchParams.append("api_key", API_KEY);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch API: ${error.message}`);
  }
};

export const fetchGenres = async () => {
  return fetchAPI(`/genre/movie/list`);
};

export const fetchPopularActors = async () => {
  return fetchAPI(`/person/popular`);
};

export const fetchMoviesByCategory = async (category) => {
  return fetchAPI(`/movie/${category}`);
};

export const fetchActorDetails = async (actorId) => {
  return fetchAPI(`/person/${actorId}`);
};

export const fetchTopRatedMovies = async () => {
  return fetchAPI(`/movie/top_rated`);
};

export const fetchPopularMovies = async () => {
  return fetchAPI(`/movie/popular`);
};

export const fetchNowPlayingMovies = async () => {
  return fetchAPI(`/movie/now_playing`);
};

export const fetchUpcomingMovies = async () => {
  return fetchAPI(`/movie/upcoming`);
};

export const fetchMoviesByGenre = async (genreId) => {
  return fetchAPI(`/discover/movie`, { with_genres: genreId });
};

export const searchMovies = async (query) => {
  return fetchAPI(`/search/movie`, { query: encodeURIComponent(query) });
};

export const searchActors = async (query) => {
  return fetchAPI(`/search/person`, { query: encodeURIComponent(query) });
};

export const searchTVShows = async (query) => {
  return fetchAPI(`/search/tv`, { query: encodeURIComponent(query) });
};

export const fetchMoviesByActor = async (actorId) => {
  return fetchAPI(`/person/${actorId}/movie_credits`);
};

export const fetchMovies = async (criteria = "popular") => {
  return fetchAPI(`/movie/${criteria}`);
};

export const fetchCredits = async (movieId) => {
    return fetchAPI(`/movie/${movieId}/credits`);
  };


export const fetchMovieDetails = async (movieId) => {

    return fetchAPI(`/movie/${movieId}`);
};

export const fetchVideos = async (movieId) => {
    return fetchAPI(`/movie/${movieId}/videos`);
};

export const fetchRelatedMovies = async (id) => { 
    return fetchAPI(`/movie/${id}/similar`);
};

export const fetchSearchResults = async (query) => {
  return fetchAPI(`/search/multi`)
};

export const fetchTVShows = async (criteria = "popular") => {
  return fetchAPI(`/tv/${criteria}`);
};


export const fetchTVShowDetails = async (tvId) => {
  return fetchAPI(`/tv/${tvId}`);
};

export const fetchTVCredits = async (tvId) => {
  return fetchAPI(`/tv/${tvId}/credits`);
};

export const fetchRelatedTVShows = async (id) => {
  return fetchAPI(`/tv/${id}/similar`);
};

export const fetchTVVideos = async (tvId) => {
  return fetchAPI(`/tv/${tvId}/videos`);
};