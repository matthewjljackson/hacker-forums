import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../graphql/nexus-schema';
import { context } from '../../graphql/context';
import type { NextApiRequest, NextApiResponse } from 'next';
const cors = require('micro-cors')();

const apolloServer = new ApolloServer({
  schema,
  context,
});

const startServer = apolloServer.start();

export default cors(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
