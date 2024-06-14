# Sports Facility Booking Platform

## Live URL
Visit the live application at: https://sports-facility-booking-platform-rust.vercel.app/

## Features
- **User Registration and Login**: Secure user authentication with JWT.
- **Facility Management**: Admins can add, update, and delete facilities.
- **Booking Management**: Users can view available slots, book facilities, and cancel bookings.
- **Availability Check**: Real-time availability check for facilities.
- **Role-based Access Control**: Different access levels for users and admins.

## Technology Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **TypeScript**: Strongly typed JavaScript for robust code
- **Middleware**: Custom middleware for error handling and authentication

### Setup Instructions

1. **Clone the repository**

2. **Install dependencies**
  ```bash
    npm install -f
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=5000
    MONGO_URI= your mongodburi
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**
```bash
    npm run start-dev
    ```
