import { objectType } from 'nexus'
import { User } from './user'

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('description')
    t.nonNull.string('url')
    t.int('postedById')
    t.field('postedBy', {
      type: User,
      resolve(parent, _args, ctx) {
        return ctx.prisma.link.findUnique({ 
          where: { id: parent.id }
        }).postedBy()
      }
    })
    t.nonNull.list.nonNull.field('voters', {
      type: User,
      resolve(parent, _args, ctx) {
        return ctx.prisma.link.findUnique({
          where: { id: parent.id }
        }).voters()
      }
    })
  }
})