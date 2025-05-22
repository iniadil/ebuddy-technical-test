# eBuddy.gg Frontend

This is the frontend application for eBuddy.gg, built with Next.js and React.

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **Material UI**: React component library
- **Redux Toolkit**: State management
- **Firebase**: Authentication and real-time database
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework

## Project Structure

```
frontend/
├── app/
│   ├── login/
│   ├── profile/
│   ├── register/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── Login/
├── firebase/
│   └── client.ts
├── hooks/
│   ├── useAuthUser.ts
│   ├── useNetworkStatus.ts
│   └── usePresence.ts
├── store/
│   ├── actions.ts
│   ├── hooks.ts
│   ├── reducers.ts
│   └── store.ts
├── apis/
│   ├── user.ts
│   └── userApi.ts
└── package.json
```

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- User authentication (login/register)
- Online presence detection
- Profile management
- Responsive UI with Material UI components

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# API Config
NEXT_PUBLIC_API_URL=your-api-url
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
