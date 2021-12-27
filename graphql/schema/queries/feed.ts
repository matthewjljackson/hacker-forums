import { queryField, list } from 'nexus'
import { Link } from '../object-types'

export const feed = queryField('feed',{
  type: list(Link),
  resolve(_parent,_args,ctx) {
    return ctx.prisma.link.findMany()
  }
})