import React, { ReactNode } from 'react'
import {RxCrossCircled} from 'react-icons/rx'
interface TagProps{
    text:string
    onDelete?:(target: string) => void
    inputType:boolean
}

const TagItem = (props: TagProps) => {
  return (
    <div className={`text-blue-700 flex flex-1 items-center rounded-2xl bg-white py-1 text-sm shadow w-full max-w-[95px] gap-2 ${!props.inputType&&'justify-center font-normal'}`}>
      {props.inputType && props.onDelete && 
      (<RxCrossCircled onClick={()=>props.onDelete?.(props.text)} className='text-lg'/>)
      }
      {props.text.toLowerCase()}
      </div>
  )
}

export default TagItem