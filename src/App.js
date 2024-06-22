import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"

import Footer from "./components/Footer/Footer"
import SearchResults from "./components/SearchBar/SearchResults"
import Navbar from "./components/Navbar/Navbar"
import Genre from "./components/Genre/Genre"
import Actors from "./Pages/Actors/Actors"
import ActorsList from "./Pages/Actors/ActorsList"
import Movies from "./Pages/Movies/MovieDetails"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/genres/:genreId" element={<Genre />} />
        <Route path="/actors/:actorId" element={<Actors />} />
        <Route exact path="/actors" element={<ActorsList />} />
        <Route path="/movies/:category" element={<Movies />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
