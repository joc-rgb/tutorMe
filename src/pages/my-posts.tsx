import Loader from '../components/global/Loader';
import {useQuery } from '@apollo/client';
import { getUserByEmailQuery } from '../graphql/operations/user';
import { useUser } from '@auth0/nextjs-auth0/client';
import { GetServerSideProps } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

const MyPosts = () => {
    const {user}= useUser()
    
    const {loading,data,error} = useQuery(getUserByEmailQuery,{
        variables: {email: user?.email}
    })
    if (error) {
        return <div>Error: {error.message}</div>;
      }
    if (loading) {
        return (
          <div className="flexStart min-h-screen">
            <Loader className='w-96 h-96' />
          </div>
        );
      }
  return (
    <div>
        <p>MyPost</p>
        {data!==undefined&&<p onClick={()=>console.log(data)}>Cickc</p>}
    </div>
  )
}

export default MyPosts

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