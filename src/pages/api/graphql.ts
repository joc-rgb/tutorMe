import { createYoga} from "graphql-yoga";
import { schema } from "../../graphql/schema";
import { createContext } from "../../graphql/context";
import type { NextApiRequest, NextApiResponse } from 'next'

export default createYoga<{req:NextApiRequest, res:NextApiResponse}>({
    schema,
    graphqlEndpoint: '/api/graphql',
    context: createContext
})

export const config = {
    api: {
      bodyParser: false
    }
  }