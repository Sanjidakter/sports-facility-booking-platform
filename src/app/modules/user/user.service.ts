import { User } from './user.model';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../../config';

export const registerUser = async (userData: IUser) => {
  const user = new User(userData);
  await user.save();
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret);
  return { user, token };
};
