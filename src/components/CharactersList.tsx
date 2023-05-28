import React, { useEffect, useState, ChangeEvent } from 'react';
import bg from '/src/assets/cardbg.png'
import person from '/src/assets/person.png'

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
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageGroup, setPageGroup] = useState<number[]>([]);
  const [limit, setLimit] = useState(8);
  const [isGridView, setIsGridView] = useState(true);


  const handleToggle = () => {
    setIsGridView(!isGridView);
  }

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
  }, [page, limit]);

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
    setPage(1);
  }

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

  return (
    <div className="container mx-auto px-4 overflow-auto h-5/6">
    <div className="flex justify-between my-4">
      <p className='text-white'> <span className='text-xl font-serif font-bold '>Characters List </span>(Page {page})</p>
      <div>
        <label className='text-md text-white'>Character Count: </label>
          <select onChange={handleLimitChange} value={limit} className="mr-4 px-4 bg-transparent text-white py-1 rounded-2xl border-2 border-yellow-500 shadow-xl">
            <option value="8">8</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <button onClick={handleToggle} className='bg-transperant hover:bg-yellow-700 myt-2 text-white font-bold py-2 px-4 rounded'>
            {isGridView ? <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div> : 
            <div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
            </svg>
            </div>
            }
          </button>
        </div>
    </div>
    <div className="md:flex justify-center">
    {isGridView ? 
    <div className=
                  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8" >
      {characters?.map(character => (
        <div key={character._id} className="bg-white shadow-md p-4 rounded-lg transform transition-all duration-300 ease-in-out 
        hover:scale-105 bg-center bg-no-repeat bg-cover my-4" 
        style={{backgroundImage: `url(${bg})`}}>
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
          :
          <table className="table-auto w-full border-collapse border bg-cover" style={{backgroundImage: `url(${bg})`}}>
  <thead>
    <tr>
      <th className="border px-4 py-2 border-gray-800">Name</th>
      <th className="border px-4 py-2 border-gray-800">Gender</th>
      <th className="border px-4 py-2 border-gray-800">Race</th>
      <th className="border px-4 py-2 border-gray-800">Birth</th>
      <th className="border px-4 py-2 border-gray-800">Death</th>
      <th className="border px-4 py-2 border-gray-800">Wiki Link</th>
    </tr>
  </thead>
  <tbody>
    {characters?.map(character => (
      <tr key={character._id}>
        <td className="border px-4 border-gray-800">{character.name}</td>
        <td className="border px-4 border-gray-800">{character.gender}</td>
        <td className="border px-4 border-gray-800">{character.race}</td>
        <td className="border px-4 border-gray-800">{character.birth}</td>
        <td className="border px-4 border-gray-800">{character.death}</td>
        <td className="border px-4 border-gray-800">
          <a href={character.wikiUrl} target="_blank" rel="noopener noreferrer">
            {character.wikiUrl}
          </a>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        }
          <div className='grid-cols1'>
            <img src={person} />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(1)}
              className="mx-1 px-3 py-2 border rounded text-[#f4b953eb]"
            >
              {'<<'}
            </button>
           
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className="mx-1 px-3 py-2 border rounded text-[#f4b953eb]"
            >
              {'<'}
            </button>
            {pageGroup.map(num => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`mx-1 px-3 py-2 border rounded ${page === num ? 'bg-[#f4b953eb] text-white' : 'text-[#f4b953eb]'}`}
              >
                {num}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="mx-1 px-3 py-2 border rounded text-[#f4b953eb]"
            >
              {'>'}
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(totalPages)}
              className="mx-1 px-3 py-2 border rounded text-[#f4b953eb]"
            >
              {'>>'}
            </button>
          </div>
        </div>
      );
};

export default CharactersList;
