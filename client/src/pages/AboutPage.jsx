import React from 'react';
import aboutImg from '../assets/About-blog.avif';

function AboutPage() {
  return (
    <div className='pt-16 flex justify-center items-center bg-[rgba(9,0,47,255)] text-white w-full'>
      <div className='flex flex-col justify-start items-center gap-10 w-full py-10'>

        <div className='w-full text-center '>
          <h1 className="md:text-5xl text-4xl font-extrabold mb-4">
            Let’s Talk Ideas
          </h1>
          <p className="text-lg">
            Where creativity meets clarity—and your voice finds its echo.
          </p>

        </div>

        <div className='flex flex-col lg:flex-row justify-center items-center gap-8 w-full px-4 lg:px-0'>

          <img className='w-full lg:w-[35%] rounded-2xl shadow-md' src={aboutImg} alt="About" />

          <div className='w-full lg:w-[40%]'>
            <p className="text-lg mb-4 text-start">
              Welcome to our Blog App — a platform designed for readers, writers, and thought leaders
              to connect through valuable content and meaningful discussions. Whether you’re here to share
              expertise or gain insights, this space is crafted to support your journey.
            </p>

            <p className="text-lg mb-4 text-start">
              Our mission is to empower individuals and teams to communicate effectively.
              With intuitive publishing tools and a focus on quality engagement,
              we aim to foster a dynamic and professional blogging environment.
            </p>

            <p className="text-lg text-start">
              Thank you for being part of a growing network of thinkers, creators, and professionals.
            </p>

          </div>

        </div>

        <div className='w-full'>
          <blockquote className="text-2xl italic text-gray-500 text-center">
            "Your words may be small, but your story is powerful."
          </blockquote>
        </div>

      </div>
    </div>
  )
}

export default AboutPage