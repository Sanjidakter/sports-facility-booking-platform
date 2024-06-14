import { Request, Response } from 'express';
import { registerUser, loginUser } from './user.service';
import { userSignupSchema, userLoginSchema } from './user.validation';

export const signup = async (req: Request, res: Response) => {
  try {
    const userData = userSignupSchema.parse(req.body);
    const user = await registerUser(userData);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = userLoginSchema.parse(req.body);
    const { user, token } = await loginUser(email, password);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      token,
      data: user
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
