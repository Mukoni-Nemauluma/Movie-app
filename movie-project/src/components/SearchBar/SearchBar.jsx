import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchMovies, searchActors, searchTVShows } from "../../util/API"
import "../../SearchResults.css"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const movieResults = await searchMovies(query)
      const actorResults = await searchActors(query)
      const tvShowResults = await searchTVShows(query)

      const movies = movieResults.results.map((movie) => ({
        ...movie,
        media_type: "movie",
      }))
      const actors = actorResults.results.map((actor) => ({
        ...actor,
        media_type: "person",
      }))
      const tvShows = tvShowResults.results.map((tvShow) => ({
        ...tvShow,
        media_type: "tv",
      }))

      const results = [...movies, ...actors, ...tvShows]

      if (results.length === 0) {
        navigate("/no-results")
      } else {
        navigate("/search-results", { state: { props: { results } } })
      }
    } catch (error) {
      setError("Error searching. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies, TV shows, or actors..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default SearchBar
