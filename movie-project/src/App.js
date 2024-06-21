import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Actors from './Pages/Actors';
import Movies from './Pages/Movies';
import SingleActor from './Pages/SingleActor';
import SingleMovie from './Pages/SingleMovie';

function App() {
  return (
    <Router>
      <Navbar />
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
