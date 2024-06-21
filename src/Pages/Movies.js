import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMovies } from '../util/API';

const Movies = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchCategoryMovies = async () => {
      let endpoint;
      switch (category) {
        case 'top-rated':
          endpoint = '/movie/top_rated';
          break;
        case 'popular':
          endpoint = '/movie/popular';
          break;
        case 'latest':
          endpoint = '/movie/latest';
          break;
        case 'now-playing':
          endpoint = '/movie/now_playing';
          break;
        case 'upcoming':
          endpoint = '/movie/upcoming';
          break;
        default:
          endpoint = '/movie/popular';
      }

      try {
        const response = await fetchMovies(endpoint);
        setMovies(response.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchCategoryMovies();
  }, [category]);

  return (
    <div>
      <h2>{category.replace("-", " ")}</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
