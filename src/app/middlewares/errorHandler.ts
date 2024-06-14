import { Request, Response, NextFunction } from 'express';

/* eslint-disable @typescript-eslint/no-unused-vars */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: err.message
  });
};

export default errorHandler;
