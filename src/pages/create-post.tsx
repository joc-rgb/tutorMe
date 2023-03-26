import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import React, { FormEvent, useCallback, useMemo,  useState } from 'react'
import Button, { Variant } from "../components/global/Button";
import { TAGS } from "../constant";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-hot-toast";
import { createPostMutation } from "../graphql/operations/post";
import { getUserByEmailQuery } from "../graphql/operations/user";
import FormInput, { Operation } from "../components/post/FormInput";

const CreatePost = () => {
  const {user} = useUser()

  const { data, loading:userLoading, error:userError } = useQuery(getUserByEmailQuery, {
    variables: { email: user?.email! }
  })

  const [tags, setTags] = React.useState<string[]>([])
  const [suggestions, setSuggestions] = React.useState<string[]>([])
  const [tagInput, setTagInput] = React.useState('')

  /**
   * 
   * Handle Tag Addition & Deletion
   */
  const addTag = (target:string)=>{
    if(target=="")return
    const exist = tags.indexOf(target.toLowerCase())
    if(exist!==-1) return
    else{
      setTags(tags=>[...tags, target.toLowerCase()])
    }
  }
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === ',' || key === 'Enter') {
      e.preventDefault();
      addTag(tagInput);
      setTagInput('');
    } 
  }, [tagInput, suggestions]);

  const handleDelete = (target: string) =>{
    const filteredTags = tags.filter(tag=>tag!==target)
    setTags(filteredTags)
  }

  {/*Handle Tag Input Change*/}
  const handleTagInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const InputValue = e.target.value;
    setTagInput(InputValue);
    const sugList = TAGS.filter(tag => tag.startsWith(InputValue));
    setSuggestions(sugList);
  }, [tagInput]);

  {/* Tag Autocomplete Feature */}
  const handleSuggestionClick = (suggestion:string)=>{
    addTag(suggestion)
    setTagInput('')
  }


  
  
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
