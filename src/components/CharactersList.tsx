import React, { useEffect, useState } from 'react';
import bg from '/src/assets/cardbg.png'

/* The `interface Character` is defining the shape of an object that represents a character in the
application. It specifies the properties that a character object should have, including `_id`,
`name`, `race`, `gender`, `birth`, `spouse`, `death`, `realm`, `hair`, and `wikiUrl`, along with
their respective data types. This interface is used to ensure that the data fetched from the API is
in the expected format and to provide type checking and autocompletion for the properties of a
character object throughout the application. */
interface Character {
  _id: string;
  name: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  wikiUrl: string;
}

const CharactersList: React.FC = () => {
 /* These lines of code are defining state variables using the `useState` hook. */
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageGroup, setPageGroup] = useState<number[]>([]);
  const limit = 8; 

 /* This is a React `useEffect` hook that is fetching data from an API endpoint using the `fetch`
 function. The endpoint URL includes a `page` parameter that is set to the current value of the
 `page` state variable and a `limit` parameter that is set to a constant value of 8. The
 `Authorization` header is also included in the request to authenticate the API call. */
  useEffect(() => {
    fetch(`https://the-one-api.dev/v2/character?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: 'Bearer qN8OIozRJGDN4VKXtmoS',
      },
    })
      .then(response => response.json())
      .then(data => {
        setCharacters(data.docs);
        setTotalPages(Math.ceil(data.total / limit)); 
      });
  }, [page]);

 /* The `useEffect` hook is used to update the `pageGroup` state variable whenever the `page` or
 `totalPages` state variables change. It calculates the start and end page numbers for the current
 page group based on the current `page` and `totalPages` values, and then sets the `pageGroup` state
 variable to an array of page numbers within that range. */
  useEffect(() => {
    const start = page - 2 > 0 ? page - 2 : 1;
    const end = start + 4 <= totalPages ? start + 4 : totalPages;
    setPageGroup(Array.from({ length: end - start + 1 }, (_, i) => start + i));
  }, [page, totalPages]);

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
  }

  /* The `return` statement is rendering the UI for the `CharactersList` component. It includes a
  container with a header displaying the current page number, a grid of character cards with their
  information, and pagination buttons to navigate through the pages of characters. The `map`
  function is used to iterate over the `characters` array and render a card for each character. The
  `handlePageChange` function is called when a pagination button is clicked, which updates the
  `page` state variable and triggers a re-render of the component with the new page of characters. */
  return (
        <div className="container mx-auto px-4 overflow-auto h-5/6">
          <div className="flex justify-between my-4">
            <p className='text-white'> <span className='text-xl font-serif font-bold '>Characters List </span>(Page {page})</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {characters?.map(character => (
              <div key={character._id} className="relative bg-white shadow-xl p-4 rounded-xl transform transition-all duration-300 ease-in-out hover:scale-90" style={{backgroundImage : `url(${bg})`, height: '250px'}}>
              <h2 className="text-2xl font-semibold mb-2 font-serif italic ">{character.name}</h2>
              <p className="text-gray-800 mb-1 font-serif italic">Gender: {character.gender}</p>
              <p className="text-gray-800 mb-1 font-serif italic">Race: {character.race}</p>
              <p className="text-gray-800 mb-1 font-serif italic">Birth: {character.birth}</p>
              <p className="text-gray-800 mb-1 font-serif italic">Death: {character.death}</p>
              <a
                href={character.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 font-bold hover:underline"
              >
                Wiki Link
              </a>
            </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(1)}
              className="mx-1 px-3 py-2 border rounded text-red-600"
            >
              {'<<'}
            </button>
           
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className="mx-1 px-3 py-2 border rounded text-red-600"
            >
              {'<'}
            </button>
            {pageGroup.map(num => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`mx-1 px-3 py-2 border rounded ${page === num ? 'bg-red-600 text-white' : 'text-red-600'}`}
              >
                {num}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="mx-1 px-3 py-2 border rounded text-red-600"
            >
              {'>'}
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(totalPages)}
              className="mx-1 px-3 py-2 border rounded text-red-600"
            >
              {'>>'}
            </button>
          </div>
        </div>
      );
};

export default CharactersList;
