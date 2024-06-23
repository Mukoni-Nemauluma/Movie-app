import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchRelatedMovies, fetchCredits, fetchVideos } from '../util/API';

const SingleMovie = () => {
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
    <div>
      <h1>{movie.title}</h1>
      {movie.poster_path ? (
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      ) : (
        <p>No poster available</p>
      )}
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
      <p><strong>Language:</strong> {movie.original_language}</p>
      <p><strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Director:</strong> {director}</p>
      <p><strong>Production Company:</strong> {company.name}</p>
      {company.logo_path && (
        <img src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} alt={company.name} />
      )}

      <h2>Cast</h2>
      <ul>
        {credits.map((actor) => (
          <li key={actor.id}>
            <Link to={`/actors/${actor.id}`}>
              {actor.profile_path ? (
                <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              ) : (
                <p>No image available</p>
              )}
              
                <p>{actor.name}</p>
            </Link>
          </li>
        ))}
      </ul>

      {videos.length > 0 && (
        <iframe
          title="trailer"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videos[0].key}`}
          allowFullScreen
        />
      )}

      <h2>Related Movies</h2>
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
