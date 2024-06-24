import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchMoviesByGenre } from "../../util/API"
import "../../Styles.css"
import Design from "../Design/Design"

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
        setGenreName(mapGenreIdToName(genreId))
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [genreId])

  const mapGenreIdToName = (genreId) => {
    switch (genreId) {
      case "28":
        return "Action"
      case "12":
        return "Adventure"
      case "16":
        return "Animation"
      case "35":
        return "Comedy"
      case "80":
        return "Crime"
      case "99":
        return "Documentary"
      case "18":
        return "Drama"
      case "10751":
        return "Family"
      case "14":
        return "Fantasy"
      case "36":
        return "History"
      case "27":
        return "Horror"
      case "10402":
        return "Music"
      case "9648":
        return "Mystery"
      case "10749":
        return "Romance"
      case "878":
        return "Science Fiction"
      case "10770":
        return "TV Movie"
      case "53":
        return "Thriller"
      case "10752":
        return "War"
      case "37":
        return "Western"
      default:
        return "Genre Movies"
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="genres-page">
      <section className="design-section">
        <Design />
      </section>

      <section className="movies-section-style">
        <h1 className="genre-title">{genreName}</h1>
        <div className="movies-list-style">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card-style">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Genre
