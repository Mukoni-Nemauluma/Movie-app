import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchMoviesByGenre, fetchGenreName } from "../../util/API"

const Genre = () => {
  const { genreId } = useParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [genreName, setGenreName] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMoviesByGenre(genreId)
        setMovies(response.results)

        const genreName = await fetchGenreName(genreId)
        setGenreName(genreName)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [genreId])

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        {genreName} Movies
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card bg-gray-800 p-2 rounded-lg flex flex-col items-center"
          >
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path ? (
                <div className="flex justify-center items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} // Increased width to w300
                    alt={movie.title}
                    className="w-40 h-60 object-cover rounded-md transition-transform transform hover:scale-105 duration-300 mb-1" // Adjusted width and height
                  />
                </div>
              ) : (
                <p className="text-gray-400">No poster available</p>
              )}
              <p className="text-sm font-semibold text-center">{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Genre
