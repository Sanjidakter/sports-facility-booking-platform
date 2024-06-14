// src/models/booking.model.ts
import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  facility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  payableAmount: { type: Number, required: true },
  isBooked: { type: String, enum: ['confirmed', 'pending', 'canceled'], default: 'pending' },
});

export const Booking = model<IBooking>('Booking', bookingSchema);
