"use client"

import React from "react"
import AnimatedCursor from "react-animated-cursor"

export default function CustomCursor() {
    return (
        <div className="hidden md:block">
            <AnimatedCursor
                innerSize={8}
                outerSize={25}
                innerScale={1}
                outerScale={1.7}
                /* Set outerAlpha to 0 or very low to make the background transparent */
                outerAlpha={0}

                clickables={[
                    "a",
                    'input[type="text"]',
                    'input[type="email"]',
                    'input[type="number"]',
                    'input[type="submit"]',
                    'input[type="image"]',
                    "label[for]",
                    "select",
                    "textarea",
                    "button",
                    ".link",
                    ".cursor-pointer"
                ]}
                /* 1 = Instant follow (Fastest) */
                trailingSpeed={0.9}
                outerStyle={{
                    /* This creates the ring while keeping the inside clear */
                    border: "2px solid #1da1f2",
                    backgroundColor: "transparent"
                }}
                innerStyle={{
                    backgroundColor: "#1da1f2",
                }}
            />
        </div>
    )
}