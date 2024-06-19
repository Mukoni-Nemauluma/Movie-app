const API_KEY = 'e5bee31cf0d4f485f077a15a1474531e';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  return response.json();
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`);
  return response.json();
};

export const fetchPopularActors = async () => {
  const response = await fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}`);
  return response.json();
};

export const fetchActorDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&append_to_response=movie_credits`);
  return response.json();
};

export const fetchRelatedMovies = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const fetchCredits = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  return response.json();
};

export const fetchMovieVideos = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  return response.json();
};