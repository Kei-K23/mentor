import { Challenge, ChallengeOption, ChallengeProgress, Course, User, UserProgress } from "@prisma/client";

export type ChallengeWithChallengeProgress = Challenge & {
    challengeProgress: ChallengeProgress[] | null;
}

export type ChallengeWithChallengeProgressAndOptions = Challenge & {
    challengeProgress: ChallengeProgress[] | null;
    challengeOptions: ChallengeOption[] | null;
}

export type CourseWithChallengeProgressAndChallenges = Course & {
    challengeProgress: ChallengeProgress[];
    challenges: Challenge[]
}

export type UserProgressWithUser = UserProgress & {
    user: User
}