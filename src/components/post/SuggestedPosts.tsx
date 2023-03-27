import React from 'react'
import { similarPostQuery } from '../../graphql/operations/post'
import { useQuery } from '@apollo/client'
import Loader from '../global/Loader'
import DataCard from './DataCard'
import { IPost } from '../../constant'

interface ISuggestedPosts{
    postId: number
    tag: string
}
const SuggestedPosts = (props:ISuggestedPosts) => {
    const {data, loading, error} = useQuery(similarPostQuery,{
        variables: {tag:props.tag, postId:props.postId}
    })

    if (loading) {
        return (
          <div className="flexStart min-h-screen">
            <Loader className='w-96 h-96' />
          </div>
        );
      }
      if (!loading&&!data?.post) {
        return <></>;
      }
      const posts:IPost[] = data.posts
  return (
    <div className='flex flex-col p-20'>{posts.map((p,i)=><DataCard data={p} key={i}/>)}</div>
  )
}

export default SuggestedPosts