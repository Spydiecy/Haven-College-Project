# Haven Chain of Hotels 🌴

![Haven Hotels Logo](https://i.imgur.com/FxmFR4f.jpeg)

## Project Overview

Haven Chain of Hotels is a luxury wellness hotel chain management system built with modern web technologies. This full-stack application provides a seamless booking experience for customers and efficient management capabilities for hotel staff.

## ✨ Features

- **User Authentication & Account Management**
  - Secure signup and login system
  - JWT-based authentication
  - Password encryption with bcrypt
  - Role-based access control (user/admin)

- **Booking System**
  - Interactive booking flow for multiple destinations
  - Date validation and room type selection
  - Guest information collection
  - Payment simulation and booking confirmation

- **User Dashboard**
  - View booking history
  - Personal profile management
  - Booking statistics and details

- **Destination Management**
  - Browse different hotel locations
  - View detailed information about each property
  - Image galleries of facilities

- **Hotel Services Showcase**
  - Wellness services
  - Dining options
  - Recreational activities
  - Events & meeting spaces

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing library

### Frontend
- **EJS** - Templating engine
- **CSS3** - Custom styling with responsive design
- **JavaScript** - Client-side interactivity
- **GSAP** - Animations

### DevOps
- **Dotenv** - Environment variable management
- **Nodemon** - Development server with hot reload
- **Express Rate Limit** - API rate limiting
- **Helmet** - HTTP header security

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- MongoDB (v4.4 or higher)
- npm (v6.0.0 or higher)

## 🚀 Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/haven-chain-of-hotels.git
   cd haven-chain-of-hotels
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/haven-hotels
   PORT=8080
   JWT_SECRET=your_secure_jwt_secret
   ```

4. **Set up the database**
   Make sure MongoDB is running, then create an admin user:
   ```bash
   npm run create-admin
   ```

5. **Start the application**
   ```bash
   # For production
   npm start
   
   # For development with hot reload
   npm run dev
   ```

6. **Access the application**
   Open your browser and go to `http://localhost:8080`

## 🏨 Project Structure

```
haven-chain-of-hotels/
│
├── config/               # Configuration files
│   └── database.js       # MongoDB connection
│
├── middlewares/          # Express middlewares
│   ├── authMiddleware.js # Authentication middleware
│   └── errorMiddleware.js # Error handling
│
├── models/               # Mongoose models
│   ├── User.js           # User model
│   └── Booking.js        # Booking model
│
├── public/               # Static assets
│   ├── css/              # Stylesheets
│   ├── js/               # Client-side JavaScript
│   ├── images/           # Images
│   └── videos/           # Video files
│
├── routes/               # Express routes
│   ├── auth.js           # Authentication routes
│   ├── dashboard.js      # Dashboard routes
│   └── destinations.js   # Destination routes
│   └── ...               # Other route files
│
├── scripts/              # Utility scripts
│   └── create-admin.js   # Admin user creation
│
├── views/                # EJS templates
│   ├── pages/            # Page templates
│   └── partials/         # Reusable components
│
├── app.js                # Express app configuration
├── server.js             # Server entry point
└── package.json          # Project dependencies
```

## 📱 Screenshots

*[Insert screenshots of key pages here]*

## 🔒 Security Features

- **Password Security**: All passwords are hashed using bcrypt
- **Protected APIs**: Authentication middleware for protected routes
- **JWT Tokens**: HTTP-only cookies for secure authentication
- **Helmet**: HTTP header security
- **Rate Limiting**: Protection against brute force attacks
- **Content Security Policy**: Protection against XSS attacks

## 📝 Testing

*[Include information about how to run tests if you have them]*

## 👥 Contributors

- [Your Name] - Lead Developer
- [Team Member 1] - Frontend Developer
- [Team Member 2] - Backend Developer

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*This project was developed as part of [Your University/College Name] coursework.*
