import * as jwt from 'jsonwebtoken';

export const APP_SECRET = 'super-secret-encryption';

export interface AuthTokenPayload {
  userId: number;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  console.log(authHeader);
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    throw new Error('no token found');
  }
  console.log(token);
  const x = jwt.verify(token, APP_SECRET) as AuthTokenPayload;
  console.log('x', x);
  return x;
}
