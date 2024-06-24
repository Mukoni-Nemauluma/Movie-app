import React from "react"
import { Link, useLocation } from "react-router-dom"
import "../../SearchResults.css"

const SearchResults = () => {
  const { state } = useLocation()
  const { props } = state || {}
  const { results = [], error } = props || {}

  return (
    <div className="search-results">
      <h1>Search Results</h1>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="movies-list-style">
          {results.map((result) => (
            <div key={result.id} className="movie-card-style">
              <Link
                to={`/${result.media_type === "movie" ? "movie" : "actors"}/${
                  result.id
                }`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200/${
                    result.poster_path || result.profile_path
                  }`}
                  alt={result.title || result.name}
                />
                <div className="movie-title-style">
                  {result.title || result.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults
