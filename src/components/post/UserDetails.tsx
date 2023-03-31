import { User } from '@prisma/client'
import React from 'react'
import Button, { Variant } from '../global/Button'
import parse from 'html-react-parser';
import TagItem from './TagItem';
import DataCard from './DataCard';
import Link from 'next/link';
import { BsPencilSquare, BsTrash2Fill } from 'react-icons/bs';
import { IPost } from '../../constant';
import { MdLocationPin } from 'react-icons/md';

interface IUserDetails{
  userInfo: {
    id: number;
    name: string;
    email: string;
    location: string | null;
    profileImg: string | null;
    phoneNumber: string | null;
    about: string | null;
    expertiseIn: string[];
    highestEducationLvl: string | null;
}
  posts: IPost[]
  owner?: boolean
  handleDeleteClick?: (postId: number) => void
}
const UserDetails = (props:IUserDetails) => {
  
  return (
    <div className='flex flex-col md:flex-row gap-4 p-4 '>
      <div className="invisible md:visible flex flex-1  z-0 self-start flex-col sticky top-32  rounded-3xl h-fit items-center justify-center md:border border-blue-100 gap-2 p-4 px-8 shadow-lg md:max-w-xs ">
          <div className="rounded-full w-32 h-32 flex z-0">
          <img src='https://placekitten.com/200/200' alt={props.userInfo.name} className='rounded-full w-full h-full'  />
          </div>
        <p className=''>{props.userInfo.name}</p>
        {props.userInfo.location&&<p className='flex gap-1 items-center justify-center text-gray-700 text-sm'><MdLocationPin />{props.userInfo.location}</p>}
      </div>
      <div className="flex flex-3 flex-col mt-8 gap-8 md:border border-blue-100 p-4 md:px-8 rounded-3xl md:shadow-lg md:w-full ">
        <Link href={'/user/edit'} className='self-end'><Button variants={Variant.outline}><BsPencilSquare/></Button></Link>
      <div className='p-8 m-4 border-y border-slate-300'>
        <p className="font-semibold text-2xl">About</p>
        {props.userInfo.about ? parse(props.userInfo.about) :<p className="font-light text-sm">No about yet.</p>}
      </div>
      <div className='p-8 m-4 border-y border-slate-300'>
        <p className="font-semibold text-2xl">Expertise In</p>
        <div className="flex gap-3 flex-wrap ">
          {props.userInfo.expertiseIn.map(item=><TagItem inputType={false} text={item} key={item} />)}
        </div>
        
      </div>
      <div className='p-8 m-4 border-y border-slate-300'>
        <p className="font-semibold text-2xl">Highest Education Level</p>
        {props.userInfo.highestEducationLvl}
      </div>
      <div className='p-8 m-4 border-y border-slate-300'>
      <p className="font-semibold text-2xl">Published Posts</p>
      {props.posts.map(post => 
      <div key={post.id} className='flex flex-col'> 
        <DataCard data={post} owner={props.owner} />
          {props.owner&&
          <><Link href={`/edit/${post.id}`}>
            <Button variants={Variant.outline}><BsPencilSquare />
            </Button>
          </Link>
          <Button onClick={()=>props.handleDeleteClick?.(post.id)} variants={Variant.outline}><BsTrash2Fill /></Button>
        </>}
      </div>
      )}
      </div>
      
      </div>
      
    </div>
  )
}

export default UserDetails