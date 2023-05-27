import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '/src/components/Navbar.tsx'
import MoviesList from '/src/components/MoviesList.tsx'
import CharactersList from '/src/components/CharactersList.tsx'
import Quotes from '/src/components/Quotes.tsx'
import Home from '/src/components/Home.tsx'
import bg from '/src/assets/wallpaper.jpeg'


const App: React.FC = () => {
/* This is the main component of a React application that uses React Router to handle different routes.
It renders a `div` element with a background image set using the `bg` variable. Inside the `div`, it
renders a `Router` component from React Router, which handles the routing logic for the application.
The `Navbar` component is also rendered inside the `div`. The `Routes` component is used to define
the different routes for the application, and each `Route` component specifies a path and the
component to render when that path is accessed. The `element` prop is used to specify the component
to render for each route. Finally, the entire component is exported as the default export of the
module. */
  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="bg-cover bg-center h-screen">
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
  );
};

export default App;