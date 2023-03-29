import React, { FormEvent, KeyboardEvent, useCallback, useState } from 'react'
import Input from '../global/Input'
import { RxCrossCircled } from 'react-icons/rx'
import { Mode, Post } from '@prisma/client'
import Button, { Variant } from '../global/Button'
import RichTextEditor from './RichTextEditor'
import TagItem from './TagItem'
import SuggestionTag from "./SuggestedTag";
import { TAGS } from '../../constant'
import { toast } from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { createPostMutation, updatePostMutation } from '../../graphql/operations/post'
import { JSONObject } from 'graphql-scalars/typings/mocks'

export enum Operation{
  CREATE,
  UPDATE
}
interface IFormInput{
    operationType:Operation 
    postId?:Number
    post?:{
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
}

const FormInput = (props:IFormInput) => {
    const [createPost, { loading, error }] = useMutation(createPostMutation, {})
    const [updatePost, { loading: updateLoading, error: updateError}] = useMutation(updatePostMutation,{})
    const [image,setImage] = useState<string>(props.post?.img?props.post?.img:'')
    const [fileImg, setFileImg] = useState<File>()
    const [tags, setTags] = useState<string[]>(props.post?.tag?props.post?.tag:[])
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [title, setTitle] = useState(props.post?.title?props.post?.title:'')
    const [price, setPrice] = useState(props.post?.pricePerSession?[props.post?.pricePerSession[0].toString()]:['0.00'])
    const [mode,setMode] = useState<Mode>(props.post?.tutorMode?props.post?.tutorMode:Mode.ONLINE)
    const [hour, setHour] = useState(props.post?.hourPerSession?props.post?.hourPerSession.toString():'1.5')
    const [desc,setDesc] = useState(props.post?.description?props.post?.description:'')
    const [email, setEmail] = useState(props.post?.contact[1]?props.post?.contact[1]:'')
    const [hp,setHp] = useState(props.post?.contact[0]?props.post?.contact[0]:'')

    console.log(props.post?.contact[1])
    const deleteImage = async (imgKey:string) => {
      const res = await fetch(
        `/api/delete?key=${imgKey}`
      )
      res.status===200?toast.success('Image deleted successfully!'):toast.error('Something went wrong.')
      
    }
    const uploadPhoto = async (fileImg: File) => {
      if (!fileImg) return
      const filename = fileImg.name
      const fileType = fileImg.type
      const res = await fetch(
          `/api/upload?file=${filename}&fileType=${fileType}`
      )
      const { url } = await res.json()   
    
      toast.promise(
        fetch(url, {
          method: 'PUT',
          body: fileImg,
          headers: { "Content-Type": fileType }
        }),
        {
          loading: 'Uploading...',
          success: 'Image successfully uploaded!🎉',
          error: `Upload failed 😥 Please try again `,
        },
      )
    }

    const handleSubmitUpdatePost = async (fileImg:File|undefined)=>{
      if(image!==props.post?.img && props.post?.img){
        console.log(props.post?.img)
        const imgKey = props.post?.img.substring(33).replace("+", " ")
        console.log(imgKey)
        await deleteImage(imgKey)
        fileImg && await uploadPhoto(fileImg)
      }

      const imgUrl = fileImg?`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${encodeURIComponent(fileImg.name)}`:null
      
      try {
        toast.promise(
          updatePost({
            variables: {
              id:props.postId,
              
              title,
              description:`${desc}`,
              pricePerSession: parseFloat(price[0]),
              contact: [hp, email],
              tutorMode:mode,
              tag:tags,
              img:props.post?.img===image?props.post.img:imgUrl,
              hourPerSession:parseInt(hour)
            },
          }),
          {
            loading: 'Updating post..',
            success: 'Post successfully updated !🎉',
            error: `Something went wrong 😥 Please try again. ${error}`,
          }
        );
      } catch (error) {
        console.error(error);
      }}
    
    const handleSubmitCreatePost = async (fileImg:File|undefined) => {
      
      const imgUrl = fileImg?`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${encodeURIComponent(fileImg.name)}`:null
      console.log("ImgURL: ", imgUrl)
      fileImg&&await uploadPhoto(fileImg)
      if(props.operationType===Operation.CREATE)
      {
        try {
        toast.promise(
          createPost({
            variables: {
              title,
              description:`${desc}`,
              pricePerSession: parseFloat(price[0]),
              contact: [hp, email],
              tutorMode:mode,
              tag:tags,
              postedById: parseInt('6'),
              img:imgUrl,
              hourPerSession:parseInt("2")
            },
          }),
          {
            loading: 'Creating new post..',
            success: 'Post successfully created!🎉',
            error: `Something went wrong 😥 Please try again. ${error}`,
          }
        );
      } catch (error) {
        console.error(error);
      }}
          
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>,fileImg:File|undefined)=>{
      e.preventDefault();
      if(props.operationType===Operation.CREATE){
        handleSubmitCreatePost(fileImg);
        return;
      }
      handleSubmitUpdatePost(fileImg);
      return;
    }
    const addTag = (target:string)=>{
        if(target=="")return
        const exist = tags.indexOf(target.toLowerCase())
        if(exist!==-1) return
        else{
          setTags(tags=>[...tags, target.toLowerCase()])
        }
      }

    const handleSuggestionClick = (suggestion:string)=>{
        addTag(suggestion)
        setTagInput('')
      }

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        if (key === ',' || key === 'Enter') {
          e.preventDefault();
          addTag(tagInput);
          setTagInput('');
        } 
    }, [tagInput, suggestions]);

    const handleTagInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const InputValue = e.target.value;
      setTagInput(InputValue);
      const sugList = TAGS.filter(tag => tag.startsWith(InputValue));
      setSuggestions(sugList);
    }, [tagInput]);
    
    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
      const file = e.target.files?.[0];
      console.log("File is :",file)
      if (!file) return;
      
      const fileSize = file.size / 1024; // in KB
      if (fileSize > 1024) { // 1 MB
        toast.error('File size should not exceed 1 MB');
        return;
      }
    setFileImg(file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    }

    const handleDelete = (target: string) =>{
      const filteredTags = tags.filter(tag=>tag!==target)
      setTags(filteredTags)
    }
  return (
    <form className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg" onSubmit={e=>handleSubmit(e, fileImg)}>
      <label className="block">
      <span className="text-gray-700">Post Cover</span>
      <Input
        className="border h-30vh border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
        placeholder="Drop your image here"
        onChange={e=>handleImageChange(e)}
        name="cover"
        type="file"
        accept="image/*"
      />
       {image && (
        <div className="relative">
          <img src={image} alt="uploaded image" />
          <button
            className="absolute top-0 right-0 bg-gray-500 rounded-full p-1 text-white hover:bg-gray-600 focus:outline-none"
            onClick={e=>setImage("")}
          >
            <RxCrossCircled className="h-5 w-5" />
          </button>
        </div>
      )}
       </label>
    <label className="block">
      <span className="text-gray-700">Title</span>
      <Input
        
        placeholder="Title of your tutor .eg: Private 1-1 High School Math Class By A Senior Math Lecturer"
        required
        onChange={(e)=>setTitle(e.target.value)}
        name="title"
        type="text"
        value={title}
      />
    </label>
    <label className="block">
      <span className="text-gray-700">Description</span>
      <RichTextEditor setDesc={setDesc} initialValue={props.post?.description?props.post?.description:'<p>Write details about your tutor session</p>'} /> 
    </label>
    <label className="block">
      <span className="text-gray-700">Tags</span>
      <div className="flex flex-row flex-wrap w-full gap-2 mt-4 mb-1">
        {tags.map((tag,i)=><TagItem inputType={true} onDelete={handleDelete} key={i} text={tag}/>)}
        </div>
      <Input
         
        placeholder="math"
        onChange={e=>handleTagInputChange(e)}
        onKeyDown={e=>handleKeyDown(e)}
        value={tagInput}
        name="tag"
        type="text"
      />      

      {/*Provide tags suggestions dropdown based on user Input*/}
       {tagInput&&suggestions.map((tag,i)=><SuggestionTag key={i} text={tag} handleClick={handleSuggestionClick} />)}
      
    </label>
    
    <label className="block">
      <span className="text-gray-700">Mode</span>
      <select
        placeholder="Class Mode"
        name="mode"
        required
        value={mode}
      >
        <option onClick={e=>setMode(Mode.ONLINE)} >ONLINE</option>
        <option onClick={e=>setMode(Mode.IN_PERSON)} >IN-PERSON</option>
        <option onClick={e=>setMode(Mode.BOTH)} >BOTH</option>
      </select>
    </label>
    
    <label className="block"> 

    {/* Check the class mode and display suitable price Input */ }
      
        <span className="text-gray-700">Price Per Session($)</span>
        <Input
           value={price}
          name="price"
          type="number" 
          required
          min="0.01"
          step="0.01"
          defaultValue={0.01}
          onChange={e=>setPrice([e.target.value.toString()])}
        />
      
    </label>
    

    <label className="block">
      <span className="text-gray-700">Contact Number</span>
      <Input
        placeholder="eg:+60123456789"
        onChange={e=>setHp(e.target.value)}
        name="tel"
        type="tel"
        value={hp}
      />
      <span className="text-gray-700">Contact Email</span>
      <Input
      
        value={email}
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
    {props.operationType===Operation.CREATE?'Creating':'Updating'}
        </span>
      ) : (
        <span>{props.operationType===Operation.CREATE?'Create Post':'Update Post'}</span>
      )}
    </Button>
  </form>
  )
}

export default FormInput