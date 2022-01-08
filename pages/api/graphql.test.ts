import { schema } from '../../graphql/nexus-schema';
import { context } from '../../graphql/context';
import { ApolloServer } from 'apollo-server-micro'

const testServer = new ApolloServer({
  schema,
  context
})

describe("Hacker News api tests", () => {
  it('should check 1 is 1', async () => {
    const result = await testServer.executeOperation
    expect(1).toBe(1);
  });
});
