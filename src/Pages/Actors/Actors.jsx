import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchActorDetails, fetchMoviesByActor } from "../../util/API"

const Actors = () => {
  const { actorId } = useParams()
  const [actor, setActor] = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      <h2>{actor.name}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
        alt={actor.name}
      />
      <p>Gender: {actor.gender === 2 ? "Male" : "Female"}</p>
      <p>Popularity: {actor.popularity}</p>
      <p>Birthday: {actor.birthday}</p>
      <p>Biography: {actor.biography}</p>

      {/* Display movies */}
      <h3>Movies Participated In:</h3>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Actors
