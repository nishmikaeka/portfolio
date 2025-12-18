"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaJava, FaGitAlt, FaDatabase } from "react-icons/fa"
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiNestjs, SiPostgresql, SiMongodb, SiSpringboot } from "react-icons/si"
import { RiNextjsFill } from "react-icons/ri";

const stack = [
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "Next.js", icon: RiNextjsFill, color: "currentColor" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
    { name: "Git", icon: FaGitAlt, color: "#F05032" },
    { name: "SQL", icon: FaDatabase, color: "#4479A1" },
]

export function About() {
    return (
        <section id="about" className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-white px-6 py-20 dark:bg-zinc-950 lg:px-24">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex mb-12 flex-col items-center justify-start gap-4 text-left sm:text-center"
            >
                <h2 className="text-xl font-bold text-left text-zinc-950 sm:text-4xl dark:text-zinc-50">About Me.</h2>
                <p className="max-w-lg text-justify  leading-relaxed font-medium text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                    A 3rd-year BICT undergraduate at the University of Sri Jayewardenepura, Sri Lanka (CGPA: 3.50), with a passion for building full-stack applications that <strong>solve real-world problems.</strong>
                    I focus on creating fast, scalable, and impactful systems - combining clean architecture, real-time features, and smooth, user-friendly experiences across web and mobile.
                    Driven by curiosity and a desire to make technology meaningful, I’m constantly sharpening my skills in performance optimization and end-to-end development - always prioritizing intuitive, polished UX that users love.
                    Always learning, always building - ready for high-impact software engineering roles.
                    <br />
                    If you have a question, project idea, collaboration opportunity, or just want to connect -  feel free to <a href="#contact" className="text-[#1da1f2] hover:underline">reach out!</a>
                </p>
            </motion.div>

            <div className="flex w-full max-w-4xl flex-col items-center gap-8">
                <h3 className="text-md sm:text-lg font-medium text-zinc-600 dark:text-zinc-400">My Tech Stack</h3>
                <div className="grid grid-cols-3 gap-6 sm:gap-8 sm:grid-cols-4 md:gap-12">
                    {stack.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="flex flex-col items-center gap-3 text-zinc-600 dark:text-zinc-200"
                        >
                            <tech.icon
                                className="h-8 w-8 transition-colors sm:h-12 sm:w-12"
                                style={{ color: tech.color === "currentColor" ? undefined : tech.color }}
                            />
                            <span className="font-medium text-xs text-zinc-600 dark:text-zinc-400">{tech.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
