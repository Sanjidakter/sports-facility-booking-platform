// src/controllers/booking.controller.ts
import { Request, Response } from "express";
import {
  createBooking,
  checkAvailability,
  getAllBookings,
  getBookingsByUser,
  cancelBooking,
} from "./booking.service";

export const addBooking = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const bookingData = { ...req.body, user: userId };
    const booking = await createBooking(bookingData);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking created successfully",
      data: booking,
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

export const checkAvailabilitySlots = async (req: Request, res: Response) => {
  try {
    const date = req.query.date || new Date().toISOString().split("T")[0];
    const availableSlots = await checkAvailability(date);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Availability checked successfully",
      data: availableSlots,
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

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NoDataFound") {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "No Data Found",
          data: [],
        });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const bookings = await getBookingsByUser(userId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bookings retrieved successfully",
      data: bookings,
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

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const booking = await cancelBooking(bookingId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking cancelled successfully",
      data: booking,
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
