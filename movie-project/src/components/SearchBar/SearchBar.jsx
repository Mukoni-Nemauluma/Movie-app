import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchMovies, searchActors, searchTVShows } from "../../util/API"

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

      const results = [
        ...movieResults.results,
        ...actorResults.results,
        ...tvShowResults.results,
      ]

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
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded-md text-black w-full focus:outline-none"
          placeholder="Search for movies, TV shows, or actors..."
        />
        <button
          type="submit"
          className="bg-red-600 px-4 py-2 rounded-md text-white"
        >
          Search
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  )
}

export default SearchBar
