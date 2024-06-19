import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchRelatedMovies, fetchCredits, fetchMovieVideos } from '../util/API';

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetchMovieDetails(id);
      setMovie(response);
    };

    const fetchRelated = async () => {
      const response = await fetchRelatedMovies(id);
      setRelatedMovies(response.results || []);
    };

    const fetchMovieCredits = async () => {
      const response = await fetchCredits(id);
      setCredits(response.cast.slice(0, 5));
    };

    const fetchMovieVideos = async () => {
      const response = await fetchMovieVideos(id);
      setVideos(response.results);
    };

    fetchDetails();
    fetchRelated();
    fetchMovieCredits();
    fetchMovieVideos();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>Release Date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <p>Language: {movie.original_language}</p>
      <p>Rating: {movie.vote_average} ({movie.vote_count} votes)</p>
      <p>Director: {movie.credits.crew.find(member => member.job === 'Director')?.name}</p>
      <p>Overview: {movie.overview}</p>
      <h2>Cast</h2>
      <ul>
        {credits.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
      <h2>Related Movies</h2>
      <div>
        {relatedMovies.map((relatedMovie) => (
          <div key={relatedMovie.id}>
            <h3>{relatedMovie.title}</h3>
            <a href={`/movies/${relatedMovie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${relatedMovie.poster_path}`} alt={relatedMovie.title} />
            </a>
          </div>
        ))}
      </div>
      <h2>Trailer</h2>
      {videos.length > 0 && (
        <iframe
          title="trailer"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videos[0].key}`}
          allowFullScreen
        />
      )}
      <h2>Production Companies</h2>
      <div>
        {movie.production_companies.map((company) => (
          <div key={company.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
              alt={company.name}
              style={{ width: '100px' }}
            />
            <p>{company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleMovie;
