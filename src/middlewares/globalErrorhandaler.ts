import express, { NextFunction, Request, Response, request } from "express";

 const globalErrorHandaler =(err: any, req: Request, res: Response, next: NextFunction) => {
    // setting global error handler
    let statusCode = 500;
    let message = err.message || "something went wrong!";
  
    return res.status(statusCode).json({
      success: false,
      message,
      error: err,
    });
  }

  export default globalErrorHandaler;