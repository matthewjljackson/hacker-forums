import * as jwt from 'jsonwebtoken';

export const APP_SECRET = 'super-secret-encryption';

export interface AuthTokenPayload {
  userId: number;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    throw new Error('no token found');
  }
  return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}
