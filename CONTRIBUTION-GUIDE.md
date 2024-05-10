# Contribution Guide

Thank you for considering contributing to our project! By participating in this open-source community, you help improve the project for everyone. Below are some guidelines to ensure smooth and effective collaboration. Please read and follow the guidelines step by step if you are new to open source1:

## Code of Conduct

We enforce a Code of Conduct to foster a welcoming and inclusive community. Please review and adhere to it in all interactions within our project.

## Space to contribute

You can contribute to any space of out project. We also added future Todo list for this project in the [README.md](README.md). For example, you can contribute and improve UI design, data fetching, performance optimization and anything you want but be sure to test your changes before making PR.

## Getting Started

1. **Fork the Repository**: Start by forking the repository to your GitHub account.
2. **Clone the Repository**: Clone the forked repository to your local machine.

```bash
git clone https://github.com/your-username/mentor
```

3. **Set Up Remote Upstream**: Set up a remote connection to the original repository.

```bash
git remote add upstream https://github.com/Kei-K23/mentor
```

4. **Create a Branch**: Create a new branch for your contribution.

```bash
git checkout -b feature-name
```

### Environment setup

Firstly, Make sure to set the following environment variables:

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

1. Setup Clerk web hooks for user create, update and delete.
2. Install dependencies: `npm install`
3. Build database schema: `npm run db:push`
4. Generate prisma schema types: `npx prisma generate`
5. Run seeding script: `npm run db:seed`
6. Start the application locally: `npm run dev`

### Making Changes

1. **Keep Your Fork Updated**: Before making changes, ensure your fork is up-to-date with the upstream repository.

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Make Changes**: Implement your changes or fixes. Ensure your code follows our coding standards and practices.

3. **Test Locally**: Test your changes locally to ensure they function as expected.

### Submitting Changes

1. **Commit Your Changes**: Commit your changes with clear and descriptive messages.

```bash
git add .
git commit -m "Brief description of changes"
```

2. **Push Changes**: Push your changes to your forked repository.

```bash
git push origin feature-name
```

3. **Create a Pull Request**: Go to the original repository and create a Pull Request (PR) from your forked branch. Provide a detailed description of the changes introduced.

### Review Process

1. **Code Review**: A maintainer will review your PR, providing feedback and suggestions if needed.
2. **Address Feedback**: Make necessary changes based on the feedback received.
3. **Approval and Merge**: Once approved, a maintainer will merge your changes into the main branch.

### Additional Tips

- Follow existing coding conventions and style guides.
- Keep PRs focused and limited in scope for easier review.
- Be patient and respectful during the review process.
- Contribute to discussions and help other contributors when possible.
- Celebrate your contributions and those of others!

Thank you for contributing to our project! 🚀 If you have any questions or need assistance, feel free to reach out to us.
