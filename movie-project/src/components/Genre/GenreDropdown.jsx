import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fetchGenres, fetchMoviesByGenre } from "../../util/API"

const GenreDropdown = () => {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState("Select Genre") // Default button text

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

  const handleGenreClick = async (genreId, genreName) => {
    try {
      const data = await fetchMoviesByGenre(genreId)
      console.log(data.results)
      setSelectedGenre(genreName) // Update the button text to the selected genre
    } catch (error) {
      setError(error.message)
    } finally {
      setIsOpen(false) // Close dropdown after click
    }
  }

  if (loading) return <div>Loading genres...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="relative inline-block text-left ml-2">
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-full px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-0 focus-visible:border-transparent transition-all duration-150"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedGenre} {/* Dynamic button text */}
          <svg
            className={`-mr-1 ml-2 h-5 w-5 transition-transform transform ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <ul
          className="origin-top-right absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {genres.map((genre) => (
            <li
              key={genre.id}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => handleGenreClick(genre.id, genre.name)} // Pass genre name for button text update
            >
              <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default GenreDropdown
