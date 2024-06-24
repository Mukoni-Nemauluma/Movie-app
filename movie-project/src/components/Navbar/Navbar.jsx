import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import GenreDropdown from "../Genre/GenreDropdown"
import "../../App.css"

const Navbar = () => {
  const [showMovies, setShowMovies] = useState(false)
  const [showGenres, setShowGenres] = useState(false)

  const navbarRef = useRef(null)

  const toggleMovies = () => {
    setShowMovies((prevShowMovies) => !prevShowMovies)
    setShowGenres(false)
  }

  const toggleGenres = () => {
    setShowGenres((prevShowGenres) => !prevShowGenres)
    setShowMovies(false)
  }

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setShowMovies(false)
      setShowGenres(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleGenreClick = () => {
    setShowGenres(false) // Close Genre dropdown when a genre is clicked
  }

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="logo">
        <span className="logo-text">MovieReel</span>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <span className="navbar-link" onClick={toggleGenres}>
            Genres
          </span>
          {showGenres && <GenreDropdown onClick={handleGenreClick} />}
        </li>
        <li className="navbar-item">
          <Link to="/actors" className="navbar-link">
            Actors
          </Link>
        </li>
        <li className="navbar-item">
          <span className="navbar-link" onClick={toggleMovies}>
            Movies
          </span>
          {showMovies && (
            <ul className="dropdown">
              <li>
                <Link to="/movies/top-rated" className="dropdown-link">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link to="/movies/popular" className="dropdown-link">
                  Popular
                </Link>
              </li>
              <li>
                <Link to="/movies/now-playing" className="dropdown-link">
                  Now Playing
                </Link>
              </li>
              <li>
                <Link to="/movies/upcoming" className="dropdown-link">
                  Upcoming
                </Link>
              </li>
              <li>
                <Link to="/movies/latest" className="dropdown-link">
                  Latest
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="navbar-item search-bar-container">
          <SearchBar />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
