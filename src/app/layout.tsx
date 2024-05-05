import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { openSans } from "./font";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import ModalProvider from "@/components/provider/modal-provider";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="mentor-theme-storage"
          disableTransitionOnChange
        >
          <ClerkProvider>
            {children}
            <Toaster />
            <ModalProvider />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
