# Mentor

## Overview

Mentor is an open-source web application for learning, practicing and mastering programming languages and craft interview questions. The goal of this project is to improve the developer community.

## Features

Key Features:

- Next server actions
- Auth using Clerk
- Dark mode support
- Sound effects
- Hearts system
- Points / XP system
- Exit confirmation popup
- Practice old lessons to regain hearts
- Leaderboard
- Quests milestones and gain rewards
- Shop system to exchange points with hearts
- Landing page
- Real-time comments section with Firebase
- Informative user profile
- Mobile responsiveness

## Tech Stack

- Next.js 14
- Postgresql (Neon cloud)
- Firebase
- Prisma
- Clerk (Auth)
- TypeScript
- Tailwind / ShadcnUI

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Postgresql database for storing application data.
- Firebase account.

### Installation

1. Setup Clerk web hooks for user create, update and delete.
2. Install dependencies: `npm install`
3. Build database schema: `npm run db:push`
4. Generate prisma schema types: `npx prisma generate`
5. Run seeding script: `npm run db:seed`
6. Start the application locally: `npm run dev`

### Configuration

Make sure to set the following environment variables:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY>
- CLERK_SECRET_KEY=<CLERK_SECRET_KEY>
- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
- NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/learn
- NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/learn
- NEXT_PUBLIC_CLERK_WEBHOOK_SECRET_KEY=<NEXT_PUBLIC_CLERK_WEBHOOK_SECRET_KEY>
- DATABASE_URL=<DATABASE_URL>
- NEXT_PUBLIC_FIREBASE_API_KEY=<NEXT_PUBLIC_FIREBASE_API_KEY>
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN>
- NEXT_PUBLIC_FIREBASE_PROJECT_ID=<NEXT_PUBLIC_FIREBASE_PROJECT_ID>
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET>
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID>
- NEXT_PUBLIC_FIREBASE_APP_ID=<NEXT_PUBLIC_FIREBASE_APP_ID>
- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID>

## Contributing

We welcome contributions from the community! If you find a bug or have an idea for an improvement, please open an issue or submit a pull request. [CONTRIBUTION-GUIDE.md](CONTRIBUTION-GUIDE.md)

## TODO

This is the todo list to complete for version 1.

- [ ] Add errors management
- [ ] Update user leaderboard status design
- [ ] Add features private profile and profile view count
- [ ] Apply pagination and limiting fetching for comments from Firebase
- [ ] Add blogs system
- [ ] Add user friend system
- [ ] Add point gift system to send points from one account to another
- [ ] Avatar system that users can buy avatars with their points

## License

This project is licensed under the [MIT License](LICENSE).
