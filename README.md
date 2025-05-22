# eBuddy.gg

[eBuddy.gg] this is a monorepo project built with Turborepo, containing both frontend and backend applications for a social gaming platform. this project purpose for **My Technical Test Before Interview**.

## 🚀 What's inside?

This Turborepo includes the following apps and packages:

### Apps

- `frontend`: A Next.js application with React, Material UI, and Firebase integration
- `backend`: Firebase Functions API built with Express.js

### Packages

- `shared`: Shared types and utilities used by both frontend and backend
- `eslint-config`: ESLint configurations for the monorepo
- `typescript-config`: TypeScript configurations for the monorepo
- `ui`: Shared UI components

## 🛠️ Tech Stack

- **Frontend**:

  - Next.js
  - React
  - Material UI
  - Redux Toolkit
  - Firebase Authentication
  - TypeScript
  - Tailwind CSS

- **Backend**:
  - Express.js
  - Firebase Functions
  - TypeScript
  - Vite (for building)

## 📋 Prerequisites

- Node.js 18 or later
- npm 10.8.2 or later
- Firebase CLI (for backend development and deployment)

## 🏁 Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd turbo-repo
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   - See the Environment Setup section below for detailed instructions

4. Start development servers:

```bash
npm run dev
```

This will start both frontend and backend development servers simultaneously thanks to Turborepo's task orchestration. You don't need to run them separately.

## 🔧 Environment Setup

### Frontend Environment Setup

Create a `.env.local` file in the `apps/frontend` directory with these variables:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001/your-firebase-project/us-central1/api

# Authentication
NEXT_PUBLIC_AUTH_COOKIE_NAME=ebuddy_auth_token
```

### Backend Environment Setup

1. Create a `.env` file in the `apps/backend` directory with these variables:

```
# Firebase Admin Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="your_firebase_admin_private_key"
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# Server Configuration
PORT=5001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

2. Set up Firebase Functions local development environment:

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Navigate to the backend directory
cd apps/backend

# Start Firebase emulators
firebase emulators:start --only functions

# In a separate terminal, for hot-reload during development
cd apps/backend
npm run dev
```

3. For deploying Firebase Functions:

```bash
# Deploy all Firebase Functions
cd apps/backend
firebase deploy --only functions

# Deploy a specific function
firebase deploy --only functions:functionName
```

## 🏗️ Building for Production

Build all apps and packages:

```bash
npm run build
```

## 🧪 Type Checking

Check types across the monorepo:

```bash
npm run check-types
```

## 🔍 Linting

Run linting across the monorepo:

```bash
npm run lint
```

## 📁 Project Structure

```
turbo-repo/
├── apps/
│   ├── frontend/      # Next.js application
│   └── backend/       # Express.js + Firebase Functions
├── packages/
│   ├── shared/        # Shared utilities and types
│   ├── ui/            # Shared UI components
│   ├── eslint-config/ # ESLint configurations
│   └── typescript-config/ # TypeScript configurations
├── package.json       # Root package.json
└── turbo.json         # Turborepo configuration
```

## 🔄 Turborepo Features

This project uses several Turborepo features:

- **Task Dependencies**: Tasks are run in the correct order based on dependencies
- **Caching**: Build outputs are cached to speed up future builds
- **Workspaces**: npm workspaces for package management

## 📝 License

ISC - See the project's license file for details.

## 👨‍💻 Author

Muhammad Adil [ivgcomunity@gmail.com]

## 🔗 Useful Links

Learn more about the technologies used in this project:

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Express.js Documentation](https://expressjs.com)
