import Link from 'next/link'
import React from 'react'
import Button, { Variant } from './Button'

interface IError{
    errorText?: string
    errorMsg?:string
}
const Error = (props:IError) => {
  return (
    <div className='w-full max-h-[100vh] flex flex-col gap-4 items-center justify-center p-20'>
        <p className="text-6xl font-bold">{props.errorText || 'Unknown Error'}</p>
        <p className="text-lg">{props.errorMsg || "Something's wrong"}</p>
        <Link href={'/'} >
            <Button variants={Variant.outline}>Back To Home Page</Button>
        </Link>
    </div>
  )
}

export default Error