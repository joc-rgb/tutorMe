import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import React from 'react'
import FormInput, { Operation } from "../components/post/FormInput";

const CreatePost = () => {

  return (
    <div className="w-full h-full">
      <p className="self-center text-xl">Create a New Post</p>
      <FormInput operationType={Operation.CREATE} />
      </div>
  )
}

export default CreatePost

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
