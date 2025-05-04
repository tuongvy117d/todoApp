# Vue Express TypeScript JWT Authentication

A full-stack TypeScript application with JWT authentication featuring:

- Vue 3 (Composition API) + TypeScript frontend
- Express + TypeScript backend
- JWT authentication
- MongoDB database
- Role-based access control

## Project Structure

- `/client` - Vue 3 frontend
- `/server` - Express backend

## Setup

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on the example:
```
PORT=5123
MONGODB_URI=mongodb://localhost:27017/vue-express-jwt
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

4. Start development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## Features

- JWT authentication system with token storage and axios interceptors
- Protected routes on both client and server
- Role-based authorization (admin/user)
- User registration and login
- User profile management
- Admin dashboard

## Production Build

### Backend

```bash
cd server
npm run build
npm start
```

### Frontend

```bash
cd client
npm run build
```

The frontend build will be in the `client/dist` directory, which can be served by any static web server.

## License

MIT 