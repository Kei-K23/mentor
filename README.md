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

1. Clone the repository: `git clone https://github.com/Kei-K23/mentor`
2. Navigate to the project directory: `cd mentor`
3. Install dependencies: `npm install`
4. Configure environment variables.
5. Start the application locally: `npm run dev`

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

We welcome contributions from the community! If you find a bug or have an idea for an improvement, please open an issue or submit a pull request. Detail contribution guidelines will be available soon.

## License

This project is licensed under the [MIT License](LICENSE).
