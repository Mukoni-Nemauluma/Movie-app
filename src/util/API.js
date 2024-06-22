import axios from "axios"

const API_BASEURL = "https://api.themoviedb.org/3"
const API_KEY = "e5bee31cf0d4f485f077a15a1474531e"

const fetchAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASEURL}${endpoint}`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return await response.json()
  } catch (error) {
    throw new Error(`Failed to fetch API: ${error.message}`)
  }
}

export const fetchGenres = async () => {
  return fetchAPI(`/genre/movie/list?api_key=${API_KEY}`)
}

export const fetchPopularActors = async () => {
  return fetchAPI(`/person/popular?api_key=${API_KEY}`)
}

export const fetchMoviesByCategory = async (category) => {
  return fetchAPI(`/movie/${category}?api_key=${API_KEY}`)
}

export const fetchMovieDetails = async (movieId) => {
  return fetchAPI(`/movie/${movieId}?api_key=${API_KEY}`)
}

export const fetchActorDetails = async (actorId) => {
  return fetchAPI(`/person/${actorId}?api_key=${API_KEY}`)
}

export const fetchTopRatedMovies = async () => {
  return fetchAPI(`/movie/top_rated?api_key=${API_KEY}`)
}

export const fetchPopularMovies = async () => {
  return fetchAPI(`/movie/popular?api_key=${API_KEY}`)
}

export const fetchNowPlayingMovies = async () => {
  return fetchAPI(`/movie/now_playing?api_key=${API_KEY}`)
}

export const fetchUpcomingMovies = async () => {
  return fetchAPI(`/movie/upcoming?api_key=${API_KEY}`)
}

export const fetchMoviesByGenre = async (genreId) => {
  return fetchAPI(`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
}

export const searchMovies = async (query) => {
  return fetchAPI(
    `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  )
}

export const searchActors = async (query) => {
  return fetchAPI(
    `/search/person?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  )
}

export const fetchMoviesByActor = async (actorId) => {
  return fetchAPI(`/person/${actorId}/movie_credits?api_key=${API_KEY}`)
}
