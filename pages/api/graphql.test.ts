/* eslint-disable no-undef */

import { schema } from '../../graphql/nexus-schema';
import { context } from '../../graphql/context';
import { ApolloServer } from 'apollo-server-micro';

const testServer = new ApolloServer({
  schema,
  context,
});

testServer.start;
testServer.stop;

describe('Hacker News api tests', () => {
  it('should check 1 is 1', async () => {
    expect(1).toBe(1);
  });
});
