import React from 'react'
import Button from './ui/Button'

const Home = () => {
  return (
    <div className='flex items-center mx-40 gap-9 flex-col'>
      <h1
       className='font-extrabold text-[40px] text-center mt-16'
       >
        <span className='text-[#f56551]'>Your AI-powered travel buddy.</span><br/> Discover hidden gems,and get smart insights..</h1>
    <p className='text-xl text-gray-500 text-center'>"Explore smarter. Travel better."</p>
    <Button variant='secondary'>Get Started For Free</Button>
    </div>
  )
}

export default Home