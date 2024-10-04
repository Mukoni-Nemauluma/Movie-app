import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import GenreDropdown from "../Genre/GenreDropdown";

const Navbar = () => {
  const [showMovies, setShowMovies] = useState(false);
  const [showGenres, setShowGenres] = useState(false);

  const toggleMovies = () => {
    setShowMovies((prevShowMovies) => !prevShowMovies);
  };

  const toggleGenres = () => {
    setShowGenres((prevShowGenres) => !prevShowGenres);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-text">MovieReel</span>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <span onClick={toggleGenres}>Genres</span>
          {showGenres && <GenreDropdown />}
        </li>
        <li>
          <Link to="/actors">Actors</Link>
        </li>
        <li>
          <span onClick={toggleMovies}>Movies</span>
          {showMovies && (
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
              <li>
                <Link to="/movies/latest">Latest</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/tv-shows">TV Shows</Link>
        </li>
        <li>
          <SearchBar />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
