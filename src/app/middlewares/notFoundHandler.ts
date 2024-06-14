import { Request, Response, NextFunction } from 'express';

/* eslint-disable @typescript-eslint/no-unused-vars */
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Not Found'
  });
};

export default notFoundHandler;
