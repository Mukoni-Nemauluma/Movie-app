import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../util/API';

const Home = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      const response = await fetchMovies('/movie/popular');
      const movies = response.results;
      setMovie(movies[Math.floor(Math.random() * movies.length)]);
    };

    fetchRandomMovie();
  }, []);

  return (
    <div>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>{movie.overview}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
