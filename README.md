# Dinner Guide Web Application

A full-stack web application for restaurant management and discovery, built with React, Node.js, and MySQL.

## Features

- Restaurant listing and search
- Restaurant management (admin)
- User authentication
- Restaurant reviews and ratings
- Menu management
- Responsive design

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Radix UI Components
- React Router
- React Hook Form
- Axios

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication

## Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- Docker (optional, for MySQL)

## Setup Instructions

### 1. Database Setup

#### Option 1: Using Docker (Recommended)
```bash
# Pull MySQL image
docker pull mysql

# Run MySQL container
docker run -d --name dinner -p 3307:3306 \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=password \
  mysql:latest
```

#### Option 2: Local MySQL Installation
1. Install MySQL locally
2. Create a new database named `mydb`
3. Import the database schema from `mydb-Web.sql`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd dinner-guide-backend

# Install dependencies
npm install

# Install global dependencies
npm install -g yarn
npm install nodemailer express-fileupload uuid multer --save

# Start the backend server
yarn start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd dinner-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=3307
DB_USER=user
DB_PASSWORD=password
DB_NAME=mydb
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
dinner-guide-web/
├── dinner-frontend/         # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── api/          # API integration
│   │   └── types/        # TypeScript types
│   └── package.json
│
├── dinner-guide-backend/   # Node.js backend
│   ├── models/            # Database models
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   └── package.json
│
└── mydb-Web.sql          # Database schema
```

## API Documentation

The backend API documentation is available at `http://localhost:5000/api-docs` when the server is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 