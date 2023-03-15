import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import React, { FormEvent, useCallback, useMemo, useRef, useState } from 'react'
import Button, { Variant } from "../components/Button";
import { TAGS } from "../constant";
import RichTextEditor from "../components/RichTextEditor";
import Input from "../components/Input";
import TagItem from "../components/TagItem";
import SuggestionItem from "../components/SuggestionItem";

const Post = () => {
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = React.useState<string[]>([])
  const [tagInput, setTagInput] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [price, setPrice] = React.useState('0.00')
  const [onlinePrice,setOnlinePrice] = React.useState('0.00')
  const [inpersonPrice,setInpersonPrice] = React.useState('0.00')
  const [mode,setMode] = useState('MODE')
  const [desc,setDesc] = useState()
  const [email, setEmail] = useState('')
  const [hp,setHp] = useState('')

  /**
   * 
   * Handle Tag Addition & Deletion
   */
  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=> {
    const {key} = e;
    if(key==','|| key=='enter'){
      e.preventDefault()
      setTags(tags=>[...tags, tagInput])
      setTagInput('')
    }
  }

  const handleDelete = (target: string) =>{
    const filteredTags = tags.filter(tag=>tag!==target)
    setTags(filteredTags)
  }

  {/*Handle Tag Input Change*/}
  const handleTagInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setTagInput(e.target.value)
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLoading(true)

    //dev mode
    console.log(`tags: ${JSON.stringify(tags)}`)
    console.log(`desc: ${desc}`)
    console.log(`title: ${title}`)
    console.log(`price: ${price}`)
    console.log(`f2f price: ${inpersonPrice}`)
    console.log(`online price: ${onlinePrice}`)
    console.log(`mode: ${mode}`)
    console.log(`contact: [${email}, ${hp}}]`)
  }
  
  return (
    <div className="w-full h-full">
      <p className="self-center text-xl">Post an Offer</p>
      <form className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg" onSubmit={handleSubmit}>
    <label className="block">
      <span className="text-gray-700">Title</span>
      <Input
        placeholder="Title of your tutor offer.eg: Private 1-1 High School Math Class By A Senior Math Lecturer"
        required
        onChange={(e)=>setTitle(e.target.value)}
        name="title"
        type="text"
        
      />
    </label>
    <label className="block">
      <span className="text-gray-700">Description</span>
      <RichTextEditor setDesc={setDesc} />
    </label>
    <label className="block">
      <span className="text-gray-700">Tags</span>
      {tags.map((tag,i)=><TagItem onDelete={handleDelete} key={i} text={tag}/>)}
      <Input 
        placeholder="math"
        required
        onChange={e=>handleTagInputChange(e)}
        value={tagInput}
        onKeyDown={e=>handleKeyDown(e)}
        name="tag"
        type="text"
      />      

      {/*Provide tags suggestions dropdown based on user Input*/}
       {tagInput&&TAGS.filter(tag=>tag.startsWith(tagInput)).map((tag,i)=><SuggestionItem key={i} text={tag} onDelete={handleDelete} />)}
    </label>
    <label className="block">
      <span className="text-gray-700">Mode</span>
      <select
        placeholder="Class Mode"
        name="mode"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
        required
        onChange={(e) => setMode(e.target.value)}
        value={mode}
      >
        <option>ONLINE</option>
        <option>IN-PERSON</option>
        <option>BOTH</option>
      </select>
    </label>
    
    <label className="block"> 

    {/* Check the class mode and display suitable price Input */ }
      {mode==="BOTH"?
      <>
        <span className="text-gray-700">Price Per ONLINE Session</span>
        <Input 
          name="price"
          type="number" 
          required
          min="0.00"
          step="0.01"
          defaultValue={0.00}
          onChange={e=>setOnlinePrice(e.target.value.toString())}
        />
        <span className="text-gray-700">Price Per IN-PERSON Session</span>
        <Input 
          name="price"
          type="number" 
          required
          min="0.00"
          step="0.01"
          defaultValue={0.00}
          onChange={e=>setInpersonPrice(e.target.value.toString())}
        />
      </>:
      <>
        <span className="text-gray-700">Price Per Session</span>
        <Input 
          name="price"
          type="number" 
          required
          min="0.00"
          step="0.01"
          defaultValue={0.00}
          onChange={e=>setPrice(e.target.value.toString())}
        />
      </>}
    </label>
    

    <label className="block">
      <span className="text-gray-700">Contact Number</span>
      <Input
        placeholder="eg:+60123456789"
        onChange={e=>setHp(e.target.value)}
        name="tel"
        type="tel"
      />
      <span className="text-gray-700">Contact Email</span>
      <Input
        required
        placeholder="eg:john@gmail.com"
        name="email"
        type="email"
        onChange={e=>setEmail(e.target.value)}
      />
    </label>
    <Button
      type="submit"
      disabled={loading}
      variants={Variant.primary}>
      {loading ? (
        <span className="flex items-center justify-center">
          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
          Creating...
        </span>
      ) : (
        <span>Create Post</span>
      )}
    </Button>
  </form></div>
  )
}

export default Post

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
