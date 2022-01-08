import { intArg, mutationField, nonNull } from 'nexus';
import { Vote } from '..';
import { User } from '@prisma/client';

export const vote = mutationField('vote', {
  type: Vote,
  args: { linkId: nonNull(intArg()) },
  async resolve(_parent, { linkId }, ctx) {
    const { userId } = ctx;
    if (!userId) {
      throw new Error('Cannot vote without logging in');
    }
    const link = await ctx.prisma.link.update({
      where: { id: linkId },
      data: {
        voters: {
          connect: {
            id: userId,
          },
        },
      },
    });
    const user = await ctx.prisma.user.findUnique({ where: { id: userId } });
    return {
      link,
      user: user as User,
    };
  },
});
