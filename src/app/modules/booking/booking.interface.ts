// src/interfaces/booking.interface.ts
import { Types } from 'mongoose';

export interface IBooking {
  user: Types.ObjectId;
  facility: Types.ObjectId;
  date: Date;
  startTime: Date;
  endTime: Date;
  payableAmount: number;
  isBooked: 'confirmed' | 'pending' | 'canceled';
}
