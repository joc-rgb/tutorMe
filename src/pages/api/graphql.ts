import { createYoga} from "graphql-yoga";
import { schema } from "../../graphql/schema";

export default createYoga<{req:Request, res:Response}>({
    schema,
    graphqlEndpoint: '/api/graphql'
})

export const config = {
    api: {
      bodyParser: false
    }
  }