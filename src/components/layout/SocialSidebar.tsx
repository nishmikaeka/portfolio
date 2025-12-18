"use client"

import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa"
import { SiGmail } from "react-icons/si"

export function SocialSidebar() {
    const socialLinks = [
        {
            name: "GitHub",
            icon: FaGithub,
            href: "https://github.com/nishmikaeka",
            hoverColor: "hover:text-zinc-950 dark:hover:text-white"
        },
        {
            name: "LinkedIn",
            icon: FaLinkedinIn,
            href: "https://www.linkedin.com/in/nishmika-eka/",
            hoverColor: "hover:text-[#1da1f2]"
        },
        {
            name: "Gmail",
            icon: SiGmail,
            href: "mailto:nurannishmika22@gmail.com",
            hoverColor: "hover:text-[#EA4335]"
        },
        {
            name: "Instagram",
            icon: FaInstagram,
            href: "https://www.instagram.com/nishmika_27/",
            hoverColor: "hover:text-[#E1306C]"
        }
    ]

    return (
        <div className="fixed bottom-12 right-8 hidden flex-col items-center gap-6 md:flex z-50">
            <div className="flex flex-col gap-6">
                {socialLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target={link.name !== "Gmail" ? "_blank" : undefined}
                        rel={link.name !== "Gmail" ? "noreferrer" : undefined}
                        className={`text-zinc-500 transition-all duration-300 hover:-translate-y-1.5 ${link.hoverColor} dark:text-zinc-500`}
                        title={link.name}
                    >
                        <link.icon className="h-6 w-6" />
                    </a>
                ))}
            </div>
        </div>
    )
}
