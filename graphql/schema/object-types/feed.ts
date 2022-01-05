import { objectType } from "nexus";
import { Link } from ".";

export const Feed = objectType({
  name: 'Feed',
  definition(t) {
    t.nonNull.list.nonNull.field('links', { type: Link})
    t.nonNull.int('count')
  }
})