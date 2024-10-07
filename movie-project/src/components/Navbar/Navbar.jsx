import React, { useState } from "react"
import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import GenreDropdown from "../Genre/GenreDropdown"
import { FaBars, FaTimes } from "react-icons/fa"

const Navbar = () => {
  const [showGenres, setShowGenres] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleGenres = () => {
    setShowGenres((prevShowGenres) => !prevShowGenres)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="logo">
          <span className="text-2xl font-bold">MovieReel</span>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden cursor-pointer" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </div>

        <ul className="hidden lg:flex space-x-4 items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="relative">
            <span onClick={toggleGenres} className="cursor-pointer">
              Genres
            </span>
            {showGenres && (
              <div className="absolute top-full mt-2 z-10">
                <GenreDropdown />
              </div>
            )}
          </li>
          <li>
            <Link to="/actors">Actors</Link>
          </li>
          <li className="ml-4">
            <SearchBar />
          </li>
        </ul>
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <span className="text-2xl font-bold">MovieReel</span>
          <FaTimes
            className="text-2xl cursor-pointer mt-4"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="flex flex-col space-y-4 mt-8 px-4">
          <li>
            <Link to="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li>
            <span
              onClick={() => {
                toggleGenres()
                toggleSidebar()
              }}
              className="cursor-pointer"
            >
              Genres
            </span>
            {showGenres && <GenreDropdown />}
          </li>
          <li>
            <Link to="/actors" onClick={toggleSidebar}>
              Actors
            </Link>
          </li>
          <li className="mt-4">
            <SearchBar />{" "}
          </li>
        </ul>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  )
}

export default Navbar
