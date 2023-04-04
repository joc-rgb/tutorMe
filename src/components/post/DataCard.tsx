import { Post, User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser';
import TagItem from './TagItem';
import Link from 'next/link';
import Button, { Variant } from '../global/Button';
import {BsPencilSquare} from "react-icons/bs"

interface IDataCard{
  owner?:boolean,
  handleDelete?:()=>void,
  data:{postedBy:{
    id:string,
    name:string,
    email:string
  }}&Post 
}
const DataCard = (props:IDataCard) => {
  return (
    <Link href={`post/${props.data.id}`} >
    <div className='flex md:flex-row flex-col rounded-lg m-8 text-center shadow-xl mx-16 p-4 bg-blue-50'>
        <Image alt={props.data.title} src={props.data.img?props.data.img:'https://tutorme.s3.ap-southeast-1.amazonaws.com/no-image.png'} width={350} height={20} />
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