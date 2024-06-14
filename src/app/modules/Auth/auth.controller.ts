// src/app/modules/auth/auth.controller.ts
import { Request, Response } from 'express';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import { generateToken } from './auth.service';
import { signUpSchema, loginSchema } from './auth.validation';

export const signUp = async (req: Request, res: Response) => {
  try {
    const parsedData = signUpSchema.parse(req.body);
    const { name, email, password, phone, role, address } = parsedData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      address,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsedData = loginSchema.parse(req.body);
    const { email, password } = parsedData;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      token,
      data: user,
    });
  }catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
};
