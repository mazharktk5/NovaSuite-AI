import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const navigate = useNavigate()

  const { user } = useUser()
  const { openSignIn } = useClerk()
  return (
    <div className='fixed w-full z-10 backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 '>
      <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={() => navigate('/')} />
      {
        user ? <UserButton /> : (
          <button
            onClick={openSignIn}
            className='flex items-center gap-1 sm:gap-2 rounded-full text-xs sm:text-sm md:text-base cursor-pointer bg-primary text-white px-4 sm:px-6 md:px-10 py-1.5 sm:py-2 md:py-2.5 transition-all duration-200'>
            Get Started
            <ArrowRight className='w-3 h-3 sm:w-4 sm:h-4' />
          </button>

        )
      }



    </div>
  )
}

export default Navbar
