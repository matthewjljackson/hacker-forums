import { decodeAuthHeader } from '../utils/auth';
import { PrismaClient } from '.prisma/client';
import { NextApiRequest } from 'next';
import { prisma } from '../utils/prisma';

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

export interface ContextArgs {
  req: NextApiRequest;
}

export const context = ({ req }: ContextArgs): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;
  return {
    prisma,
    userId: token?.userId,
  };
};
