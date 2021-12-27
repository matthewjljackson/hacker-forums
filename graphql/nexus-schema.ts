import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './schema'

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(),"graphql","generated","schema.graphql"),
    typegen: join(process.cwd(),"graphql","generated","nexus-typegen.ts")
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(),"graphql","context.ts")
  }
})