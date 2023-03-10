import prisma from "../lib/prisma"
export const resolvers = {
    Query:{
        offers:()=>{
            return prisma.offer.findMany()
        }
    }
}