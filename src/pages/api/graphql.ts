import { createYoga} from "graphql-yoga";
import { schema } from "../../graphql/schema";
import { createContext } from "../../graphql/context";

export default createYoga<{req:Request, res:Response}>({
    schema,
    graphqlEndpoint: '/api/graphql',
    context: createContext
})

export const config = {
    api: {
      bodyParser: true
    }
  }