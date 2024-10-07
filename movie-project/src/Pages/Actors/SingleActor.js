import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchActorDetails, fetchMoviesByActor } from "../../util/API"
import useScrollToTop from "../../ScrollToTop"

const SingleActor = () => {
  useScrollToTop()
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

  if (loading)
    return <div className="text-center text-lg text-gray-500">Loading...</div>
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>
  if (!actor) return null

  return (
    <div className="actor-details container mx-auto py-8 px-4 md:px-8">
      {/* Actor Info */}
      <div className="content flex flex-col md:flex-row items-center mb-10">
        <div className="actor-main flex flex-col items-center md:items-start md:flex-shrink-0">
          <img
            className="actor-picture w-48 h-48 md:w-64 md:h-64 rounded-full object-cover mb-6"
            src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
            alt={actor.name}
          />
        </div>
        <div className="about-section md:ml-10 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-4">{actor.name}</h2>
          <p className="text-lg text-gray-400 mb-2">
            Gender: {actor.gender === 2 ? "Male" : "Female"}
          </p>
          <p className="text-lg text-gray-400 mb-2">
            Popularity: {actor.popularity}
          </p>
          <p className="text-lg text-gray-400 mb-2">
            Birthday: {actor.birthday}
          </p>
          <hr className="my-4 border-gray-600" />
          <h3 className="text-2xl font-semibold text-white mb-4">Biography:</h3>
          <p className="text-gray-300">{actor.biography}</p>
        </div>
      </div>

      {/* Movies Section */}
      <div className="movies-section">
        <h3 className="text-2xl font-semibold text-white mb-6">
          Movies Participated In:
        </h3>
        <div className="movies-list grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-item bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <Link to={`/movie/${movie.id}`}>
                <div className="movie-thumbnail mb-4">
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-md w-full h-auto transition-transform transform hover:scale-105 duration-300"
                    />
                  ) : (
                    <div className="no-image text-center text-gray-500">
                      No Image Available
                    </div>
                  )}
                </div>
                <div className="movie-title text-white text-center font-semibold">
                  {movie.title}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleActor
