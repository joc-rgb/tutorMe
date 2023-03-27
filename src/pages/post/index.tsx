import { GetServerSideProps, NextPage } from "next";
import apolloClient from "../../lib/apollo";
import { allPostsQuery } from "../../graphql/operations/post";

import React from 'react'
import DataCard from "../../components/post/DataCard";
import { IPost } from "../../constant";

const Posts:NextPage<{posts:IPost[]}> = ({posts}) => {
  return (
    <div className='w-full min-h-100vh items-center'>
        <p className='font-semibold'>Latest Postings</p>
      {posts.map((post) => (
        <DataCard key={post.id} data={post} />
      ))}
 
    </div>
  )
}

export default Posts

export const getServerSideProps: GetServerSideProps = async () => {
    const firstPostAmount = 8;
    const { data } = await apolloClient.query({
        query: allPostsQuery,
        variables: { first: firstPostAmount },
    });

  return {
    props: {
      initialPosts: data.posts.edges.map(({ node }: { node: IPost }) => node),
      hasNextPage: data.posts.pageInfo.hasNextPage,
      endCursor: data.posts.pageInfo.endCursor,
    },
  };
};





