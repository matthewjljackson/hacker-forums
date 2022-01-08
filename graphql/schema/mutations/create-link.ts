import { inputObjectType, mutationField, nonNull } from 'nexus';
import { Link } from '../object-types';

const CreateLinkInput = inputObjectType({
  name: 'CreateLinkInput',
  definition(t) {
    t.nonNull.string('description');
    t.nonNull.string('url');
  },
});

export const createLink = mutationField('createLink', {
  type: Link,
  args: { data: nonNull(CreateLinkInput) },
  async resolve(_parent, { data }, ctx) {
    const { description, url } = data;
    const { userId } = ctx;
    if (!userId) {
      throw new Error('cannot post without logging in');
    }
    const newLink = await ctx.prisma.link.create({
      data: {
        description,
        url,
        postedBy: { connect: { id: userId } },
      },
    });
    return newLink;
  },
});
