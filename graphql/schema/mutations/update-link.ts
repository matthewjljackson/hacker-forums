import { mutationField, nonNull, inputObjectType } from "nexus"
import { Link } from '../object-types'

const UpdateLinkInput = inputObjectType({
  name: 'UpdateLinkInput',
  definition(t) {
    t.nonNull.int('id')
    t.string('description')
    t.string('url')
  }
})

export const updateLink = mutationField('updateLink', {
  type: Link,
  args: { data: nonNull(UpdateLinkInput) },
  resolve(_parent, { data }, ctx) {
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