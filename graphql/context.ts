import { decodeAuthHeader } from '../utils/auth';
import { PrismaClient } from '.prisma/client';
import { NextApiRequest } from 'next';

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

export interface ContextArgs {
  req: NextApiRequest;
}
const prisma = new PrismaClient();

export const context = ({ req }: any): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;
  return {
    prisma,
    userId: token?.userId,
  };
};
