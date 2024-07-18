// server/middlewares/authMiddleware.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export async function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });
  await next();
}
