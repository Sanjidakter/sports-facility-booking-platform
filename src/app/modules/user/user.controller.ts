import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser } from "./user.service";
import { userSignupSchema, userLoginSchema } from "./user.validation";
import errorHandler from "../../middlewares/errorHandler";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = userSignupSchema.parse(req.body);
    const user = await registerUser(userData);

    // Destructure the user object and exclude the password field
    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    errorHandler(error as Error, req, res, next);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = userLoginSchema.parse(req.body);
    const { user, token } = await loginUser(email, password);

    // Destructure the user object and exclude the password field
    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      token,
      data: userWithoutPassword,
    });
  } catch (error) {
    errorHandler(error as Error, req, res, next);
  }
};
