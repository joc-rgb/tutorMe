import { builder } from "./builder";
import "./types/User"
import "./types/Post"
export const schema = builder.toSchema()


// export const typeDefs = `
//     type User {
//         username: String
//         email: String
//         location: String
//         about: String
//         expertiseIn: [String]
//         highestEducationLvl: String
//     }

//     type Query{
//         users: [User]!
//     }
// `