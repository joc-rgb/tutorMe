import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma';
import React, { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import Input from '../../components/global/Input';
import { toast } from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { updateUserMutation } from '../../graphql/operations/user';
import RichTextEditor from '../../components/post/RichTextEditor';
import TagItem from '../../components/post/TagItem';
import { TAGS, educationLvl } from '../../constant';
import SuggestedTag from '../../components/post/SuggestedTag';
import Button, { Variant } from '../../components/global/Button';

interface IEditProfile{
  email:string;
  about: string | null;
  expertiseIn: string[];
  location: string | null;
  profileImg: string | null;
  highestEducationLvl: string | null;
}
const EditProfile = (user: IEditProfile) => {

  const [updateUser, { loading, error }] = useMutation(updateUserMutation, {})

    const [expertiseIn, setExpertiseIn] = useState(user.expertiseIn||[])
    const [about, setAbout] = useState(user.about||"")
    const [expertiseInput, setExpertiseInput] = useState("")
    const [location, setLocation] = useState(user.location||"")
    const [highestEducationLvl, setHighestEducationLvl] = useState(user.highestEducationLvl||"")
    const [suggestions, setSuggestions] = useState<string[]>([])

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;
      if (key === ',' || key === 'Enter') {
        e.preventDefault();
        addTag(expertiseInput);
        setExpertiseInput('');
      } 
  }, [expertiseInput, suggestions]);

  const addTag = (target:string)=>{
    if(target=="")return
    const exist = expertiseIn.indexOf(target.toLowerCase())
    if(exist!==-1) return
    else{
      setExpertiseIn(expertiseIn=>[...expertiseIn, target.toLowerCase()])
    }
  }

  const handleTagInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const InputValue = e.target.value;
    setExpertiseInput(InputValue);
    const sugList = TAGS.filter(tag => tag.startsWith(InputValue));
    setSuggestions(sugList);
  }, [expertiseInput]);

  const handleDelete = (target: string) =>{
    const filteredTags = expertiseIn.filter(tag=>tag!==target)
    setExpertiseIn(filteredTags)
  }

    const handleSubmitUpdateProfile = async (e:FormEvent) => {
      e.preventDefault()
      try {
        toast.promise(
          updateUser({
            variables:{
              email:user.email,
              location,
              expertiseIn,
              about,
              highestEducationLvl,
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

    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      handleSubmitUpdateProfile(e)
    }

    const handleSuggestionClick = (suggestion:string)=>{
      addTag(suggestion)
      setExpertiseInput('')
    }
  return (
    <div className='flex flex-col md:flex-row gap-4 p-4 w-full items-center justify-center'>
        <form className="grid grid-cols-1 gap-y-6 p-8 rounded-lg" onSubmit={e=>handleSubmit(e)}>
      
    <label className="block">
      <span className="text-gray-700">Location</span>
      <Input
        
        placeholder="Current Location"
        required
        onChange={(e)=>setLocation(e.target.value)}
        name="title"
        type="text"
        value={location}
      />
    </label>
    <label className="block">
      <span className="text-gray-700">About</span>
      <RichTextEditor setDesc={setAbout} initialValue={user.about?user.about:'<p>Write about your background, experience, hobby, etc.</p>'} /> 
    </label>
    <label className="block">
      <span className="text-gray-700">Expertise In</span>
      <div className="flex flex-row flex-wrap w-full gap-2 mt-4 mb-1">
        {expertiseIn.map((tag,i)=><TagItem inputType={true} onDelete={handleDelete} key={i} text={tag}/>)}
        </div>
      <Input
         
        placeholder="math"
        onChange={e=>handleTagInputChange(e)}
        onKeyDown={e=>handleKeyDown(e)}
        value={expertiseInput}
        name="expertise"
        type="text"
      />      

      {/*Provide tags suggestions dropdown based on user Input*/}
       {expertiseInput&&suggestions.map((tag,i)=><SuggestedTag key={i} text={tag} handleClick={handleSuggestionClick} />)}
      
    </label>

    <label className="block">
      <span className="text-gray-700">Highest Education Level </span>
      <select
        placeholder="Highest Education Level"
        name="Highest Education Level"
        required
        onChange={e=>setHighestEducationLvl(e.target.value)}
        value={highestEducationLvl}
      >
        {educationLvl.map(education=><option key={education} value={education}>{education}</option>)}
      </select>
    </label>
      <Button type='submit' variants={Variant.outline} >Submit</Button>
    </form>
    </div>
  )
}

export default EditProfile

export const getServerSideProps: GetServerSideProps = async ({ req, res, query } ) => {
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
    select: {
      email:true,
      about:true,
      expertiseIn:true,
      location:true,
      profileImg:true,
      highestEducationLvl: true,
    },
    where: {
      email: session.user.email,
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