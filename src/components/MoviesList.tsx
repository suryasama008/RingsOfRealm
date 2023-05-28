import React, { useEffect, useState } from 'react';
import bg from '/src/assets/cardbg.png'
import MovieSummary from './MovieSummary';
import { Link } from 'react-router-dom';
import person from '/src/assets/person1.png'
interface Movie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
  summary: string;
}

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleOverlayClick = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    fetch('https://the-one-api.dev/v2/movie', {
      headers: {
        Authorization: 'Bearer qN8OIozRJGDN4VKXtmoS',
      },
    })
      .then(response => response.json())
      .then(data => setMovies(data.docs));
  }, []);

  return (
    <div className="container mx-auto px-4 overflow-auto h-5/6">
      <h1 className="text-2xl font-bold my-4 text-white font-serif italic">Movies List</h1>
      <div className='md:flex'>
        <div className='md:mt-32'>
          <img src={person} alt="" className='h-80 mr-20'/>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map(movie => (
          <div 
              key={movie._id} 
              className="bg-white shadow-md p-4 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-105 bg-center bg-no-repeat bg-cover" 
              style={{backgroundImage: `url(${bg})`}}
              onClick={() => handleMovieClick(movie)}
            >
            <h2 className="text-lg font-semibold mb-2 text-black">{movie.name}</h2>
            <div className='flex'>
            <div>
            <p className="text-gray-800 mb-1 font-serif italic">Runtime - {movie.runtimeInMinutes} mins</p>
            <p className="text-gray-800 mb-1 font-serif italic">Nominations - {movie.academyAwardNominations}</p>
            <p className="text-gray-800 mb-1 font-serif italic">Academy Awards - {movie.academyAwardWins} </p>
            </div>
            
             </div>
          </div>
        ))}
      </div>
      </div>

      {selectedMovie && (
        <MovieSummary handleOverlayClick={handleOverlayClick} selectedMovie={selectedMovie} />
      )}
      <Link
      to = '/characters'
      className='bg-black py-3 px-3 float-right mt-6 rounded-2xl font-serif italic '
      style={{backgroundImage: `url(${bg})`}}>
        Know about the Characters
      </Link>
    </div>
  );
};

export default MoviesList;
