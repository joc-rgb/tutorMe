import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser';
import Button, { Variant } from '../global/Button'
import { Post } from '@prisma/client'
import HighlightCard from './HighlightCard'
import Link from 'next/link';
interface IPostDetailProps {
    post: {postedBy:{
      id:string,
      name:string,
      email:string
    }}&Post 
  }
const PostDetail = ({post}:IPostDetailProps) => {
  return (
    <div className="flex flex-col-reverse md:p-16 p-8 gap-8 md:flex-row ">
        <div className="invisible md:visible flex flex-1 self-start flex-col sticky top-32 rounded-3xl h-fit items-center justify-center md:border border-blue-100 gap-2 p-4 px-8 shadow-lg">
          <div className="relative rounded-full w-16 h-16">
        <img src='https://placekitten.com/100/100' alt={post.postedBy.name} className='rounded-full'  />
       </div>
       <p className='text-sm'>{post.postedBy.name}</p>
        <Link href={`/user/${post.postedById}`} ><Button variants={Variant.outline} >View Profile</Button></Link>
      </div>
        <div className="flex flex-col gap-8 md:border border-blue-100 p-4 md:px-8 rounded-3xl md:shadow-lg">
          <div className="flex-col">
        <p className="font-normal text-2xl">{post.title}</p>
        
            <p className="text-gray-700 text-sm italic">by <span>{post.postedBy.name}</span></p>
          <p className="text-gray-700 text-sm ">created at <span>{post.createdAt.toString()}</span></p>
          </div>
          {post.img&&<img src={post.img} alt={post.title} />}
        <div className='flex flex-col justify-start text-start'>
          <div className="flex md:flex-row flex-col gap-8 py-2 ">
            <HighlightCard title='Price' value={`$${post.pricePerSession[0]}/session`}/>
            <HighlightCard title='Class Mode' value={`${post.tutorMode}`}/>
            <HighlightCard title='Category' value={`${post.tag[0]}`}/>
            <HighlightCard title='Hours Per Session' value={'1.5'}/>
          </div>
          
        <div className="flex flex-col gap-2 pt-8 text-sm" >{parse(post.description)}</div>

            
      </div>
      </div>
      
    </div>
  )
}

export default PostDetail