import React from 'react'
import UserDetails from '../../components/post/UserDetails'
import { GetServerSideProps } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import { IPost } from '../../constant'
import { prisma } from '../../lib/prisma'

interface IUserPage{
  id: number;
  name: string;
  email: string;
  location: string | null;
  profileImg: string | null;
  phoneNumber: string | null;
  about: string | null;
  expertiseIn: string[];
  highestEducationLvl: string | null;
  posts: IPost[] 
}
const UserPage = (user:IUserPage) => {
  console.log(user)
  return (
    <UserDetails posts={user.posts} userInfo={user} />
  )
}

export default UserPage

export const getServerSideProps: GetServerSideProps = async ({ req, res, query } ) => {
  const userId = query.uid as string
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
  
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId)
    },
    select: {
      id:true,
      email:true,
      name:true,
      phoneNumber:true,
      about:true,
      expertiseIn:true,
      location:true,
      profileImg:true,
      highestEducationLvl: true,
      posts:true
    },
  });
  
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }
  return {
    props: user,
  };
};