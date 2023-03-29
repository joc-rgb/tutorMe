import { useMutation, useQuery } from '@apollo/client';
import parse from 'html-react-parser';
import React, { useState } from 'react'
import { getUserByEmailQuery, getUserInfoByEmail } from '../graphql/operations/user'
import { useUser } from '@auth0/nextjs-auth0/client'
import { GetServerSideProps } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import Loader from '../components/global/Loader'
import { toast } from 'react-hot-toast'
import Error from '../components/global/Error'
import { IPost } from '../constant'
import DataCard from '../components/post/DataCard'
import TagItem from '../components/post/TagItem'
import { User } from '@prisma/client'
import {MdLocationPin} from "react-icons/md"
import {BsPencilSquare} from "react-icons/bs"
import Link from 'next/link';
import Button, { Variant } from '../components/global/Button';
import Modal from '../components/global/Modal';
import { deletePostMutation } from '../graphql/operations/post';
const Dashboard = () => {
  const [modal, setModal] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<number>(0)
  const {user} = useUser()
  
  const {data,loading,error} = useQuery(getUserInfoByEmail,{
    variables:{email: user?.email as string}
  })

  const [deletePost,{ loading:deleteLoading, error:deleteError }] = useMutation(deletePostMutation,{})

  const handleDeleteClick = (postId:number) => {
    setModal(true)
    setSelectedPostId(postId)
  }

  const handleDelete = async () => {
    try {
    toast.promise(
      deletePost({
        variables:{
          id: selectedPostId
        }
      }),
      {
        loading: 'Updating profile..',
        success: 'Profile successfully updated !🎉',
        error: `Something went wrong 😥 Please try again. ${error}`,
      }
    )
    } catch (error) {
        console.error(error);
      }
    }

  if (loading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader className='w-96 h-96' />
      </div>
    );
  }
  if(error){
    console.log(error)
    toast.error(error.message)
    return <Error />
  }
  console.log(data.getUserByEmail)
  const userInfo:User = data.getUserByEmail
  const posts:IPost[] = data.getUserByEmail.posts
  console.log(posts)
  return (
    <>
    {modal&&<Modal handleAction={handleDelete} setModal={setModal} />}
    <div className='flex flex-col md:flex-row gap-4 p-4 '>
      <div className="invisible md:visible flex flex-1  z-0 self-start flex-col sticky top-32  rounded-3xl h-fit items-center justify-center md:border border-blue-100 gap-2 p-4 px-8 shadow-lg md:max-w-xs ">
          <div className="rounded-full w-32 h-32 flex z-0">
          <img src='https://placekitten.com/200/200' alt={userInfo.name} className='rounded-full w-full h-full'  />
          </div>
        <p className=''>{userInfo.name}</p>
        {userInfo.location&&<p className='flex gap-1 items-center justify-center text-gray-700 text-sm'><MdLocationPin />{userInfo.location}</p>}
      </div>
      <div className="flex flex-3 flex-col mt-8 gap-8 md:border border-blue-100 p-4 md:px-8 rounded-3xl md:shadow-lg md:w-full ">
        <Link href={'/user/edit'} className='self-end'><Button variants={Variant.outline}><BsPencilSquare/></Button></Link>
      <div className='p-8 m-4 border-y border-slate-300'>
        <p className="font-semibold text-2xl">About</p>
        {userInfo.about ? parse(userInfo.about) :<p className="font-light text-sm">No about yet.</p>}
      </div>
      <div className='p-8 m-4 border-y border-slate-300'>
        <p className="font-semibold text-2xl">Expertise In</p>
        <div className="flex gap-3 flex-wrap ">
          {userInfo.expertiseIn.map(item=><TagItem inputType={false} text={item} key={item} />)}
        </div>
        
      </div>
      <div className='p-8 m-4 border-y border-slate-300'>
        <p className="font-semibold text-2xl">Highest Education Level</p>
        {userInfo.highestEducationLvl}
      </div>
      <div className='p-8 m-4 border-y border-slate-300'>
      <p className="font-semibold text-2xl">Published Posts</p>
      {posts.map(post => 
      <div key={post.id} className='flex'> 
        <DataCard data={post} owner={true} />
        <Link href={`/edit/${post.id}`}><Button variants={Variant.outline}>Edit <BsPencilSquare />
            </Button></Link>
           
            <Button onClick={()=>handleDeleteClick(post.id)} variants={Variant.outline}>Delete </Button>
      </div>
      )}
      </div>
      
      </div>
      
    </div></>
  )
}

export default Dashboard


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    };
  }

  

  return {
    props: {},
  };
};
