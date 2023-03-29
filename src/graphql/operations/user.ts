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

export const getUserInfoByEmail = gql`
query getUserByEmail(
  $email: String!
){
    getUserByEmail(email: $email){
        id
        name
        expertiseIn
        about
        phoneNumber
        location
        highestEducationLvl
        posts{
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
            email
            name
          }
          createdAt
        }
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

export const updateUserMutation = gql`
  mutation updateUser(
    $email:String!
    $expertiseIn:[String!]!
    $about: String!
    $highestEducationLvl: String!
    $location: String!
  ){
    updateUser(
      email:$email
      expertiseIn: $expertiseIn
      about: $about
      highestEducationLvl: $highestEducationLvl
      location: $location
    ){
      email
      expertiseIn
      about
      location
      highestEducationLvl
    }
  }
`

