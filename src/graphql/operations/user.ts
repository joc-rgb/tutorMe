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
  query post($id: ID!){
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
export const updateUser = gql`
  mutation updateUser(
    $id:ID!
    $expertiseIn:[String!]!
    $about: String!
    $highestEducationLvl: String!
    $location: String!
    $phoneNumber: String!
  ){
    updateUser(
      id:$id
      expertiseIn: $expertiseIn
      about: $about
      highestEducationLvl: $highestEducationLvl
      location: $location
      phoneNumber: $phoneNumber
    ){
      id
      expertiseIn
      about
      phoneNumber
      location
      highestEducationLvl
    }
  }
`