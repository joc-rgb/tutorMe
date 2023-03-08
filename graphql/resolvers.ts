import { users } from "../src/constant"

export const resolvers = {
    Query:{
        users:()=>{
            return users
        }
    }
}