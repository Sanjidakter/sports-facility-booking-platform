import express from 'express';
import userRoutes from './app/modules/user/user.route';
import facilityRoutes from './app/modules/facility/facility.route';
import bookingRoutes from './app/modules/booking/booking.route';
import errorHandler from './app/middlewares/errorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';

const app = express();

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/facility', facilityRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
