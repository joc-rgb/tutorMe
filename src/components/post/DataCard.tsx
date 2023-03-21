import { Post } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser';
import TagItem from './TagItem';
import Link from 'next/link';
interface IDataCard{
  data:Post
}
const DataCard = (props:IDataCard) => {
  return (
    <Link href={`post/${props.data.id}`} >
    <div className='flex flex-row rounded-lg m-8 text-center shadow-xl mx-16 p-2 bg-blue-50'>
        <img src='https://www.myprivatetutor.my/userfiles/centers/center1517297641964.png' />
        <div className='flex flex-col justify-start text-start px-8'>
            <p className='font-semibold text-xl'>{props.data.title}</p>
            <p className="text-gray-700 text-sm">by <span>{props.data.postedBy.name}</span></p>
            <div className="flex flex-col gap-2 h-36 overflow-hidden text-sm" >{parse(props.data.description)}</div>
            <div className="flex gap-2 py-2">
            <TagItem text={props.data.tag[0]} inputType={false} />
            <TagItem inputType={false} text={props.data.tutorMode}/>
            </div>
        </div>
        <p className='text-blue-500 font-semibold '>${props.data.pricePerSession}/hour</p>
    </div>
    </Link>
  )
}

export default DataCard