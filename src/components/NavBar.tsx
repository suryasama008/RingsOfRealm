import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ring.jpeg';

const Navbar: React.FC = () => {
  /* `const [isOpen, setIsOpen] = useState(false);` is declaring a state variable `isOpen` and a
  function to update it `setIsOpen`, using the `useState` hook from React. The initial value of
  `isOpen` is set to `false`. This state variable is used to toggle the visibility of the navigation
  links on smaller screens. */
  const [isOpen, setIsOpen] = useState(false);

 /**
  * The function toggles the value of a state variable called isOpen.
  */
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

 /* The `return` statement is returning a JSX element that represents the navigation bar of a website.
 It consists of a `nav` element with a `className` of `flex items-center justify-between px-4 py-3
 bg-black text-white`, which sets the background color to black and the text color to white, and
 contains three child elements: */
  return (
    <nav className='flex items-center justify-between px-4 py-3 bg-black text-white '>
      <div className='flex items-center'>
        <Link
          to='/'
          className='text-2xl font-semibold font-serif italic text-yellow-500 mr-2'
        >
          {' '}
          Realm of Rings
        </Link>
        <img src={logo} alt='logo' className='h-10 w-10' />
      </div>

      <div className='md:hidden'>
        <button
          type='button'
          onClick={handleToggle}
          className='block text-gray-300 hover:text-white focus:text-white focus:outline-none'
        >
          <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24'>
            {isOpen ? (
              <path
                fillRule='evenodd'
                d='M18.278 16.864a1 1 0 01-1.414 1.414l-8-8a1 1 0 011.414-1.414l8 8zm0-6a1 1 0 00-1.414-1.414l-8 8a1 1 0 001.414 1.414l8-8z'
                clipRule='evenodd'
              />
            ) : (
              <path
                fillRule='evenodd'
                d='M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z'
                clipRule='evenodd'
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`px-2 pt-2 pb-4 ${
          isOpen ? `block` : `hidden`
        } md:flex md:items-center md:space-x-1 bg-clip-text text-yellow-500`}
      >

        <Link
          to='/'
          onClick={handleToggle}
          className=' px-2 py-1 text-lg font-semibold rounded  '
        >
          Home
        </Link>
        <Link
          to='/movies'
          onClick={handleToggle}
          className='block px-2 py-1 text-lg font-semibold rounded   '
        >
          Movies
        </Link>
        <Link
          to='/characters'
          onClick={handleToggle}
          className='block px-2 py-1 text-lg font-semibold rounded  '
        >
          Characters
        </Link>
        <Link
          to='/quotes'
          onClick={handleToggle}
          className='block px-2 py-1 text-lg font-semibold rounded '
        >
          Quotes
        </Link>
      </div>
    </nav>
  )
};

export default Navbar;
