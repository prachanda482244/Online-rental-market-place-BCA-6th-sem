import React from 'react'

const About = () => {
  const concepts = [
    "Make the routes in express",
    "Make the controller in express",
    "Working with mongoose schemas",
    "Advance Mongodb operation",
    "Redux Toolkit for better state management",
    "Working with fire base",
    "Image upload functionality in firebase",
    "Connect frontend with backend",
    "Enable cors policy and proxy",
    "Error handling and code refactor"
  ];
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <div>
        <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Prachanda Estate</h1>
        <p className='mb-4 text-slate-700'>Prachanda Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</p>
        <p className='mb-4 text-slate-700'>
          Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
        </p>
        <p className='mb-4 text-slate-700'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>
      </div>

      <section className="text-gray-600 body-font " id="learned">
        <div className="container px-5 py-10 mx-auto">
          <div className="text-center mb-12">
            <h1 className="sm:text-2xl text-2xl font-bold  text-center mb-4  text-gray-900">
              <div> I learned a lots of MERN Stack concepts while working on this project,
                <br /> some of them are listed below :
              </div>
            </h1>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            {concepts.map((element, index) => {
              return (
                <div className="p-2 sm:w-1/2 w-full" key={index}>
                  <div className="bg-gray-700  rounded flex p-4 h-full items-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      className={` "text-rose-500 text-blue-700"} w-6 h-6 flex-shrink-0 mr-4`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <span className="text-white title-font font-medium">{element}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  )
}

export default About
