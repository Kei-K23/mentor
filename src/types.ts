import { Challenge, ChallengeProgress } from "@prisma/client";

export type ChallengeWithChallengeProgress = Challenge & {
    challengeProgress: ChallengeProgress | null;
}