import { mutationField, nonNull, inputObjectType } from "nexus"
import { Link } from '../object-types'

const UpdateLinkInput = inputObjectType({
  name: 'UpdateLinkInput',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('description')
    t.nonNull.string('url')
  }
})

export const updateLink = mutationField('updateLink', {
  type: Link,
  args: { data: nonNull(UpdateLinkInput) },
  resolve(_parent, { data }, ctx) {
    const { userId } = ctx
    if (!userId) {
      throw new Error('must be logged in to update posts')
    }

    return ctx.prisma.link.update({
      where: {
        id: data.id,
      },
      data: {
        ...data
      }
    })
  }
})