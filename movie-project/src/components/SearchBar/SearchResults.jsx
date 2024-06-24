import React from "react";
import { Link, useLocation } from "react-router-dom";
import './SearchResults.css';
const SearchResults = () => {
  const { state } = useLocation();

  if (
    !state ||
    !state.props ||
    !state.props.results ||
    state.props.results.length === 0
  ) {
    return <div>No results found.</div>;
  }

  const { results } = state.props;

  return (
    <div className="search-results">
      <h1>Search Results</h1>
      <div className="results-list">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <Link
              to={`/${
                result.media_type === "movie"
                  ? "movie"
                  : result.media_type === "tv"
                  ? "tv-show"
                  : "actors"
              }/${result.id}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200/${
                  result.poster_path || result.profile_path
                }`}
                alt={result.title || result.name}
              />
              <p>{result.title || result.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
