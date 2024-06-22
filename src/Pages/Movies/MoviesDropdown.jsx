import React from "react"
import { Link } from "react-router-dom"

const MoviesDropdown = () => {
  return (
    <ul className="dropdown">
      <li>
        <Link to="/movies/top-rated">Top Rated</Link>
      </li>
      <li>
        <Link to="/movies/popular">Popular</Link>
      </li>
      <li>
        <Link to="/movies/now-playing">Now Playing</Link>
      </li>
      <li>
        <Link to="/movies/upcoming">Upcoming</Link>
      </li>
    </ul>
  )
}

export default MoviesDropdown
