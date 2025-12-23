"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const { resolvedTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 z-40 w-full bg-white/80 backdrop-blur-xs dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto flex h-18 items-center justify-between px-6 md:px-6 ">
        {/* Left Side: Logo + Nav Links */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="relative h-5 w-15 sm:h-10 sm:w-15"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {mounted && (
              <Image
                src={
                  resolvedTheme === "dark" || resolvedTheme === undefined
                    ? "/assets/logoW.png"
                    : "/assets/logoB.png"
                }
                alt="Logo"
                fill
                sizes="60px"
                className="object-contain object-left"
                priority
              />
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-sm font-medium  tracking-wider text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Download CV (Desktop) */}
        <div className="hidden md:block hover:scale-105 transition-transform">
          <a
            href="/assets/Nishmika Ekanayaka CV.pdf"
            target="_blank"
            className="rounded-full bg-zinc-950 px-5 py-2 text-sm font-medium text-white shadow-sm transition-transform  dark:bg-zinc-50 dark:text-zinc-950"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-zinc-600 dark:text-zinc-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white border-b border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 md:hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <ThemeToggle />
                <a
                  href="/assets/Nishmika Ekanayaka CV.pdf"
                  target="_blank"
                  className="flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-xs font-medium text-white dark:bg-zinc-50 dark:text-zinc-950 active:scale-90 hover:scale-105 transition-transform"
                >
                  <Download size={14} />
                  Download CV
                </a>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    setTimeout(() => {
                      const element = document.querySelector(link.href);
                      if (element) {
                        const offset = 40;
                        const bodyRect =
                          document.body.getBoundingClientRect().top; //gets the distance from viewport to the top of the body element
                        const elementRect = element.getBoundingClientRect().top; //gets the distance from viewport to the elements(projects,contacts)
                        const elementPosition = elementRect - bodyRect;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });
                      }
                    }, 300);
                  }}
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
