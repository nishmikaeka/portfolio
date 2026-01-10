"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import { SiNextdotjs, SiTailwindcss, SiNestjs, SiMongodb, SiPostgresql, SiFirebase, SiExpress, SiSocketdotio, SiDocker, SiSpringboot } from "react-icons/si"
const mapbox = '/assets/mapbox.png'
const springboot = '/assets/spring-boot.png'

const projects = [
    {
        id: "req",
        title: "ResQ",
        description: "ResQ is a real-time emergency response platform for Sri Lanka. Victims report SOS with exact location and photos — nearby volunteers respond instantly with one tap, triggering life-saving SMS alerts. Built during recent floods to ensure no one waits alone. It turns everyday smartphones into a faster, more direct alternative to overwhelmed hotlines, connecting people who need help with those who can provide it in minutes.",
        image: "/assets/req macbook.png",
        stack: [
            { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
            { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
            { name: "Mapbox GL", icon: mapbox, color: "#06B6D4" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        ],
        link: "https://resq-disaster-platform-web.vercel.app/",
        github: "https://github.com/nishmikaeka/resq-disaster-platform"
    },
    {
        id: "hydratrack",
        title: "HydraTrack",
        description: "A beautiful and intuitive mobile app to track and improve your daily water intake. HydraTrack combines smooth, real-time visualizations with actionable insights to help users stay hydrated, maintain streaks, and meet personalized hydration goals. The app features a modern, adaptive interface and smart reminders, backed by a robust Spring Boot API to ensure reliable data tracking and analytics. Fully containerized with Docker Compose, HydraTrack offers seamless consistency across development and production environments.",
        image: "/assets/hydratrack3.png",
        stack: [
            { name: "React Native", icon: FaReact, color: "#61DAFB" },
            { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
            { name: "Docker", icon: SiDocker, color: "#2496ED" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        ],
        link: "https://github.com/nishmikaeka/hydratrack",
        github: "https://github.com/nishmikaeka/hydratrack"
    },
    {
        id: "hangout",
        title: "Hangout",
        description: `A real-time chatroom platform with host-controlled private rooms. Create timed sessions, set participant limits, and share images instantly — all powered by Socket.IO for seamless live messaging.
Join rooms via meeting code or email invitation(no signup required), perfect for quick group chats or virtual hangouts.`,
        image: "/assets/hangoutMac.png",
        stack: [
            { name: "React", icon: FaReact, color: "#61DAFB" },
            { name: "Express", icon: SiExpress, color: "#000000" },
            { name: "Socket.IO", icon: SiSocketdotio, color: "#ffffffff" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" }
        ],
        link: "https://hangout-realtime-chatroom.vercel.app/",
        github: "https://github.com/nishmikaeka/hangout-realtime-chatroom"
    },
    {
        id: "travel-ceylon",
        title: "Travel Ceylon",
        description: "Contributed to a platform connecting tourists with local service providers in Sri Lanka .Developed the full taxi booking module: search, real-time availability filtering, vehicle listings, and seamless booking flow",
        image: "/assets/travelCeylonMac.png",
        mobileImage: null,
        stack: [
            { name: "React", icon: FaReact, color: "#61DAFB" },
            { name: "Express", icon: SiExpress, color: "#000000" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" }
        ],
        link: "#",
        github: "https://github.com/orgs/Travel-Ceylon/dashboard"
    }
]

export function Projects() {
    return (
        <section id="projects" className="flex w-full sm:w-4/5 flex-col items-center justify-center gap-16 bg-white px-6 py-20 dark:bg-zinc-950 lg:px-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4 text-center"
            >
            </motion.div>

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
                            <h3 className="text-lg sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-50"># {index + 1} {project.title}</h3>

                            {/* Mobile Image: Visible only on mobile, placed between title and description */}
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

                            <p className="text-[12px] sm:text-sm tracking-wider text-zinc-600 dark:text-zinc-400">{project.description}</p>

                            <div className="flex flex-wrap gap-3">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech.name}
                                        className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                                    >
                                        {typeof tech.icon === 'function' ? (
                                            <tech.icon style={{ color: tech.color === "#000000" ? undefined : tech.color }} className={tech.color === "#000000" ? "dark:text-white" : ""} />
                                        ) : (
                                            <Image
                                                src={tech.icon}
                                                alt={tech.name}
                                                width={16}
                                                height={16}
                                                className="object-contain"
                                            />
                                        )}
                                        {tech.name}
                                    </span>
                                ))}
                            </div>

                            <div className="flex w-full items-center gap-4 pt-2 flex-row sm:flex-row">
                                <a href={project.link} target='_blank' className="flex flex-1 items-center justify-center gap-2 rounded-full shadow-sm border border-zinc-950 bg-zinc-950 px-4 py-2 text-sm font-medium tracking-wide text-white transition-transform hover:scale-105 hover:bg-zinc-800 sm:w-auto sm:flex-none sm:px-8 dark:border-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100">
                                    <FaExternalLinkAlt /> Live Demo
                                </a>
                                <a href={project.github} target='_blank' className="flex flex-1 items-center justify-center gap-2 rounded-full shadow-sm border border-zinc-200 bg-white px-4 py-2 text-sm font-medium tracking-wide text-zinc-950 transition-transform hover:scale-105 hover:bg-zinc-50 sm:w-auto sm:flex-none sm:px-8 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700">
                                    <FaGithub /> GitHub
                                </a>
                            </div>
                        </div>

                        {/* Desktop Image: Visible only on large screens */}
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
    )
}
