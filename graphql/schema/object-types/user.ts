import { objectType } from "nexus";
import { Link } from './link'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.list.field('links', {
      type: Link,
      resolve(parent,_args,ctx) {
        return ctx.prisma.user.findUnique({
          where: { id: parent.id }
        }).links()
      }
    })
  }
})