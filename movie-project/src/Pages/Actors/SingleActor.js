<<<<<<< HEAD
import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchActorDetails, fetchMoviesByActor } from "../../util/API"

const SingleActor = () => {
  const { actorId } = useParams()
  const [actor, setActor] = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
=======
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchActorDetails, fetchMoviesByActor } from "../../util/API";
import "./SingleActor.css";
import useScrollToTop from "../../ScrollToTop"

const SingleActor = () => {
  useScrollToTop();
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
>>>>>>> a3148e083480876a369ee9c5ca68b5cabd08c61f

  useEffect(() => {
    const fetchActorAndMovies = async () => {
      try {
        const actorData = await fetchActorDetails(actorId)
        setActor(actorData)

        const moviesData = await fetchMoviesByActor(actorId)
        setMovies(moviesData.cast)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchActorAndMovies()
  }, [actorId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!actor) return null

  return (
    <div className="actor-details">
<<<<<<< HEAD
      <div className="actor-info">
        <div className="actor-picture">
          <h2>{actor.name}</h2>
          {actor.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
              alt={actor.name}
            />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>

        <div className="about-section">
          <h3>About {actor.name}</h3>
          <p>Gender: {actor.gender === 2 ? "Male" : "Female"}</p>
          <p>Popularity: {actor.popularity}</p>
          <p>Birthday: {actor.birthday}</p>
          <p>Biography: {actor.biography}</p>
        </div>
      </div>

      <div className="movies-section">
        <h3>Movies Participated In:</h3>
=======
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
>>>>>>> a3148e083480876a369ee9c5ca68b5cabd08c61f
        <div className="movies-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <Link to={`/movie/${movie.id}`}>
<<<<<<< HEAD
                <div className="movie-thumbnail">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
=======
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
>>>>>>> a3148e083480876a369ee9c5ca68b5cabd08c61f
                <div className="movie-title">{movie.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleActor
