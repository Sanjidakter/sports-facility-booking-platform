// src/services/booking.service.ts
import { Booking } from "./booking.model";
import { IBooking } from "./booking.interface";
import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";

export const createBooking = async (
  bookingData: Partial<IBooking>
): Promise<IBooking> => {
  const facility = await Facility.findById(bookingData.facility);
  if (!facility) {
    throw new Error("Facility not found");
  }

  if (!bookingData.date || !bookingData.startTime || !bookingData.endTime) {
    throw new Error('Date, startTime, and endTime must be provided.');
  }
  
  // Convert startTime and endTime to Date objects based on the provided date
  const date = new Date(bookingData.date);
  const startTime = new Date(date);
  const endTime = new Date(date);

  const [startHour, startMinute] = bookingData.startTime.split(":").map(Number);
  const [endHour, endMinute] = bookingData.endTime.split(":").map(Number);

  startTime.setHours(startHour, startMinute);
  endTime.setHours(endHour, endMinute);

  const durationInHours =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  const payableAmount = durationInHours * facility.pricePerHour;

  const booking = new Booking({
    ...bookingData,
    startTime,
    endTime,
    payableAmount,
    user: bookingData.user,
  });

  return booking.save();
};

export const checkAvailability = async (date: string) => {
  const bookings = await Booking.find({ date });

  const bookedSlots = bookings.map((booking) => ({
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));

  // Define the total available slots for the day (assuming the facility is available from 8:00 AM to 8:00 PM)
  const totalSlots = [
    { startTime: "08:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "18:00" },
    { startTime: "18:00", endTime: "20:00" },
  ];

  // Filter the available slots by removing the booked slots
  const availableSlots = totalSlots.filter((slot) => {
    return !bookedSlots.some((bookedSlot) => {
      return (
        slot.startTime === bookedSlot.startTime &&
        slot.endTime === bookedSlot.endTime
      );
    });
  });

  return availableSlots;
};

export const getAllBookings = async () => {
  const bookings = await Booking.find().populate("facility").populate("user");
  if (bookings.length === 0) {
    throw new Error("NoDataFound");
  }
  return bookings;
};

export const getBookingsByUser = async (
  userId: string
): Promise<IBooking[]> => {
  return Booking.find({ user: userId }).populate("facility");
};

export const cancelBooking = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId).populate("facility");
  if (!booking) {
    throw new Error("Booking not found");
  }

  booking.isBooked = "canceled";
  return booking.save();
};
