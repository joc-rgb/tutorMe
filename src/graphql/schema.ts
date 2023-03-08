import { builder } from "./builder";

export const schema = builder.toSchema()

//Pothos generate GraphQL schema for Us!
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