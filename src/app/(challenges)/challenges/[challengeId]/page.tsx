import React from "react";

type ChallengeIdPageProps = {
  params: {
    challengeId: string;
  };
};

const ChallengeIdPage = async ({ params }: ChallengeIdPageProps) => {
  return <div>{params.challengeId}</div>;
};

export default ChallengeIdPage;
