import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchActorDetails, fetchMoviesByActor } from "../../util/API";
import "./SingleActor.css";

const SingleActor = () => {
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
        <div className="biography">
          <div className="actor-main">
            <img
              src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
              alt={actor.name}
            />
            <div className="actor-info">
              <h2>{actor.name}</h2>
              <div className="actor-stats">
                <p>Gender: {actor.gender === 2 ? "Male" : "Female"}</p>
                <p>Popularity: {actor.popularity}</p>
                <p>Birthday: {actor.birthday}</p>
              </div>
              <h3>Biography:</h3>
              <p>{actor.biography}</p>
            </div>
          </div>
        </div>
        <div className="movies-header">
          <h3>Movies Participated In:</h3>
        </div>
        <div className="movies-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="movie-title">{movie.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleActor;
