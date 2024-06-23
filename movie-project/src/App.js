import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./Pages/Home/Home";
import Footer from "./components/Footer/Footer";
import SearchResults from "./components/SearchBar/SearchResults";
import Navbar from "./components/Navbar/Navbar";
import Genre from "./components/Genre/Genre";
import SingleActor from "./Pages/Actors/SingleActor";
import Actors from "./Pages/Actors/Actors";
import Movies from "./Pages/Movies/Movies";
import SingleMovie from "./Pages/Movies/SingleMovie";
import TVShows from "./Pages/TVShows/TvShows";
import SingleTVShow from "./Pages/TVShows/SingleTVShow";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/genres/:genreId" element={<Genre />} />
        <Route path="/actors/:actorId" element={<SingleActor />} />
        <Route exact path="/actors" element={<Actors />} />
        <Route path="/movies/:category" element={<Movies />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/tv-show/:id" element={<SingleTVShow />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
