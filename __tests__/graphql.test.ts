/* eslint-disable */

import { schema } from '../graphql/nexus-schema';
import { context } from '../graphql/context';
import { ApolloServer } from 'apollo-server-micro';
import { seedDatabase } from '../prisma/seed';
import { GraphQLResponse } from 'apollo-server-types';

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

  it('should return a single link', async () => {
    const linkIds = await testServer.executeOperation({
      query: `query Query {
        feed {
          links {
            id
          }
        }
      }`,
    });
    let id: number = 1;
    if (linkIds.data) {
      id = linkIds.data.feed.links[0].id;
    }
    const result = await testServer.executeOperation({
      query: `query Link($linkId: Int!) {
        link(id: $linkId) {
          description
          url
        }
      }`,
      variables: {
        linkId: id,
      },
    });
    expect(result.data).toEqual({
      link: {
        description: 'great blog',
        url: 'www.waitbutwhy.com',
      },
    });
  });
});
