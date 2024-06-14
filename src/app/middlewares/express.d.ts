import { User } from './path/to/user.model'; // Adjust the path as necessary

declare module 'express' {
  interface Request {
    user?: User; // Define the type of user object based on your User model
  }
}
