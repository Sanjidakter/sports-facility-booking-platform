// src/interfaces/booking.interface.ts
import { Types } from 'mongoose';

export interface IBooking {
  user: Types.ObjectId;
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  payableAmount: number;
  isBooked: 'confirmed' | 'pending' | 'canceled';
}
