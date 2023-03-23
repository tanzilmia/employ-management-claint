import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-10 sticky">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center justify-center md:justify-start">
              <h2 className="text-3xl font-bold tracking-tight">Employ Management</h2>
            </div>
            <div className="mt-8 md:mt-0 md:flex md:items-center">
              <ul className="flex flex-col md:flex-row md:gap-x-8">
                <li className="text-lg">
                  <Link to="/" className="hover:text-gray-400">
                    Home
                  </Link>
                </li>
                <li className="text-lg">
                  <Link to="/" className="hover:text-gray-400">
                  Blogs
                  </Link>
                </li>
                <li className="text-lg">
                  <Link to="/" className="hover:text-gray-400">
                    Resources
                  </Link>
                </li>
               
                
              </ul>
              
            </div>
          </div>
          <div className='w-8/12 mx-auto'>
          <p className="mt-8 text-center text-[#cacaca96]">
            Lörem ipsum od ohet dilogi. Bell trabel, samuligt, ohöbel utom diska. Jinesade bel när feras redorade i belogi.
            FAR paratyp i muvåning, och pesask vyfisat. Viktiga poddradio har un mad och inde.
          </p>
          <br />
          <p className='text-center'>Develop By - Tanzil </p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;