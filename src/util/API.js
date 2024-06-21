import axios from 'axios';

const API_KEY = 'e5bee31cf0d4f485f077a15a1474531e';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchPopularActors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/person/popular`, {
      params: {
        api_key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: API_KEY,
        query
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchMovies = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchActorDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/person/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'movie_credits'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchRelatedMovies = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/similar`, {
      params: {
        api_key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCredits = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY
      }
    });
    return response.data.cast || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'credits,videos'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchVideos = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
