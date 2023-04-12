import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import {prisma} from "../lib/prisma";
import { createContext } from "./context"; 
import { DateResolver } from "graphql-scalars";
import RelayPlugin from '@pothos/plugin-relay';

export const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes,Context: ReturnType<typeof createContext>, Scalars: {
  Date: { Input: Date; Output: Date };
}; }>({
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {},
    prisma: {
        client: prisma,
    },
    
})
builder.addScalarType("Date", DateResolver, {});
builder.queryType({
    fields: (t) => ({
      ok: t.boolean({
        resolve: () => true,
      }),
    }),
  });

  builder.mutationType({})