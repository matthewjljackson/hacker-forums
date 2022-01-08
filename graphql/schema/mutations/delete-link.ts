import { intArg, mutationField, nonNull } from 'nexus';
import { Link } from '../object-types';

export const deleteLink = mutationField('deleteLink', {
  type: Link,
  args: { id: nonNull(intArg()) },
  resolve(_parent, { id }, ctx) {
    const { userId } = ctx;
    if (!userId) {
      throw new Error('must be logged in to delete posts');
    }
    return ctx.prisma.link.delete({
      where: { id },
    });
  },
});
