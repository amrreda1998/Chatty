# Chatty

Chatty is a full-stack real-time chat application built with modern technologies. It allows users to sign up, log in, and chat with other users in real-time. The app supports features like theming, profile management, and image sharing.

---

## Features

### Frontend

- **Authentication**: Sign up, log in, and log out with secure authentication.
- **Real-Time Messaging**: Send and receive messages instantly using Socket.IO.
- **Image Sharing**: Share images in chat with preview functionality.
- **Theming**: Choose from multiple themes to customize the app's appearance.
- **Profile Management**: Update profile picture and view account details.
- **Responsive Design**: Fully responsive UI for desktop and mobile devices.

### Backend

- **RESTful API**: Built with Express.js to handle authentication, messaging, and user management.
- **Socket.IO Integration**: Real-time communication for instant messaging.
- **Cloudinary Integration**: Image uploads are securely stored and served via Cloudinary.
- **MongoDB**: Database for storing user and message data.
- **JWT Authentication**: Secure user authentication with JSON Web Tokens.

---

## Tech Stack

### Frontend

- **React**: Component-based UI library.
- **Vite**: Fast development environment.
- **Zustand**: State management for global app state.
- **Tailwind CSS**: Utility-first CSS framework.
- **DaisyUI**: Tailwind-based component library.
- **React Router**: Client-side routing.
- **React Hot Toast**: Notifications for user feedback.

### Backend

- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and message data.
- **Socket.IO**: Real-time communication for chat functionality.
- **Cloudinary**: Image storage and management.
- **JWT**: Secure authentication.

---

## Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Cloudinary account (for image uploads)

### Clone the Repository

```bash
git clone https://github.com/your-username/chatty.git
cd chatty
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5001
   MONG_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

1. Open the app in your browser at `http://localhost:5173`.
2. Sign up for a new account or log in with an existing account.
3. Start chatting with other users in real-time!

---

## Project Structure

### Frontend

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── constants/        # App-wide constants (e.g., themes)
│   ├── lib/              # Utility functions and axios instance
│   ├── pages/            # Page components (e.g., LoginPage, HomePage)
│   ├── store/            # Zustand stores for state management
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
└── package.json          # Frontend dependencies and scripts
```

### Backend

```
backend/
├── src/
│   ├── controllers/      # API controllers (e.g., auth, messages)
│   ├── lib/              # Utility libraries (e.g., Cloudinary, DB connection)
│   ├── middleware/       # Middleware (e.g., auth protection)
│   ├── models/           # Mongoose models (e.g., User, Message)
│   ├── routes/           # API routes (e.g., auth, messages)
│   ├── seeds/            # Database seed scripts
│   ├── index.js          # Entry point
│   └── .env              # Environment variables
├── package.json          # Backend dependencies and scripts
└── .gitignore            # Ignored files and directories
```

---

## Environment Variables

### Backend

| Variable                | Description                          |
| ----------------------- | ------------------------------------ |
| `PORT`                  | Port for the backend server          |
| `MONGODB_URI`           | MongoDB connection string            |
| `JWT_SECRET`            | Secret key for JWT authentication    |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                   |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                |
| `NODE_ENV`              | Environment (development/production) |

---

## Scripts

### Frontend

- `npm run dev`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run preview`: Preview the production build.

### Backend

- `npm run dev`: Start the backend server in development mode.
- `npm start`: Start the backend server in production mode.

---

## Future Enhancements

- Add typing indicators for real-time feedback.
- Implement message read receipts.
- Add group chat functionality.
- Improve accessibility (ARIA roles, keyboard navigation).
- Add push notifications for new messages.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

---

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Socket.IO](https://socket.io/)
- [Cloudinary](https://cloudinary.com/)
- [MongoDB](https://www.mongodb.com/)
