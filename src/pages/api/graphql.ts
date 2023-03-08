import { createYoga, createSchema } from "graphql-yoga";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schema";

export default createYoga<{req:Request, res:Response}>({
    schema:createSchema({typeDefs, resolvers}),
    graphqlEndpoint: '/api/graphql'
})

export const config = {
    api: {
      bodyParser: false
    }
  }