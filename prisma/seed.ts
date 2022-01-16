import { prisma } from '../utils/prisma';

export const seedDatabase = async () => {
  await prisma.user.deleteMany();
  await prisma.link.deleteMany();
  await prisma.link.createMany({
    data: [
      {
        description: 'My favourite blog',
        url: 'https://waitbutwhy.com',
      },
      {
        description: 'Reddit is about to go public',
        url: 'https://reddit.com/',
      },
      {
        description: 'Great code editor',
        url: 'https://code.visualstudio.com/',
      },
      {
        description: 'The inspiration behind hacker forums',
        url: 'https://news.ycombinator.com/',
      },
      {
        description: 'Tailwind was used to style hacker forums',
        url: 'https://tailwindcss.com/',
      },
      {
        description: 'Prisma was used as hacker forums orm',
        url: 'https://www.prisma.io/blog/',
      },
    ],
  });
};
