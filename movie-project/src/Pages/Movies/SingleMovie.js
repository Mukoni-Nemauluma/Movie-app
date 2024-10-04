import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchRelatedMovies, fetchCredits, fetchVideos } from '../../util/API';
import useScrollToTop from "../../ScrollToTop";

const SingleMovie = () => {
  useScrollToTop();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);
  const [director, setDirector] = useState("");
  const [company, setCompany] = useState({ name: "", logo_path: "" });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieResponse = await fetchMovieDetails(id);
        setMovie(movieResponse);

        const relatedResponse = await fetchRelatedMovies(id);
        setRelatedMovies(relatedResponse.results.slice(0, 8) || []);

        const creditsResponse = await fetchCredits(id);
        const mainCast = creditsResponse.cast.slice(0, 5) || [];
        setCredits(mainCast);

        const directorInfo = creditsResponse.crew.find(
          (member) => member.job === "Director"
        );
        setDirector(directorInfo ? directorInfo.name : "N/A");

        const productionCompany = movieResponse.production_companies[0] || { name: "N/A", logo_path: null };
        setCompany(productionCompany);

        const videosResponse = await fetchVideos(id);
        setVideos(videosResponse.results || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="single-movie-container">
      <div
        className="movie-details"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="color-overlay"></div>
        <div className="movie-content">
          <h1 className="movie-title">{movie.title}</h1>
          {movie.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          ) : (
            <p>No poster available</p>
          )}
          <p className="movie-info"><strong>Release Date:</strong> {movie.release_date}</p>
          <p className="movie-info"><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p className="movie-info"><strong>Language:</strong> {movie.original_language}</p>
          <p className="movie-info"><strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)</p>
          <p className="movie-desc"><strong>Overview:</strong> {movie.overview}</p>
          <p className="movie-info"><strong>Director:</strong> {director}</p>
          <div className="production-company">
            <p className="movie-info"><strong>Production Company:</strong> {company.name}</p>
            {company.logo_path && (
              <img src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} alt={company.name} />
            )}
          </div>
        </div>
      </div>

      <h2 className="related-title">Cast</h2>
      <ul className="cast-list">
        {credits.map((actor) => (
          <li key={actor.id} className="cast-item">
            <Link to={`/actors/${actor.id}`}>
              {actor.profile_path ? (
                <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              ) : (
                <p>No image available</p>
              )}
              <h3 className="actor-name"><strong>{actor.name}</strong></h3>
              <p>Role: {actor.character}</p>
            </Link>
          </li>
        ))}
      </ul>

      {videos.length > 0 && (
        <div className="trailer-container">
          <iframe
            title="trailer"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videos[0].key}`}
            allowFullScreen
          />
        </div>
      )}

      <h2 className="related-title">Related Movies</h2>
      <div className="related-movies-grid">
        {relatedMovies.map((relatedMovie) => (
          <div key={relatedMovie.id} className="related-movie-card">
            <Link to={`/movie/${relatedMovie.id}`}>
              {relatedMovie.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w500${relatedMovie.poster_path}`} alt={relatedMovie.title} />
              ) : (
                <p>No poster available</p>
              )}
              <h3>{relatedMovie.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleMovie;
