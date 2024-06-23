import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMoviesByGenre } from "../../util/API";

const Genre = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMoviesByGenre(genreId);
        setMovies(response.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genreId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="genres-page">
      <h1>Genre Movies</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <p>No poster available</p>
              )}
              <p>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genre;
