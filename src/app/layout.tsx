import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configure the font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // This creates a CSS variable
});
export const metadata: Metadata = {
  title: "Nishmika Ekanayaka Portfolio",
  description:
    "I'm a self-driven full-stack developer passionate about building impactful applications that solve real-world problems — from emergency response to real-time communication and tourism platforms.",
  icons: {
    icon: "/assets/tabIcon.png",
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { SocialSidebar } from "@/components/layout/SocialSidebar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import CustomCursor from "@/components/layout/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <Navbar />
          <SocialSidebar />
          <div className="hidden fixed bottom-6 left-6 z-50 md:block">
            <ThemeToggle />
          </div>
          <main className="pt-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
