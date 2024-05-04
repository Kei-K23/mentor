import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    '/learn(.*)',
    '/courses(.*)',
    '/challenges(.*)',
    '/shop(.*)',
    '/leaderboard(.*)',
    '/quests(.*)',
    '/api/users(.*)',
]);

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
});

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};