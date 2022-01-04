import { PrismaClient } from ".prisma/client";
import { NextApiRequest } from 'next'
import { decodeAuthHeader } from "../utils/auth";
export interface Context {
  prisma: PrismaClient,
  userId?: number
}

const prisma = new PrismaClient()

export const context = ({ req }:{ req: NextApiRequest }): Context => {
  const token = req && req.headers.authorization
    ? decodeAuthHeader(req.headers.authorization)
    : null
  return {
    prisma,
    userId: token?.userId
  }
}
