import React from 'react'

interface IHighlightCard{
    title: string
    value: string
}
const HighlightCard = (props:IHighlightCard) => {
  return (
    <div className='rounded-3xl bg-blue-200 flex flex-col gap-4 p-8 items-center justify-center' >
        <p className="font-light text-sm capitalize">{props.title}</p>
        <p className='font-medium text-lg tracking-wider capitalize'>{props.value.toLowerCase()}</p>
    </div>
  )
}

export default HighlightCard