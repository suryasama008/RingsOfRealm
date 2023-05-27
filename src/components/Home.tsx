import React from 'react';
import { Link } from 'react-router-dom';
  



const Home: React.FC = () => {
    
   /* The `return` statement is returning a JSX element that contains a `div` with a class name of
   `flex justify-center my-[20%]`, which centers its child elements horizontally and vertically on
   the page. Inside this `div`, there is another `div` with a class name of `text-center`, which
   centers its child elements horizontally.  which displays the text "Explore" and has a link to the `/movies` page. The button
   also has some styling properties that change when the user hovers over it. */
    return(
        <div className='flex justify-center absolute inset-x-0 top-1/2 -translate-y-1/2 text-center '>
            <div className="text-center">
                <h1 className="text-6xl font-serif italic text-yellow-500 ">Welcome to Realm of Rings</h1>
                <p className='italic text-yellow-500 my-3'>“Go where you must go, and hope!”— Gandalf.</p>
         <Link
          to='/movies'
          className='text-2xl font-serif italic text-yellow-500 border border-lime-100 bg-red-600 px-3 py-1 my-4 rounded-2xl
          transition ease-in-out delay-150  hover:scale-110 hover:bg-indigo-500 duration-300
          '
        >
          Begin Journey
        </Link>
                
                </div>
        </div>
    )
}

export default Home;