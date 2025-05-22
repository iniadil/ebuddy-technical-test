# eBuddy.gg Backend

This is the backend server for the eBuddy.gg application, built with Express.js and Firebase Functions.

## Tech Stack

- **Express.js**: Web application framework
- **Firebase Functions**: Serverless backend infrastructure
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool for bundling the application

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── firebase.ts
│   ├── controller/
│   │   └── userController.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   ├── types/
│   │   └── user.d.ts
│   └── index.ts
├── vite.config.js
├── firebase.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- Firebase CLI
- A Firebase project

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up Firebase:

```bash
firebase login
```

### Development

Run the development server with Firebase emulators:

```bash
npm run dev
```

This will:

1. Build the application using Vite
2. Start Firebase emulators for local testing

### Building

Build the application for production:

```bash
npm run build
```

### Deployment

Deploy the backend to Firebase Functions:

```bash
npm run deploy
```

## API Endpoints

- `/api/user`: User-related endpoints

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Firebase Config
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key

# Other Configuration
PORT=8080
```
