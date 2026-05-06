"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaGithub,
  FaExternalLinkAlt,
  FaAws,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiNestjs,
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiSocketdotio,
  SiDocker,
  SiSpringboot,
} from "react-icons/si";
const mapbox = "/assets/mapbox.png";

// ─── Accordion data ───────────────────────────────────────────────────────────

const resqAccordionItems = [
  {
    id: "motivation",
    title: "The Problem — Why ResQ Exists",
    bullets: [
      "Emergency hotlines in Sri Lanka became critically overloaded during flood events — victims couldn't get through.",
      "Traditional dispatch wastes precious minutes: call → operator → manual coordination.",
      "Victims had no confirmation anyone was coming, causing panic and dangerous solo action.",
      "Zero instant safety guidance left victims making uninformed decisions at the worst moment.",
      "ResQ was built during active floods — a direct response to a real crisis, not a side project.",
    ],
  },
  {
    id: "solution",
    title: "The Solution — What ResQ Delivers",
    bullets: [
      "Decentralised volunteer dispatch bypasses overloaded hotlines — nearby volunteers respond instantly.",
      "PostGIS geospatial proximity matching surfaces the closest available volunteers in real time.",
      "Twilio SMS confirms to the victim the moment a volunteer accepts — seconds, not minutes.",
      "RAG-powered AI assistant delivers verified emergency guidance while the victim waits.",
      "Cloudinary media upload lets victims attach photo/video evidence at incident creation.",
    ],
  },
  {
    id: "engineering",
    title: "Engineering Decisions — The Why Behind the Stack",
    bullets: [
      "Geospatial Map Discovery: Mapbox GL integration provides live interaction with draggable markers for real-time proximity-based coordination.",
      "AMOLED-Optimized Dark UI: A dark-first interface reduces battery drain on mobile devices and ensures high contrast for night-time emergency use.",
      "Rapid SMS Coordination: Automated Twilio alerts connect victims and responders instantly via SMS, ensuring zero-latency communication during crises.",
      "Resilience & Scalability: Global rate limiting and automated cleanup crons prevent system abuse and maintain peak database performance over time.",
      "Secure Auth Flow: HttpOnly cookies for JWTs and Google OAuth reduce friction while preventing session hijacking and XSS token theft.",
      "Advanced RAG Architecture: 3072-dim vectors via gemini-embedding-001 and Gemini 3 Flash ground responses in verified disaster protocols.",
    ],
  },
  {
    id: "ai",
    title: "AI Emergency Assistant — RAG Architecture",
    bullets: [
      "RAG over generic AI — answers are grounded exclusively in verified Sri Lanka DMC disaster protocols.",
      "Question → 3072-dim vector (gemini-embedding-001) → Pinecone retrieves 5 closest document chunks.",
      "Chunks below 0.70 cosine similarity are discarded — no hallucinated answers surfaced to users in crisis.",
      "Gemini 3 Flash responds only from retrieved context, citing source document and relevance score.",
      "Session memory retains last 3 exchanges so follow-up questions (e.g. 'What about children?') work naturally.",
    ],
  },
  {
    id: "perf",
    title: "Performance & Quality — Tested Under Pressure",
    bullets: [
      "Race condition prevention: atomic DB updates ensure two volunteers cannot accept the same incident simultaneously.",
      "k6 stress test — 100 concurrent users, 3,600+ requests: 100% HTTP success rate, zero failures.",
      "Throughput: ~33 req/s sustained; P95 latency 2.04 s on a t3.micro (1 GB RAM).",
      "Bottleneck identified: JWT + PostGIS under extreme load → Redis and horizontal scaling on the roadmap.",
      "RAG confidence threshold validated: low-relevance queries return the fallback message, not a fabricated answer.",
    ],
  },
];

const hydratrackAccordionItems = [
  {
    id: "motivation",
    title: "The Problem — Why HydraTrack Exists",
    bullets: [
      "Most people have no awareness of their daily water intake — they drink reactively, not intentionally.",
      "Existing tracker apps feel clinical and unmotivating, offering no streak mechanics or visual feedback.",
      "No existing lightweight solution paired a beautiful mobile UI with a robust, containerised API backend.",
    ],
  },
  {
    id: "solution",
    title: "The Solution — What HydraTrack Delivers",
    bullets: [
      "Log water intake with timestamps — streaks, daily goals, and weekly patterns are surfaced automatically.",
      "Real-time animated visualizations make hydration progress tangible and rewarding.",
      "Smart reminders prompt users at key intervals, reducing reliance on willpower alone.",
      "A Spring Boot REST API powers all tracking, analytics, and user profile management.",
    ],
  },
  {
    id: "engineering",
    title: "Engineering Decisions — The Why Behind the Stack",
    bullets: [
      "Spring Boot + JPA: production-grade reliability and clean separation of concerns for a data-heavy tracking API.",
      "Docker Compose: full environment parity between dev and production — no 'it works on my machine' surprises.",
      "PostgreSQL: relational integrity for user-linked hydration records and efficient time-series queries.",
      "JWT Auth: stateless, scalable session management with zero server-side session storage overhead.",
      "React Native: a single codebase for iOS and Android with a fluid, adaptive UI and smooth animations.",
    ],
  },
  {
    id: "infra",
    title: "Architecture & Infrastructure",
    bullets: [
      "Mobile client (React Native) communicates with the REST API via Axios with token-refresh handling.",
      "Spring Boot service layer handles business logic — intake calculations, streak tracking, and goal evaluation.",
      "PostgreSQL (via Spring Data JPA) persists user profiles, water logs, and historical intake data.",
      "Docker Compose orchestrates the API and database containers for reproducible local and cloud deployment.",
    ],
  },
];

const hangoutAccordionItems = [
  {
    id: "motivation",
    title: "The Goal — Mastering Real-Time Engineering",
    bullets: [
      "Built to deeply understand WebSockets, bidirectional state sync, and multi-participant session management.",
      "The challenge: make a system where host and participants stay in sync in real time, without polling.",
      "Timed sessions and participant limits were intentional constraints to learn stateful room lifecycle management.",
    ],
  },
  {
    id: "solution",
    title: "What Hangout Delivers",
    bullets: [
      "Hosts create private rooms with defined participant limits and session durations.",
      "Participants join via a meeting code or direct email invitation — no account required.",
      "Real-time messaging and image sharing run entirely over Socket.IO with room-based broadcasting.",
      "OTP-based password recovery and email invitations via Nodemailer + Brevo keep onboarding smooth.",
    ],
  },
  {
    id: "engineering",
    title: "Engineering Decisions — The Why Behind the Stack",
    bullets: [
      "Socket.IO over raw WebSockets: built-in room management, reconnection logic, and event namespacing massively reduce boilerplate.",
      "MERN Stack: full-stack JavaScript consistency — shared data models and a single language across client and server.",
      "Framer Motion: delivers professional micro-animations with minimal bundle overhead and zero CSS complexity.",
      "Cloudinary: offloads image storage and transformation entirely, keeping the backend stateless and lean.",
      "Timed Sessions: auto-expiry frees resources and keeps rooms focused — a conscious UX and infrastructure decision.",
    ],
  },
  {
    id: "infra",
    title: "Architecture & Deployment",
    bullets: [
      "React + Vite frontend deployed on Vercel — instant CI/CD and global CDN delivery.",
      "Express + Socket.IO backend deployed on Render with persistent processes for live WebSocket connections.",
      "MongoDB Atlas handles user data, room state, and message history with a managed, scalable cluster.",
      "Dedicated socket/ module on the server isolates all real-time event logic from REST route handlers.",
    ],
  },
];

// ─── Shared modal component ───────────────────────────────────────────────────
type AccordionItem = { id: string; title: string; bullets: string[] };

function ProjectModal({
  projectTitle,
  subtitle,
  items,
  onClose,
}: {
  projectTitle: string;
  subtitle: string;
  items: AccordionItem[];
  onClose: () => void;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const toggle = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? null : id)),
    []
  );

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8"
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-zinc-200 bg-white px-6 py-5 dark:border-zinc-700 dark:bg-zinc-900">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#1da1f2" }}>
                Deep Dive
              </p>
              <h2 className="mt-0.5 text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {projectTitle}
              </h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="mt-0.5 flex-shrink-0 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <FaTimes size={14} />
            </button>
          </div>

          {/* Accordion body */}
          <div className="divide-y divide-zinc-100 px-6 pb-6 dark:divide-zinc-800">
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-sm font-semibold tracking-wide transition-colors ${isOpen ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:text-zinc-400"}`}>
                      {item.title}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      className="flex-shrink-0"
                    >
                      <FaChevronDown
                        size={12}
                        className={isOpen ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400"}
                      />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-4 space-y-2 pl-1">
                          {item.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-zinc-800 dark:bg-zinc-200" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t border-zinc-200 bg-white px-6 py-3 dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-center text-[10px] text-zinc-400 dark:text-zinc-600">
              Built by Nishmika Ekanayake · Portfolio Project
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: "req",
    title: "ResQ",
    description:
      "ResQ is a real-time emergency response platform for Sri Lanka. Victims report SOS with exact location and photos — nearby volunteers respond instantly with one tap, triggering life-saving SMS alerts. An on-board AI assistant backed by verified disaster protocols provides immediate guidance while help is on the way.",
    showReadMore: true,
    modalTitle: "ResQ — Emergency Response Platform",
    modalSubtitle: "The problem, solution, AI architecture, and engineering rationale",
    modalItems: resqAccordionItems,
    image: "/assets/req macbook.png",
    stack: [
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "Mapbox GL", icon: mapbox, color: "#06B6D4" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "AWS", icon: FaAws, color: "#FF9900" },
    ],
    link: "https://youtube.com/shorts/hpwzf3c2JHQ",
    launchLink: "https://resqsrilanka.duckdns.org/",
    github: "https://github.com/nishmikaeka/resq-disaster-platform",
  },
  {
    id: "hydratrack",
    title: "HydraTrack",
    description:
      "A mobile app to track and improve your daily water intake. Real-time visualizations, streak tracking, and smart reminders help users stay consistently hydrated — backed by a containerised Spring Boot API and PostgreSQL.",
    showReadMore: true,
    modalTitle: "HydraTrack — Hydration Tracker",
    modalSubtitle: "Motivation, feature design, and engineering decisions",
    modalItems: hydratrackAccordionItems,
    image: "/assets/hydratrack3.png",
    stack: [
      { name: "React Native", icon: FaReact, color: "#61DAFB" },
      { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    ],
    link: "https://youtu.be/cubU6tp86Jc",
    github: "https://github.com/nishmikaeka/hydratrack",
  },
  {
    id: "hangout",
    title: "Hangout",
    description:
      "A real-time chatroom platform with host-controlled private rooms. Create timed sessions, set participant limits, and share images instantly — all powered by Socket.IO. Join via meeting code or email invite, no sign-up required.",
    showReadMore: true,
    modalTitle: "Hangout — Real-Time Chatrooms",
    modalSubtitle: "What it solves, how it works, and the engineering behind it",
    modalItems: hangoutAccordionItems,
    image: "/assets/hangoutMac.png",
    stack: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Express", icon: SiExpress, color: "#000000" },
      { name: "Socket.IO", icon: SiSocketdotio, color: "#ffffffff" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    link: "https://youtu.be/3kj8aubwstM",
    launchLink: "https://hangout-realtime-chatroom.vercel.app/",
    github: "https://github.com/nishmikaeka/hangout-realtime-chatroom",
  },
  {
    id: "travel-ceylon",
    title: "Travel Ceylon",
    description:
      "Contributed to a platform connecting tourists with local service providers in Sri Lanka. Developed the full taxi booking module: search, real-time availability filtering, vehicle listings, and seamless booking flow.",
    image: "/assets/travelCeylonMac.png",
    stack: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Express", icon: SiExpress, color: "#000000" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
    link: "https://youtu.be/0PhkPZO7sjA",
    github: "https://github.com/orgs/Travel-Ceylon/dashboard",
  },
];

// ─── Main section ─────────────────────────────────────────────────────────────
export function Projects() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = useCallback((id: string) => setActiveModal(id), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  const activeProject = projects.find((p) => p.id === activeModal && p.showReadMore);

  return (
    <>
      {activeProject && activeProject.modalItems && (
        <ProjectModal
          projectTitle={activeProject.modalTitle!}
          subtitle={activeProject.modalSubtitle!}
          items={activeProject.modalItems}
          onClose={closeModal}
        />
      )}

      <section
        id="projects"
        className="flex w-full sm:w-4/5 flex-col items-center justify-center gap-16 bg-white px-6 py-20 dark:bg-zinc-950 lg:px-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4 text-center"
        />

        <div className="flex w-full max-w-6xl flex-col gap-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              id={index === 0 ? "projects-start" : project.id}
              initial={{ opacity: 0, y: 70, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center gap-12 lg:flex-row"
            >
              {/* Content */}
              <div className="flex flex-1 flex-col gap-4 sm:gap-5 text-left">
                <h3 className="flex items-center gap-3 text-lg sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  # {index + 1} {project.title}
                  {project.launchLink && (
                    <a
                      href={project.launchLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold tracking-wider no-underline transition-all"
                      style={{
                        textDecoration: "none",
                        border: "1px solid rgba(29,161,242,0.4)",
                        backgroundColor: "rgba(29,161,242,0.1)",
                        color: "#1da1f2",
                      }}
                    >
                      <span className="relative flex h-2 w-2 items-center justify-center">
                        <span
                          className="absolute inline-flex h-full w-full rounded-full"
                          style={{ backgroundColor: "#1da1f2", animation: "livePing 1.2s cubic-bezier(0, 0, 0.2, 1) infinite" }}
                        />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#1da1f2" }} />
                      </span>
                      LAUNCH APP
                    </a>
                  )}
                </h3>

                {/* Mobile Image */}
                <div className="relative h-[250px] w-full overflow-hidden lg:hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>

                <p className="text-[12px] sm:text-sm tracking-wider text-zinc-600 dark:text-zinc-400">
                  {project.description}
                  {project.showReadMore && (
                    <>
                      {" "}
                      <button
                        onClick={() => openModal(project.id)}
                        className="inline cursor-pointer border-none bg-transparent p-0 text-[12px] sm:text-sm font-medium transition-opacity hover:opacity-70"
                        style={{ color: "#1da1f2", textDecoration: "none" }}
                      >
                        Read more
                      </button>
                    </>
                  )}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <span
                      key={tech.name}
                      className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {typeof tech.icon === "function" ? (
                        <tech.icon
                          style={{ color: tech.color === "#000000" ? undefined : tech.color }}
                          className={tech.color === "#000000" ? "dark:text-white" : ""}
                        />
                      ) : (
                        <Image src={tech.icon} alt={tech.name} width={16} height={16} className="object-contain" />
                      )}
                      {tech.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap w-full items-center gap-3 pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full shadow-sm border border-zinc-950 bg-zinc-950 px-5 py-2.5 text-sm font-medium tracking-wide text-white transition-transform hover:scale-105 hover:bg-zinc-800 sm:px-8 dark:border-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
                  >
                    <FaExternalLinkAlt size={12} /> Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full shadow-sm border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium tracking-wide text-zinc-950 transition-transform hover:scale-105 hover:bg-zinc-50 sm:px-8 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                  >
                    <FaGithub size={14} /> GitHub
                  </a>
                </div>
              </div>

              {/* Desktop Image */}
              <div className="relative hidden w-full flex-1 items-center justify-center lg:flex lg:justify-end">
                <div className="relative h-[250px] w-full max-w-[500px] overflow-hidden sm:h-[350px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
