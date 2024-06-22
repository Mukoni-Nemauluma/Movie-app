import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import {
  fetchTopRatedMovies,
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
} from "../../util/API"

const Movies = () => {
  const { category } = useParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let data
        switch (category) {
          case "top-rated":
            data = await fetchTopRatedMovies()
            break
          case "popular":
            data = await fetchPopularMovies()
            break
          case "now-playing":
            data = await fetchNowPlayingMovies()
            break
          case "upcoming":
            data = await fetchUpcomingMovies()
            break
          default:
            throw new Error("Invalid category")
        }
        setMovies(data.results)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [category])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="movies-page">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Movies</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movies/${category}/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Movies
