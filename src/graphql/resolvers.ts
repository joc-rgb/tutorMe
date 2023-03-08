import { users } from "../constant"

export const resolvers = {
    Query:{
        users:()=>{
            return users
        }
    }
}