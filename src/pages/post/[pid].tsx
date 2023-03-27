import React from 'react'
import { useRouter } from 'next/router';
import { postQuery, similarPostQuery } from '../../graphql/operations/post';
import { useQuery } from '@apollo/client';
import Loader from '../../components/global/Loader';
import PostDetail from '../../components/post/PostDetail';
import SuggestedPosts from '../../components/post/SuggestedPosts';
import { IPost } from '../../constant';

const PostPage = () => {
    const postId = useRouter().query.pid
    console.log(postId)
    const { loading, error, data} = useQuery(postQuery, {
        variables: { id: parseInt(postId as string) as number}
      });

      if (loading) {
        return (
          <div className="flexStart min-h-screen">
            <Loader className='w-96 h-96' />
          </div>
        );
      }
      if (!loading&&!data) {
        return <p>Error 404</p>;
      }
      const post:IPost = data.post
    return (
      <div className="flex flex-col gap-10">
      <PostDetail post={post} />
      <SuggestedPosts postId={post.id} tag={post.tag[0]}/> 
    </div>
      
    )
}

export default PostPage
