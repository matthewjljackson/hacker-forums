import { PrismaClient } from ".prisma/client";

export interface Context {
  prisma: PrismaClient
}

const prisma = new PrismaClient()

export const context: Context = {
  prisma: prisma
}
// @ts-ignore
export async function createContext({ req, res }): Promise<Context> {
  return {
    prisma,
  }
}