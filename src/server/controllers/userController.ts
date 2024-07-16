import { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../services/UserService';

export const userController = {
  async createUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const {
        uid,
        phoneNumber,
        alternatePhoneNumber,
        isNewUser,
        email,
        name,
        age,
        firmName,
        firmAddress,
        HomeAddress,
        taluk,
        district,
        state,
        FatherName,
        MotherName,
        HusbandName,
      } = req.body;
      const user = await userService.createUser({
        uid,
        phoneNumber,
        alternatePhoneNumber,
        isNewUser,
        email,
        name,
        age,
        firmName,
        firmAddress,
        HomeAddress,
        taluk,
        district,
        state,
        FatherName,
        MotherName,
        HusbandName,
      });
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  },

  async getUser(req: NextApiRequest, res: NextApiResponse, userId: string) {
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'Error getting user' });
    }
  },
};
