import { UserProgressWithUser } from "@/types";
import React from "react";
import UserItem from "./user-item";

type WrapperLeaderBoardProps = {
  usersForLeaderBoard: UserProgressWithUser[];
};

const WrapperLeaderBoard = ({
  usersForLeaderBoard,
}: WrapperLeaderBoardProps) => {
  return (
    <div className="w-full">
      <h3 className="text-muted-foreground font-bold mb-3">Leader board</h3>
      {usersForLeaderBoard.length ? (
        usersForLeaderBoard?.map((userProgress, i) => (
          <UserItem
            key={userProgress.id}
            userProgress={userProgress}
            index={i}
          />
        ))
      ) : (
        <p className="text-muted-foreground">No leaderboard data.</p>
      )}
    </div>
  );
};

export default WrapperLeaderBoard;
