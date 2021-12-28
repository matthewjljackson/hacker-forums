import { intArg, nonNull, queryField } from 'nexus'
import { Link } from '../object-types'

export const link = queryField('link', {
  type: Link,
  args: { id: nonNull(intArg()) },
  resolve(_parent, { id }, ctx) {
    return ctx.prisma.link.findUnique({
      where: {
        id
      }
    })
  }
})