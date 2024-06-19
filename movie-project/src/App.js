import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Actors from './Pages/Actors';
import Movies from './Pages/Movies';
import SingleActor from './Pages/SingleActor';
import SingleMovie from './Pages/SingleMovie';
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/actors/:id" element={<SingleActor />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<SingleMovie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
