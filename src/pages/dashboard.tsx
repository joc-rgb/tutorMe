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
import { User } from '@prisma/client'
import Modal from '../components/global/Modal';
import { deletePostMutation } from '../graphql/operations/post';
import UserDetails from '../components/post/UserDetails';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [modal, setModal] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<number>(0)
  const {user} = useUser()
  const router = useRouter()
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

    router.push('/dashboard')
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
  
  return (
    <>
    {modal&&<Modal handleAction={handleDelete} setModal={setModal} />}
    <UserDetails  posts={posts} userInfo={userInfo} owner={true} handleDeleteClick={handleDeleteClick} />
    </>
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
