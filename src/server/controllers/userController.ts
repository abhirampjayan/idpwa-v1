import { NextApiRequest, NextApiResponse } from 'next';
import { controllerAction } from '../utility';
import { userService } from '../services/userService';

export const userController = {
  createUser: controllerAction(
    async (req: NextApiRequest, res: NextApiResponse) => {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    }
  ),

  getUser: controllerAction(
    async (req: NextApiRequest, res: NextApiResponse) => {
      const { userId } = req.query;
      const user = await userService.getUserById(userId as string);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    }
  ),
};
