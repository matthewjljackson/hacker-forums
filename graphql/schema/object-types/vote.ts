import { objectType } from "nexus";
import { Link, User } from ".";

export const Vote = objectType({
  name: 'Vote',
  definition(t) {
    t.nonNull.field('link', { type: Link })
    t.nonNull.field('user', { type: User })
  }
})