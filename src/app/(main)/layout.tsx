import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "@/components/side-bar";
import MobileSideBar from "@/components/mobile-side-bar";
import SearchHeader from "@/components/search-header";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import UserButtonContainer from "@/components/user-button-container";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <header className="z-10 sticky top-0 flex h-14 items-center gap-4 border-b bg-slate-50 dark:bg-slate-900 px-4 lg:h-[60px] lg:px-6">
          <MobileSideBar />
          <div className="w-full flex-1">
            <SearchHeader />
          </div>
          <div className="flex items-center gap-x-4">
            <UserButtonContainer />
            <ModeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full">
          <div className="w-full mx-auto h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
