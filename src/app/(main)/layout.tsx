import SideBar from "@/components/side-bar";
import MobileSideBar from "@/components/mobile-side-bar";
import SearchHeader from "@/components/search-header";
import { ModeToggle } from "@/components/mode-toggle";
import UserButtonContainer from "@/components/user-button-container";
import { getQuestsProgress } from "@/queries/quests-progress-queries";
import { getAllQuests } from "@/queries/quests-queries";
import { getUserProgress } from "@/queries/user-progress-queries";
import UserProgress from "@/components/user-progress";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const questProgressData = getQuestsProgress();
  const questsData = getAllQuests();
  const userProgressData = getUserProgress();

  const [questProgress, quests, userProgress] = await Promise.all([
    questProgressData,
    questsData,
    userProgressData,
  ]);

  const completedQuests = !userProgress
    ? 0
    : quests.filter((q) => {
        const isClaim = !!questProgress?.find(
          (questProgress) =>
            questProgress.completed && questProgress.questId === q.id
        );

        const progress = (userProgress?.points / q.points) * 100;

        return !isClaim && progress >= 100;
      }).length;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar completedQuestsLength={completedQuests} />
      <div className="flex flex-col">
        <header className="z-10 sticky top-0 flex h-14 items-center gap-4 border-b bg-slate-50 dark:bg-slate-900 px-4 lg:h-[60px] lg:px-6">
          <MobileSideBar completedQuestsLength={completedQuests} />
          <div className="w-full flex-1 flex items-center gap-x-4">
            <SearchHeader />
            <UserProgress
              activeCourse={userProgress?.course!}
              hearts={userProgress?.hearts!}
              points={userProgress?.points!}
            />
          </div>
          <div className="flex items-center gap-x-4">
            <UserButtonContainer />
            <ModeToggle />
          </div>
        </header>
        <main className="relative flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full">
          <div className="w-full mx-auto h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
