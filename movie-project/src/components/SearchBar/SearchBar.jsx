import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchMovies, searchActors } from "../../util/API"

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

      const movies = movieResults.results.map((movie) => ({
        ...movie,
        media_type: "movie",
      }))
      const actors = actorResults.results.map((actor) => ({
        ...actor,
        media_type: "person",
      }))
      const results = [...movies, ...actors]

      if (results.length === 0) {
        setError("No results found")
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
          placeholder="Search for movies or actors..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default SearchBar
