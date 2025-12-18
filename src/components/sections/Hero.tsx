"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const floatingIcons = [
    {
        src: "/assets/image 15.png",
        x: { mobile: 40, desktop: 80 },
        y: { mobile: -30, desktop: -40 },
        delay: 0
    }, // JS
    {
        src: "/assets/image 16.png",
        x: { mobile: 60, desktop: 110 },
        y: { mobile: 10, desktop: 20 },
        delay: 0.5
    }, // Mongo
    {
        src: "/assets/java.png",
        x: { mobile: -100, desktop: -180 },
        y: { mobile: -20, desktop: -25 },
        delay: 1
    }, // Java
    {
        src: "/assets/image 23.png",
        x: { mobile: -100, desktop: -160 },
        y: { mobile: 30, desktop: 40 },
        delay: 1.5
    }, // PostgreSQL
    {
        src: "/assets/image 22.png",
        x: { mobile: -150, desktop: -230 },
        y: { mobile: 25, desktop: 50 },
        delay: 2.5
    }, // Python
    {
        src: "/assets/ts.png",
        x: { mobile: 120, desktop: 175 },
        y: { mobile: 70, desktop: 90 },
        delay: 3.5
    }, // TS
    {
        src: "/assets/Nestjs.png",
        x: { mobile: 110, desktop: 170 },
        y: { mobile: 5, desktop: 7 },
        delay: 3
    }, // Nest
    {
        src: "/assets/spring-boot.png",
        x: { mobile: -150, desktop: -230 },
        y: { mobile: 90, desktop: 130 },
        delay: 3.5
    }, // Spring Boot
]

const roles = ["Software Developer", "Frontend Developer", "Backend Developer", "Mobile Developer"]

export function Hero() {
    const [roleIndex, setRoleIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640) // sm breakpoint
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <section id="home" className="relative flex min-h-[calc(100vh-150px)] w-full flex-col items-center justify-center overflow-hidden px-6 pt-0 sm:pt-15 lg:px-24">

            {/* Content Container */}
            <div className="z-10 flex w-full max-w-4xl flex-col items-center gap-1 text-center">

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-medium  tracking-widest text-zinc-950 dark:text-zinc-200 sm:text-xl"
                >
                    Hello, I'm Nishmika
                </motion.h1>

                {/* Role with Typewriter/Cycle */}
                <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-zinc-500 sm:text-5xl">

                    <span className="text-[#1da1f2]">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={roles[roleIndex].split(" ")[0]}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-block"
                            >
                                {roles[roleIndex].split(" ")[0]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{roles[roleIndex].split(" ").slice(1).join(" ")}</motion.span>
                </h2>

                {/* Bio */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-md text-[10px] sm:text-sm font-medium text-zinc-600 dark:text-zinc-400"
                >
                    &quot;Junior Full-Stack Developer building high-performance applications with a focus on exceptional UX and community-driven solutions.&quot;
                </motion.p>
            </div>

            {/* Image & Floating Icons */}
            <div className="relative mt-8 flex w-full items-center justify-center">
                <div className="relative h-[300px] w-[300px] sm:h-[450px] sm:w-[450px]">
                    {/* Main Image */}
                    <div className="relative z-10 h-full w-full overflow-visible">
                        <Image
                            src="/assets/My photo.png"
                            alt="Nishmika"
                            fill
                            sizes="(max-width: 640px) 300px, 450px"
                            className="object-contain object-bottom grayscale"
                            priority
                        />
                    </div>

                    {/* Floating Icons */}
                    {floatingIcons.map((icon, index) => {
                        const xPos = isMobile ? icon.x.mobile : icon.x.desktop
                        const yPos = isMobile ? icon.y.mobile : icon.y.desktop

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    opacity: { duration: 0.5, delay: icon.delay },
                                    scale: { duration: 0.5, delay: icon.delay },
                                }}
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    top: '50%',
                                    translateX: xPos,
                                    translateY: yPos,
                                }}
                                className="absolute h-4 w-4 sm:h-6 sm:w-6"
                            >
                                {/* Inner div for floating animation */}
                                <motion.div
                                    animate={{
                                        y: [0, -5, 0],
                                    }}
                                    transition={{
                                        duration: 3 + index * 0.2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: icon.delay,
                                    }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={icon.src}
                                        alt=""
                                        fill
                                        sizes="(max-width: 640px) 16px, 24px"
                                        className="object-contain"
                                    />
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}