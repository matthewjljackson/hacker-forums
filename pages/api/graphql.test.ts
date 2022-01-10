/* eslint-disable no-undef */

import { schema } from '../../graphql/nexus-schema';
import { context } from '../../graphql/context';
import { ApolloServer } from 'apollo-server-micro';
import { seedDatabase } from '../../prisma/seed';

const testServer = new ApolloServer({
  schema,
  context,
});

testServer.start;
testServer.stop;

describe('Hacker News api tests', () => {
  beforeAll(async (): Promise<void> => {
    await seedDatabase();
  });

  it('should return the feed', async () => {
    const result = await testServer.executeOperation({
      query: `query Query {
        feed {
          count
          links {
            description
            url
          }
        }
      }`,
    });
    console.log(result.data);
    expect(result.data).toEqual({
      feed: {
        count: 3,
        links: [
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
      },
    });
  });
});
