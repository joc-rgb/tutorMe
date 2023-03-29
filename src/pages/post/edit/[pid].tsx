import React, { useState } from 'react'
import FormInput, { Operation } from '../../../components/post/FormInput'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import { Mode} from '@prisma/client'
import Loader from '../../../components/global/Loader'

interface IEditPost{
  img: string | null;
  tag: string[];
  title: string;
  pricePerSession: number[];
  tutorMode: Mode;
  hourPerSession: number;
  description: string;
  contact: string[];
  postedById: number;
}

const EditPost = (post:IEditPost) => {
  const postId = useRouter().query.pid
  
  if (!post) {
    return (
      <div className="flexStart min-h-screen">
        <Loader className='w-96 h-96' />
      </div>
    );
  }
  if(post){
  console.log(post.title)}
  return (
    <div className='pt-10'>
      <p className='text-blue-600'>Edit Post</p>
      <FormInput post={post} operationType={Operation.UPDATE} postId={Number(postId)} />
      </div>
  )
}

export default EditPost

export const getServerSideProps: GetServerSideProps = async ({ req, res, query } ) => {
  const postId = query.pid as string
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
  console.log(postId)
  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email: session.user.email,
    },
  });

  const post = await prisma.post.findFirst({
    select:{
      postedById:true,
      title:true,
      description:true,
      contact:true,
      hourPerSession:true,
      img:true,
      pricePerSession:true,
      tag:true,
      tutorMode: true,
      
    },
    where:{
      id: Number(postId)
    }
  })
  if (!user || !post || user.id !== post.postedById) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  return {
    props: post,
  };
};