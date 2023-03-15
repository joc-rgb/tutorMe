import React, { ReactNode } from 'react'
import {FaCross} from 'react-icons/fa'
interface TagProps{
    text:string
    onDelete:(target: string) => void
    
}

const TagItem = (props: TagProps) => {
  return (
    <div className='rounded border border-blue-300 text-sm shadow'><FaCross onClick={e=>props.onDelete(props.text)} />{props.text}</div>
  )
}

export default TagItem