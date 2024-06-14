import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import errorHandler from './app/middlewares/errorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import userRoutes from './app/modules/user/user.route';
import facilityRoutes from './app/modules/facility/facility.route';
import bookingRoutes from './app/modules/booking/booking.route';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

// Root route for welcome message or status check
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Sports Facility Booking Platform API',
  });
});

app.use('/api/auth', userRoutes);
app.use('/api/facility', facilityRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
