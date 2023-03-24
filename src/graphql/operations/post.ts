import { gql } from "@apollo/client";

export const allPostsQuery = gql`
  query posts($first: Int, $after: ID) { 
    posts(first:$first, after:$after) { 
      pageInfo {
        endCursor
        hasNextPage
      }

      edges{
        cursor
        node{
          id
          title
          description
          pricePerSession
          hourPerSession
          tag
          img
          tutorMode
          contact
          postedById
          postedBy{
            id
            name
            email
          }
          createdAt
        }
      }
      
  }}
`

export const postQuery = gql`
  query post($id: Int!){
    post(id: $id){
      id
      title
      description
      pricePerSession
      tag
      img
      tutorMode
      contact
      postedById
      postedBy{
        id
        name
        email
      }
      createdAt
    }
  }
`

export const similarPostQuery = gql`
  query similarPosts($tag: String!, $postId:ID){
    similarPost(tag:$category, postId:$postID){
      posts {
      
        id
        title
        description
        pricePerSession
        tag
        img
        tutorMode
        contact
        postedById
        postedBy{
          id
          name
          email
        }
        createdAt
      }
    }
  }
`

export const createPostMutation = gql`
    mutation createPost(
      $title: String!
      $description: String!
      $pricePerSession: [Float!]!
      $tutorMode: Mode!
      $contact: [String!]!
      $postedById: Int!
      $hourPerSession: Int!
      $tag: [String!]!
      $img: String
    ) {
      createPost(
        title: $title
        description: $description
        pricePerSession: $pricePerSession
        tutorMode: $tutorMode
        contact: $contact
        postedById: $postedById
        tag: $tag
        img: $img
        hourPerSession: $hourPerSession
      ) {
        id
        title
        description
        pricePerSession
        hourPerSession
        tutorMode
        contact
        postedById
        tag
        img
      }
    }
  `;

export const updatePostMutation = gql`
mutation updatePost(
  $id: ID!
  $title: String!
  $description: String!
  $pricePerSession: [Float!]!
  $tutorMode: Mode!
  $contact: [String!]!
  $hourPerSession: Int!
  $tag: [String!]!
  $img: String
) {
  updatePost(
    id: $id
    title: $title
    description: $description
    pricePerSession: $pricePerSession
    tutorMode: $tutorMode
    contact: $contact
    tag: $tag
    img: $img
    hourPerSession: $hourPerSession
  ) {
    id
    title
    description
    pricePerSession
    hourPerSession
    tutorMode
    contact
    tag
    img
  }
}
`;