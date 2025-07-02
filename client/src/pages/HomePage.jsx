import { Button } from '@/components/ui/button';
import React from 'react';
import hero from '../assets/hero.png';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-start pt-18 bg-[rgba(9,0,47,255)] text-white'>
      {/* hero section */}
      <div className='flex flex-col md:flex-row justify-center items-center w-full px-5 py-5'>

        <div className=' w-full md:w-[50%]'>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 ">Explore the Latest Tech & Web Trends</h1>
          <p className="text-lg md:text-xl opacity-80 mb-6 ">
            Stay ahead with in-depth articles, tutorials, and insights on web development, digital marketing, and tech innovations.
          </p>
          <div className="flex space-x-4">
            <Link to={"/about"}><Button className="border-white bg-white text-black px-6 py-3 text-lg hover:bg-indigo-800 hover:text-white">Learn More</Button></Link>
          </div>

        </div>

        <img className='w-full md:w-[40%]' src={hero} alt="Hero" />

      </div>
    </div>
  )
}

export default HomePage