import { PrismaClient } from '@prisma/client';

export const seedDatabase = async () => {
  const prisma = new PrismaClient();
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
