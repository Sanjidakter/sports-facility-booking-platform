// src/routes/booking.routes.ts
import { Router } from 'express';
import {
  addBooking,
  checkAvailabilitySlots,
  getBookings,
  getUserBookings,
  deleteBooking,
} from './booking.controller';
import { authMiddleware, adminMiddleware } from '../../middlewares/authenticate';

const router = Router();

router.get('/check-availability', checkAvailabilitySlots);
router.post('/', authMiddleware, addBooking);
router.get('/', authMiddleware, adminMiddleware, getBookings);
router.get('/user', authMiddleware, getUserBookings); 
router.delete('/:id', authMiddleware, deleteBooking);

export default router;
