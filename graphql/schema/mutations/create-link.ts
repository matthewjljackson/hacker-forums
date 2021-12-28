import { inputObjectType, mutationField, nonNull } from 'nexus'
import { Link } from '../object-types'

const CreateLinkInput = inputObjectType({
  name: 'CreateLinkInput',
  definition(t) {
    t.nonNull.string('description')
    t.nonNull.string('url')
  }
})

export const createLink = mutationField('createLink', {
  type: Link,
  args: {data: nonNull(CreateLinkInput) },
  resolve(_parent, { data }, ctx) {
    return ctx.prisma.link.create({
      data: {
        ...data
      }
    })
  }
})