import React from 'react';
import bg from '/src/assets/cardbg.png';
// @ts-ignore
import movieSummary from '../constants/movieSummary';

interface Movie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  summary: string;
}

interface MovieProps {
  selectedMovie: Movie;
  handleOverlayClick: () => void;
}

const MovieSummary: React.FC<MovieProps> = ({ selectedMovie, handleOverlayClick }) => {
  const { name, runtimeInMinutes, academyAwardNominations, academyAwardWins } = selectedMovie;

  const movieInfo = movieSummary.find((movie: typeof movieSummary[number]) => movie.movie === name);
  const movieSummaryText = movieInfo ? movieInfo.summary : '';
  const mainCharacters = movieInfo ? movieInfo.mainCharacters.join(', ') : '';

  return (
    <div onClick={handleOverlayClick} className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded-lg relative w-full max-w-md mx-2 text-center" style={{ backgroundImage: `url(${bg})` }}>
        <button onClick={handleOverlayClick} className="absolute top-0 right-0 mt-4 mr-4">X</button>
        <h2 className="text-lg text-gray-800 font-semibold font-serif italic mb-2 ">{name}</h2>
        <div className='border-t border-gray-800 text-sm text-center flex justify-center'>
          <div>
            <p className="text-gray-800 mb-1 font-serif italic">Runtime</p>
            <p className="text-gray-800 mb-1 font-serif italic">Oscar Nominations</p>
            <p className="text-gray-800 mb-1 font-serif italic">Academy Awards</p>
          </div>
          <div>
            <p className="text-gray-800 mb-1 font-serif italic">:{runtimeInMinutes}</p>
            <p className="text-gray-800 mb-1 font-serif italic">:{academyAwardNominations}</p>
            <p className="text-gray-800 mb-1 font-serif italic">:{academyAwardWins}</p>
          </div>
        </div>
        <div className='border-t border-gray-800 mt-2 '>
          <p className="text-gray-800 mb-1 font-serif italic ">Summary:</p>
          <p className="text-gray-800 mb-4 font-serif italic">{movieSummaryText}</p>
        </div>
        <div className='border-t border-gray-800 mt-2 '>
          <p className="text-gray-800 mb-1 font-serif italic ">Main characters:</p>
          <p className="text-gray-800 mb-4 font-serif italic">{mainCharacters}</p>
        </div>

      </div>
    </div>
  );
};

export default MovieSummary;