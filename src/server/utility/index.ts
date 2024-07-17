import { NextApiRequest, NextApiResponse } from 'next';

// Utility function for sending error responses
export const sendErrorResponse = (
  res: NextApiResponse,
  error: any,
  message: string
) => {
  console.error(message, error);
  res.status(500).json({ error: message });
};

// Higher-order function for wrapping controller actions
// Assuming controllerAction is defined in a utility file
export function controllerAction<T extends any[]>(
  action: (
    req: NextApiRequest,
    res: NextApiResponse,
    ...args: T
  ) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse, ...args: T) => {
    try {
      await action(req, res, ...args);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
