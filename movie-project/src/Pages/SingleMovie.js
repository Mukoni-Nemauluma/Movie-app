import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchMovieDetails, fetchRelatedMovies } from '../util/API';

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetchMovieDetails(id);
      setMovie(response);
    };

    const fetchRelated = async () => {
      const response = await fetchRelatedMovies(id);
      setRelatedMovies(response.results || []);
    };

    fetchDetails();
    fetchRelated();
  }, [id]);

  const handleMovieClick = (movieId) => {
    history.push(`/movies/${movieId}`);
  };

  return (
    <div>
      {movie ? (
        <div>
          <h1>{movie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>{movie.overview}</p>
          <h2>Cast</h2>
          <ul>
            {movie.credits.cast.slice(0, 5).map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
          <h2>Related Movies</h2>
          <div>
            {relatedMovies.map((relatedMovie) => (
              <div key={relatedMovie.id} onClick={() => handleMovieClick(relatedMovie.id)}>
                <h3>{relatedMovie.title}</h3>
                <img src={`https://image.tmdb.org/t/p/w500${relatedMovie.poster_path}`} alt={relatedMovie.title} />
              </div>
            ))}
          </div>
          <h2>Trailer</h2>
          {movie.videos.results.length > 0 && (
            <iframe
              title="trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
              allowFullScreen
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleMovie;
