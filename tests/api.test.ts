/* eslint-disable */
import { schema } from '../graphql/nexus-schema';
import { context } from '../graphql/context';
import { ApolloServer } from 'apollo-server-micro';
import { seedDatabase } from '../prisma/seed';

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
    expect(result.errors).toBeUndefined();
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
    let id = 1;
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
    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      link: {
        description: 'great blog',
        url: 'www.waitbutwhy.com',
      },
    });
  });

  it('should sign up correctly', async () => {
    const result = await testServer.executeOperation({
      query: `mutation Mutation($data: SignUpInput!) {
        signUp(data: $data) {
          user {
            name
            email
          }
        }
      }`,
      variables: {
        data: {
          email: 'email@email.com',
          password: 'password',
          name: 'barry',
        },
      },
    });
    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      signUp: {
        user: {
          name: 'barry',
          email: 'email@email.com',
        },
      },
    });
  });

  it('should login an existing user', async () => {
    const result = await testServer.executeOperation({
      query: `mutation Mutation($data: LoginInput!) {
        login(data: $data) {
          user {
            name
          }
        }
      }`,
      variables: {
        data: {
          email: 'email@email.com',
          password: 'password',
        },
      },
    });
    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      login: {
        user: {
          name: 'barry',
        },
      },
    });
  });

  it('should create a new link', async () => {
    const loggedInUser = await testServer.executeOperation({
      query: `mutation Mutation($data: LoginInput!) {
        login(data: $data) {
          token
        }
      }`,
      variables: {
        data: {
          email: 'email@email.com',
          password: 'password',
        },
      },
    });
    const result = await testServer.executeOperation(
      {
        query: `mutation Mutation($data: CreateLinkInput!) {
        createLink(data: $data) {
          description
          url
          postedBy {
            name
          }
        }
      }`,
        variables: {
          data: {
            description: 'my first post!',
            url: 'www.fakewebsite.com',
          },
        },
      },
      {
        req: {
          headers: {
            authorization: `Bearer ${loggedInUser.data?.login.token}`,
          },
        },
      }
    );
    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      createLink: {
        description: 'my first post!',
        url: 'www.fakewebsite.com',
        postedBy: {
          name: 'barry',
        },
      },
    });
  });

  it('should update an existing link', async () => {
    const loggedInUser = await testServer.executeOperation({
      query: `mutation Mutation($data: LoginInput!) {
        login(data: $data) {
          token
          user {
            links {
              id
            }
          }
        }
      }`,
      variables: {
        data: {
          email: 'email@email.com',
          password: 'password',
        },
      },
    });
    const result = await testServer.executeOperation(
      {
        query: `mutation UpdateLink($data: UpdateLinkInput!) {
        updateLink(data: $data) {
          description
          url
          postedBy {
            name
          }
        }
      }`,
        variables: {
          data: {
            description: 'my fake website!',
            url: 'www.fakewebsite.com',
            id: loggedInUser.data?.login.user.links[0].id,
          },
        },
      },
      {
        req: {
          headers: {
            authorization: `Bearer ${loggedInUser.data?.login.token}`,
          },
        },
      }
    );
    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      updateLink: {
        description: 'my fake website!',
        url: 'www.fakewebsite.com',
        postedBy: {
          name: 'barry',
        },
      },
    });
  });

  it('should delete an existing link', async () => {
    const loggedInUser = await testServer.executeOperation({
      query: `mutation Mutation($data: LoginInput!) {
        login(data: $data) {
          token
          user {
            links {
              id
            }
          }
        }
      }`,
      variables: {
        data: {
          email: 'email@email.com',
          password: 'password',
        },
      },
    });
    const result = await testServer.executeOperation(
      {
        query: `mutation DeleteLink($deleteLinkId: Int!) {
        deleteLink(id: $deleteLinkId) {
          description
          url
        }
      }`,
        variables: {
          deleteLinkId: loggedInUser.data?.login.user.links[0].id,
        },
      },
      {
        req: {
          headers: {
            authorization: `Bearer ${loggedInUser.data?.login.token}`,
          },
        },
      }
    );
    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      deleteLink: {
        description: 'my fake website!',
        url: 'www.fakewebsite.com',
      },
    });
  });
});
