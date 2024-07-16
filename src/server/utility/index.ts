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
export const controllerAction = (
  action: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await action(req, res);
    } catch (error) {
      sendErrorResponse(res, error, 'An error occurred');
    }
  };
};
