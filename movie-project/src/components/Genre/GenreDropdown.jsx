import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchGenres, fetchMoviesByGenre } from "../../util/API"

const GenreDropdown = () => {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGenresData = async () => {
      try {
        const data = await fetchGenres()
        setGenres(data.genres)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchGenresData()
  }, [])

  const handleGenreClick = async (genreId) => {
    try {
      const data = await fetchMoviesByGenre(genreId)
      console.log(data.results)
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) return <div>Loading genres...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <ul className="dropdown">
      {genres.map((genre) => (
        <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>
          <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default GenreDropdown
