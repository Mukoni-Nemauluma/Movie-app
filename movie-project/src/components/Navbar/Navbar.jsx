import React, { useState } from "react"
import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import GenreDropdown from "../Genre/GenreDropdown"

const Navbar = () => {
  const [showGenres, setShowGenres] = useState(false)

  const toggleGenres = () => {
    setShowGenres((prevShowGenres) => !prevShowGenres)
  }

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="logo">
        <span className="text-2xl font-bold">MovieReel</span>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <span onClick={toggleGenres} className="cursor-pointer">
            Genres
          </span>
          {showGenres && <GenreDropdown />}
        </li>
        <li>
          <Link to="/actors">Actors</Link>
        </li>
        <li>
          <SearchBar />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
