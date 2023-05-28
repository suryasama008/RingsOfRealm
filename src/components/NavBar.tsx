import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ring.jpeg';
import music from '../assets/music.mp3';

import '../App.css';
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [audio, setAudio] = useState(new Audio());

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      audio.loop = true;
      audio.play();
    } else {
      audio.pause();
    }
  };

  useEffect(() => {
    setTimeout(() => {
    const audioFile = new Audio(music);
    setAudio(audioFile);
    audioFile.addEventListener('canplaythrough', () => {
      audioFile.play();
    });
  }, 2000);
  }, []);

  return (
    <nav className='flex items-center justify-between px-4 py-3 bg-transperant text-white cursor-custom'>
      <div className='flex items-center'>
        <Link
          to='/'
          className='text-2xl font-semibold font-serif italic text-[#f4b953eb] mr-2'
        >
          Realm of Rings
        </Link>
        <img src={logo} alt='logo' className='h-10 w-10' />
      </div>

      <div className='md:hidden'>
        <button
          type='button'
          onClick={toggleMenu}
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
        } md:flex md:items-center md:space-x-1 bg-clip-text text-[#f4b953eb]`}
      >
        <Link
          to='/'
          onClick={toggleMenu}
          className='px-2 py-1 text-lg font-semibold rounded'
        >
          Home
        </Link>
        <Link
          to='/movies'
          onClick={toggleMenu}
          className='block px-2 py-1 text-lg font-semibold rounded'
        >
          Movies
        </Link>
        <Link
          to='/characters'
          onClick={toggleMenu}
          className='block px-2 py-1 text-lg font-semibold rounded'
        >
          Characters
        </Link>
        <Link
          to='/quotes'
          onClick={toggleMenu}
          className='block px-2 py-1 text-lg font-semibold rounded'
        >
          Quotes
        </Link>
        <button
          onClick={toggleMute}
          className='block px-2 py-1 text-lg font-semibold rounded'
        >
          <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24'>
            {!isMuted ? (
              <path
                fillRule='evenodd'
                d='M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z'
                clipRule='evenodd'
              />
            ) : (
              <path
                fillRule='evenodd'
                d='M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z'
                clipRule='evenodd'
              />
            )}
          </svg>
          
        </button>
      </div>
    </nav>
  );
};

export default Navbar;