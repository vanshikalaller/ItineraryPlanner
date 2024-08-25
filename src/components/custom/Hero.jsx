import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1
      className='font-extrabold text-[50px] gap-9 text-center mt-16'>
        <span className='text-[#601A3E]'>Discover your Next Adventure with</span> Personalized Itineary Generator!!</h1>
        <p>Your personal trip planner and travel curator, creating custom itinearies tailored to your interests and budget.</p>
        
        <Link to={'/createTrip'}>
        <Button> Get Started, It's Free</Button>
        </Link>
    </div>
    
  )
}

export default Hero
