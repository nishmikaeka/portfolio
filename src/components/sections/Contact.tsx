"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Notification } from "../ui/Notification"

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [notification, setNotification] = useState<{
        isVisible: boolean
        message: string
        type: "success" | "error"
    }>({
        isVisible: false,
        message: "",
        type: "success",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Using Formspree
            const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID

            if (!formId) {
                console.error('Formspree Form ID is not configured')
                setNotification({
                    isVisible: true,
                    message: "Form configuration missing. Please check back later.",
                    type: "error",
                })
                setIsSubmitting(false)
                return
            }

            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            })

            if (response.ok) {
                setNotification({
                    isVisible: true,
                    message: "Message sent! I'll get back to you soon.",
                    type: "success",
                })
                setFormData({ name: "", email: "", message: "" })
            } else {
                setNotification({
                    isVisible: true,
                    message: "Something went wrong. Please try again.",
                    type: "error",
                })
            }
        } catch (error) {
            console.error('Error:', error)
            setNotification({
                isVisible: true,
                message: "Network error. Please check your connection.",
                type: "error",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <section id="contact" className="flex w-full flex-col items-center justify-center gap-12 bg-white px-6 py-20 dark:bg-zinc-950 lg:px-24">
            <Notification
                isVisible={notification.isVisible}
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-1 text-center"
            >
                <h2 className="text-xl font-bold text-zinc-950 sm:text-4xl dark:text-zinc-50">Get In Touch</h2>
                <p className="max-w-2xl text-md text-zinc-600 dark:text-zinc-400">
                    Get in touch or shoot me an email directly on <strong>nurannishmika22@gmail.com</strong>
                </p>
            </motion.div>

            <div className="flex w-full max-w-2xl flex-col gap-12">
                <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col gap-6 rounded-2xl bg-zinc-50/50 p-8 dark:bg-zinc-900 shadow-sm"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="rounded-lg border border-zinc-200 bg-white p-3 outline-none focus:border-black focus:ring-1 focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 disabled:opacity-50"
                            placeholder="Your name"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="rounded-lg border border-zinc-200 bg-white p-3 outline-none focus:border-black focus:ring-1 focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 disabled:opacity-50"
                            placeholder="your.email@example.com"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            value={formData.message}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="resize-none rounded-lg border border-zinc-200 bg-white p-3 outline-none focus:border-black focus:ring-1 focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 disabled:opacity-50"
                            placeholder="How can I help you?"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 font-medium text-white transition-all hover:scale-102 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                Sending...
                            </>
                        ) : (
                            "Send Message"
                        )}
                    </button>
                </motion.form>
            </div>

            <footer className="mt-20 w-full border-t border-zinc-200 pt-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
                <p>© {new Date().getFullYear()} Nishmika. All rights reserved.</p>
            </footer>
        </section>
    )
}
