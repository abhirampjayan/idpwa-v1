// pages/api/users/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '../../../server/middlewares/authMiddleware';
import { userController } from '../../../server/controllers/userController';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authMiddleware(req, res, async () => {
    const session = await getServerSession(req, res, authOptions);
    switch (req.method) {
      case 'POST':
        return userController.createUser(req, res);
      case 'GET':
        console.log(session?.user);

        return userController.getUser(req, res, session?.user?.id);
      default:
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
