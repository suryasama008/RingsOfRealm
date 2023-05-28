import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import MoviesList from './components/MoviesList.tsx'
import Navbar from './components/NavBar.tsx'
import CharactersList from './components/CharactersList.tsx'
import Quotes from './components/Quotes.tsx'
import Home from './components/Home.tsx'
import bg from '/src/assets/wallpaper.jpeg'


const App: React.FC = () => {

  return (
    <div className='App'>
    <div style={{ backgroundImage: `url(${bg})` }} className="bg-cover bg-center h-screen bg-black">
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<MoviesList />} />
      <Route path="/characters" element={<CharactersList />} />
      <Route path="/quotes" element={<Quotes />} />
    </Routes>
  </Router>
  </div>
  </div>
  );
};

export default App;