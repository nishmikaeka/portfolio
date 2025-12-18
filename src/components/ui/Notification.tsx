"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, X } from "lucide-react"

interface NotificationProps {
    isVisible: boolean
    message: string
    type: "success" | "error"
    onClose: () => void
}

export function Notification({ isVisible, message, type, onClose }: NotificationProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose()
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [isVisible, onClose])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
                >
                    <div className="flex items-center gap-3">
                        {type === "success" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                            {message}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 w-full origin-left bg-zinc-100 dark:bg-zinc-800"
                        style={{ borderRadius: "0 0 12px 12px" }}
                    >
                        <div
                            className={`h-full w-full ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
                            style={{ borderRadius: "0 0 12px 12px" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
