/*
import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../util/API';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAllMovies = async () => {
      const response = await fetchMovies('/discover/movie');
      setMovies(response.results);
    };

    fetchAllMovies();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetchMovies(`/search/movie&query=${searchQuery}`);
    setMovies(response.results);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
*/