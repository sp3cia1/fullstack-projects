import React from 'react'

import { Fugaz_One } from 'next/font/google'
import Button from './Button'
import Calender from './Calender'

const fugaz = Fugaz_One({
  subsets: ['latin'],
  weight: '400'
})

export default function Hero() {
  return (
    <div className='py-4 md:py-10 flex flex-col gap-4 sm:gap-8'>

      <h1 className={'text-5xl sm:text-text-6xl md:text-7xl text-center ' + fugaz.className}><span className='textGradient'>Mood-Tracker</span> helps you track your <span className='textGradient'>daily</span> mood!</h1>

      <p className='text-xl sm:text-2xl md:text-3xl text-center w-full mx-auto max-w-[600px]'>Create your mood record and see how you feel on <span className='font-semibold'>every day of every year.</span></p>

      <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
        <Button text="Sign Up"/>
        <Button text="Login" dark/>
      </div>
      <Calender/>
    </div>
  )
}
