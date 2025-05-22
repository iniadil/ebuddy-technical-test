# eBuddy.gg

[eBuddy.gg] this is a monorepo project built with Turborepo, containing both frontend and backend applications for a social gaming platform. this project purpose for **My Technical Test Before Interview**.

## 🚀 What's inside?

This Turborepo includes the following apps and packages:

### Apps

- `frontend`: A Next.js application with React, Material UI, and Firebase integration
- `backend`: An Express.js application running on Firebase Functions

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

   - Create `.env` files in the respective app directories (see their READMEs for details)

4. Start development servers:

```bash
npm run dev
```

This will start both frontend and backend development servers.

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
