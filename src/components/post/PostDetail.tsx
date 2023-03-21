import Image from 'next/image'
import React from 'react'
import parse from 'html-react-parser';
import Button from '../global/Button'
import { Post } from '@prisma/client'
import HighlightCard from './HighlightCard'
interface IPostDetailProps {
    post: Post;
  }
const PostDetail = ({post}:IPostDetailProps) => {
  return (
    <div className="flex flex-col-reverse p-16 gap-8 md:flex-row ">
        <div className="flex flex-1 self-start flex-col md:sticky md:top-32 rounded-3xl h-fit items-center justify-center border border-blue-100 gap-2 p-4 px-8 shadow-lg">
          <div className="relative rounded-full w-16 h-16">
        <Image src='https://placekitten.com/100/100' alt={post.postedBy.name} className='rounded-full' fill/>
       </div>
       <p className='text-sm'>{post.postedBy.name}</p>
        <Button  >View Profile</Button>
      </div>
        <div className="flex flex-col gap-8 border border-blue-100 p-4 px-8 rounded-3xl shadow-lg">
        <p className="font-normal text-2xl">{post.title}</p>
          {post.img&&<Image src={post.img} alt={post.title} />}
        <div className='flex flex-col justify-start text-start'>
          <div className="flex gap-8 py-2">
            <HighlightCard title='Price' value={`$${post.pricePerSession[0]}/session`}/>
            <HighlightCard title='Class Mode' value={`${post.tutorMode}`}/>
            <HighlightCard title='Category' value={`${post.tag[0]}`}/>
            <HighlightCard title='Hours Per Session' value={'1.5'}/>
          </div>
          <p className="text-gray-700 text-sm italic">by <span>{post.postedBy.name}</span></p>
          <p className="text-gray-700 text-sm ">created at <span>{post.createdAt.toString()}</span></p>
        <div className="flex flex-col gap-2  text-sm" >{parse(post.description)}</div>

            
      </div>
      </div>
      
    </div>
  )
}

export default PostDetail