import React from 'react'
import Button, { Variant } from '../global/Button'

const Hero = () => {
  return (
    <div className='justify-center items-center flex flex-row p-8'>
        <div className='flex flex-col flex-wrap md:w-1/3 gap-4'>
          <p className="text-blue-700 text-2xl font-bold ">Unlock your potential with our community of tutors.</p>
          <p>Whether you&apos;re looking to master a new skill, improve your grades, or simply learn something new, we&apos;ve got you covered.</p>
          <Button variants={Variant.outline} >Find A Tutor</Button>
        </div>
        <img className='object-contain w-[600px] ' src='https://static.vecteezy.com/system/resources/previews/014/618/927/original/tutor-illustration-concept-a-flat-illustration-isolated-on-white-background-vector.jpg' />
    </div>
  )
}

export default Hero