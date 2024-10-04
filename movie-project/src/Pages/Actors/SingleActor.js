import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchActorDetails, fetchMoviesByActor } from "../../util/API";
import useScrollToTop from "../../ScrollToTop";

const SingleActor = () => {
  useScrollToTop();
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActorAndMovies = async () => {
      try {
        const actorData = await fetchActorDetails(actorId);
        setActor(actorData);

        const moviesData = await fetchMoviesByActor(actorId);
        setMovies(moviesData.cast);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActorAndMovies();
  }, [actorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!actor) return null;

  return (
    <div className="actor-details">
      <div className="content">
        <div className="actor-main">
          <img
            className="actor-picture"
            src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
            alt={actor.name}
          />
          <div className="about-section">
            <h2>{actor.name}</h2>
            <p>Gender: {actor.gender === 2 ? "Male" : "Female"}</p>
            <p>Popularity: {actor.popularity}</p>
            <p>Birthday: {actor.birthday}</p>
            <hr />
            <h3>Biography:</h3>
            <p>{actor.biography}</p>
          </div>
        </div>

        <div className="movies-section">
          <h3 className="genre-title">Movies Participated In:</h3>
          <div className="movies-list">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-item">
                <Link to={`/movie/${movie.id}`}>
                  <div className="movie-thumbnail">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                    {!movie.poster_path && (
                      <div className="no-image">No Image Available</div>
                    )}
                  </div>
                  <div className="movie-title">{movie.title}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleActor;
