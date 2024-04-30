import { Challenge, ChallengeOption, ChallengeProgress } from "@prisma/client";

export type ChallengeWithChallengeProgress = Challenge & {
    challengeProgress: ChallengeProgress | null;
}

export type ChallengeWithChallengeProgressAndOptions = Challenge & {
    challengeProgress: ChallengeProgress | null;
    challengeOptions: ChallengeOption[] | null;
}