import { gql } from "@apollo/client";

export const getUserByEmailQuery = gql`
    query getUserByEmail(
      $email: String!
    ){
        getUserByEmail(email: $email){
            id
        }
    }
`

export const getUserPostsByEmail = gql`
    query getUserPostsByEmail(
        $email:String!
    ){
        getUserPostsByEmail(email:$email){
            posts
        }
    }
`

export const myPostQuery = gql`
  query post($id: ID){
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