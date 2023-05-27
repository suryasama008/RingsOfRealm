import React, { useEffect, useState } from 'react';
import bg from '/src/assets/cardbg.png'

/* The `interface Quote` is defining the structure of an object that represents a quote. It specifies
that a quote object should have four properties: `_id`, `dialog`, `movie`, and `character`, all of
which are of type string. This interface is used to provide type information for the `quotes` state
variable in the `Quotes` component. */
interface Quote {
  _id: string;
  dialog: string;
  movie: string;
  character: string;
}

const Quotes: React.FC = () => {
 /* These lines of code are defining state variables using the `useState` hook. */
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageGroup, setPageGroup] = useState<number[]>([]);
  const limit = 12;

/* This code block is using the `useEffect` hook to fetch data from an API endpoint that returns a list
of quotes. The `fetch` function is making a GET request to the API endpoint with query parameters
for sorting, limiting, and pagination. The response is then converted to JSON format and the
`setQuotes` and `setTotalPages` functions are called to update the state variables with the list of
quotes and the total number of pages. The `useEffect` hook is triggered whenever the `page` state
variable changes, which allows for pagination of the quotes list. */
  useEffect(() => {
    fetch(`https://the-one-api.dev/v2/quote?sort=character:asc&limit=${limit}&page=${page}`, {
      headers: {
        Authorization: 'Bearer qN8OIozRJGDN4VKXtmoS',
      },
    })
      .then(response => response.json())
      .then(data => {
        setQuotes(data.docs);
        setTotalPages(Math.ceil(data.total / limit));
      });
  }, [page]);

/**
 * This function updates the page group based on the current page and total number of pages, and
 * handles page changes.
 * @param {number} pageNum - pageNum is a number representing the page number that the user wants to
 * navigate to. It is passed as an argument to the handlePageChange function.
 */
  useEffect(() => {
    const start = page - 2 > 0 ? page - 2 : 1;
    const end = start + 4 <= totalPages ? start + 4 : totalPages;
    setPageGroup(Array.from({ length: end - start + 1 }, (_, i) => start + i));
  }, [page, totalPages]);

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
  }

 /* The `return` statement is rendering the JSX code that defines the UI for the `Quotes` component. It
 includes a container with a list of quotes, pagination buttons, and some styling. The `quotes`
 state variable is mapped over to display each quote in a card-like format with a background image
 and the quote text. The pagination buttons are disabled or enabled based on the current page and
 total number of pages, and clicking on them triggers the `handlePageChange` function to update the
 `page` state variable and fetch a new set of quotes from the API. */
  return (
    <div className="container mx-auto px-4 overflow-auto h-5/6">
      <div className="flex justify-between my-4">
        <p className='text-white'> <span className='text-xl font-serif font-bold '>Quotes List </span>(Page {page})</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {quotes?.map((quote) => (
          <div key={quote._id} className="relative bg-white shadow-xl p-4 rounded-xl h-36 transform transition-all duration-300 ease-in-out hover:scale-90" style={{backgroundImage : `url(${bg})`}}>
          <p className="text-gray-800 mb-1 font-serif italic">Quote: <span className='underline'>{quote.dialog}</span></p>
        </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(1)}
          className="mx-1 px-3 py-2 border rounded text-red-800"
        >
          {'<<'}
        </button>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="mx-1 px-3 py-2 border rounded text-red-800"
        >
          {'<'}
        </button>
        {pageGroup.map(num => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`mx-1 px-3 py-2 border rounded ${page === num ? 'bg-red-800 text-white' : 'text-red-800'}`}
          >
            {num}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="mx-1 px-3 py-2 border rounded text-red-800"
        >
          {'>'}
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="mx-1 px-3 py-2 border rounded text-red-800"
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Quotes;
