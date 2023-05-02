import { Request, Response } from 'express';
import { getData } from './google';


export const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getData();
    res.status(200).json(data);
    // return data;
  } catch (e) {
    res.status(500);
  }
};

// module.exports = { get };
