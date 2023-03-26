import React from 'react'
import Button, { Variant } from '../components/global/Button'
import Link from 'next/link'

const NotFoundError = () => {
  return (
    <div className='w-full max-h-[100vh] flex flex-col gap-4 items-center justify-center p-20'>
        <p className="text-6xl font-bold">4 0 4</p>
        <p className="text-lg">Sorry, We couldn&apos;t find what you are looking for!</p>
        <Link href={'/'} >
            <Button variants={Variant.outline}>Back To Home Page</Button>
        </Link>
    </div>
  )
}

export default NotFoundError