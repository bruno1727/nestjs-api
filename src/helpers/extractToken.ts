import { Request } from 'express';
export default function extractToken(req: Request): string {
  return req.headers.authorization?.replace('Bearer ', '') || '';
}
