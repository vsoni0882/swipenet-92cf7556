
# SwapNet API Server

This is the backend API server for the SwapNet application, built with Express and MongoDB.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/swapnet
   JWT_SECRET=your_jwt_secret_key_change_in_production
   NODE_ENV=development
   ```

3. Start MongoDB locally or update the MONGODB_URI to point to your MongoDB instance.

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout a user

### Users
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update user profile
- `PATCH /api/users/cv-status` - Update CV status

## Development

For development, you can use:
```
npm run dev
```

This will start the server with nodemon for auto-reloading on code changes.
