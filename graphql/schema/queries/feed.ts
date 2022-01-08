import {
  queryField,
  list,
  stringArg,
  nonNull,
  inputObjectType,
  enumType,
} from 'nexus';
import { Feed } from '../object-types';
import { Prisma } from '@prisma/client';

const PaginationInput = inputObjectType({
  name: 'PaginationInput',
  definition(t) {
    t.nonNull.int('take');
    t.int('skip');
  },
});

const Sort = enumType({
  name: 'Sort',
  members: ['asc', 'desc'],
});

const LinkOrderByInput = inputObjectType({
  name: 'LinkOrderByInput',
  definition(t) {
    t.field('description', { type: Sort });
    t.field('url', { type: Sort });
    t.field('createdAt', { type: Sort });
  },
});

export const feed = queryField('feed', {
  type: Feed,
  args: {
    filter: stringArg(),
    pagination: PaginationInput.asArg(),
    orderBy: list(nonNull(LinkOrderByInput)),
  },
  async resolve(_parent, { filter, pagination, orderBy }, ctx) {
    const where = filter
      ? {
          OR: [
            { description: { contains: filter } },
            { url: { contains: filter } },
          ],
        }
      : {};
    const links = await ctx.prisma.link.findMany({
      where,
      take: pagination?.take,
      skip: pagination?.skip as number | undefined,
      orderBy: orderBy as
        | Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput>
        | undefined,
    });
    const count = await ctx.prisma.link.count({ where });
    return {
      links,
      count,
    };
  },
});
