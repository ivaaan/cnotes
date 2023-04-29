import { Request, Response } from 'express';
import * as google from './google';

export const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await google.getData();
    res.status(200).json(data);
    // return data;
  } catch (e) {
    res.status(500);
  }
};

// module.exports = { get };
