import { prisma } from '../utils/prisma';

export const seedDatabase = async () => {
  await prisma.user.deleteMany();
  await prisma.link.deleteMany();
  await prisma.link.createMany({
    data: [
      {
        description: 'great blog',
        url: 'www.waitbutwhy.com',
      },
      {
        description: 'great code editor',
        url: 'https://code.visualstudio.com/',
      },
      {
        description: 'great forum',
        url: 'https://news.ycombinator.com/',
      },
    ],
  });
};
