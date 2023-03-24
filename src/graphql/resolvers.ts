import prisma from "../lib/prisma"
export const resolvers = {
    Query:{
        posts:()=>{
            return prisma.post.findMany()
        }
    }
}