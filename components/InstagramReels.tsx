"use client";

import { motion } from "framer-motion";

const REELS = [
    {
        id: 1,
        url: "https://www.instagram.com/reel/DS7A7OgCXho/",
        embedUrl: "https://www.instagram.com/reel/DS7A7OgCXho/embed",
    },
    {
        id: 2,
        url: "https://www.instagram.com/reel/DSxqPF7jGma/",
        embedUrl: "https://www.instagram.com/reel/DSxqPF7jGma/embed",
    },
    {
        id: 3,
        url: "https://www.instagram.com/reel/DSuiW2ZjG9o/",
        embedUrl: "https://www.instagram.com/reel/DSuiW2ZjG9o/embed",
    },
    {
        id: 4,
        url: "https://www.instagram.com/reel/DRRQR-YCdFu/",
        embedUrl: "https://www.instagram.com/reel/DRRQR-YCdFu/embed",
    },
];

export function InstagramReels() {
    return (
        <section className="py-32 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    Our Work in Action
                </motion.h2>
                <motion.p
                    className="text-center text-gray-600 mb-20 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Follow our journey on{" "}
                    <a href="https://www.instagram.com/3layered.global?igsh=MTZ5bjR0MXBidXNyZQ==" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">
                        Instagram
                    </a>
                </motion.p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {REELS.map((reel, index) => (
                        <motion.div
                            key={reel.id}
                            className="aspect-[9/16] bg-white border border-gray-200 hover:border-black transition-all cursor-pointer overflow-hidden group rounded-lg shadow-sm"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3 + (index * 0.1),
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                        >
                            <a
                                href={reel.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full"
                            >
                                <iframe
                                    src={reel.embedUrl}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    scrolling="no"
                                    allowTransparency={true}
                                    allow="encrypted-media"
                                />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
