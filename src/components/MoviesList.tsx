import React, { useEffect, useState } from 'react';
import movie_card from '/src/assets/movie_card.jpeg'
import bg from '/src/assets/cardbg.png'

/* The `interface Movie` is defining the structure of an object that represents a movie. It specifies
the properties that a movie object should have, including `_id`, `name`, `runtimeInMinutes`,
`budgetInMillions`, `boxOfficeRevenueInMillions`, `academyAwardNominations`, `academyAwardWins`, and
`rottenTomatoesScore`, along with their respective data types. This interface is used to ensure that
the data fetched from the API conforms to a specific structure and to provide type checking during
development. */

interface Movie {
  _id: string;
  name: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

/* `useEffect` is a hook in React that allows you to perform side effects in function components. In
this case, it is used to fetch data from an API endpoint using the `fetch` function. The API
endpoint is `https://the-one-api.dev/v2/movie`, and it requires an authorization token to access it.
The response from the API is then converted to JSON format using the `response.json()` method, and
the resulting data is used to update the `movies` state using the `setMovies` function. The `[]` as
the second argument to `useEffect` means that the effect will only run once, when the component
mounts. */

  useEffect(() => {
    fetch('https://the-one-api.dev/v2/movie', {
      headers: {
        Authorization: 'Bearer qN8OIozRJGDN4VKXtmoS',
      },
    })
      .then(response => response.json())
      .then(data => setMovies(data.docs));
  }, []);

 /* The `return` statement is returning a JSX element that represents a list of movies. The list is
 created using the `map` method on the `movies` array, which creates a new array of JSX elements
 based on the data in the `movies` array. Each movie is represented by a `div` element with a
 background image, and the movie's name, runtime, budget, box office revenue, Oscar nominations,
 Academy Awards, and Rotten Tomatoes score are displayed in the `div`. The `className` and `style`
 attributes are used to apply CSS styles to the elements. The resulting JSX element is then rendered
 to the DOM. */
  return (
   /* This is defining the layout and styling of the MoviesList component. */
    <div className="container mx-auto px-4 overflow-auto h-5/6">
      <h1 className="text-2xl font-bold my-4 text-white font-serif italic">Movies List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map(movie => (
          /* This code is creating a JSX element that represents a movie card. The `div` element has a
          background image set using the `style` attribute, and it contains a `h2` element with the
          movie's name and a `div` element with the movie's details displayed in a flexbox layout.
          The `key` attribute is used to uniquely identify each movie card in the list, and the
          `className` attribute is used to apply CSS styles to the element. The `transform`,
          `transition-all`, `duration-300`, `ease-in-out`, and `hover:scale-90` classes are used to
          apply a scaling animation to the movie card when it is hovered over. */
          <div key={movie._id} className="bg-white shadow-md p-4 rounded-lg transform transition-all duration-300 ease-in-out hover:scale-90" style = {{backgroundImage : `url(${bg})`}} >
            <h2 className="text-lg font-semibold mb-2">{movie.name}</h2>
            <div className='flex space-x-4'>
            <div>
            <p className="text-gray-600 mb-1 font-serif italic">Runtime </p>
            <p className="text-gray-600 mb-1 font-serif italic">Budget </p>
            <p className="text-gray-600 mb-1 font-serif italic">BO Revenue</p>
            <p className="text-gray-600 mb-1 font-serif italic">Oscar Nominations</p>
            <p className="text-gray-600 mb-1 font-serif italic">Academy Awards </p>
            <p className="text-gray-600 mb-1 font-serif italic">Rotten Tomatoes </p>
            </div>
            <div>
            <p className="text-gray-600 mb-1 font-serif italic">:  {movie.runtimeInMinutes} minutes</p>
            <p className="text-gray-600 mb-1 font-serif italic">:  {movie.budgetInMillions} million</p>
            <p className="text-gray-600 mb-1 font-serif italic">:  {movie.boxOfficeRevenueInMillions} million</p>
            <p className="text-gray-600 mb-1 font-serif italic">:  {movie.academyAwardNominations}</p>
            <p className="text-gray-600 mb-1 font-serif italic">:  {movie.academyAwardWins}</p>
            <p className="text-gray-600 mb-1 font-serif italic">:  {movie.rottenTomatoesScore}</p>
            </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
