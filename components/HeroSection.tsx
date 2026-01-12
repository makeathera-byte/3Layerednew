"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useSlide } from "@/contexts/SlideContext";

const SLIDES = [
    {
        id: 1,
        image: "https://oweufwhxnpjhdzpdqmsy.supabase.co/storage/v1/object/public/home%20page/WhatsApp_Image_2025-12-23_at_12.24.48_AM.webp",
        caption: "3D Printing Services",
        isDark: true, // Dark background image
    },
];

export function HeroSection() {
    const [mounted, setMounted] = useState(false);
    const [isTaglineVisible, setIsTaglineVisible] = useState(true);
    const { isScrolled } = useScrollPosition();
    const { setIsDarkSlide, isDarkSlide } = useSlide();
    const { scrollY } = useScroll();

    useEffect(() => {
        setMounted(true);
        // Set dark slide for the single image
        setIsDarkSlide(SLIDES[0].isDark);
    }, [setIsDarkSlide]);

    // Listen for scroll to hide tagline
    useEffect(() => {
        if (!mounted) return;

        const unsubscribe = scrollY.on('change', (latest) => {
            // Hide tagline when scroll passes 50px (same trigger as logo)
            if (latest > 50 && isTaglineVisible) {
                setIsTaglineVisible(false);
            }
            // Show if scrolled back to top
            if (latest <= 10 && !isTaglineVisible) {
                setIsTaglineVisible(true);
            }
        });

        return () => unsubscribe();
    }, [scrollY, isTaglineVisible, mounted]);

    // Determine tagline color based on slide brightness
    const getTaglineColor = () => {
        return isDarkSlide ? "#ffffff" : "#000000";
    };

    return (
        <section
            id="home"
            className="relative h-screen bg-gray-50"
        >
            {/* Hero Image Container */}
            <div className="relative h-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                    {/* Hero Image */}
                    <div className="relative w-full h-full">
                        <img
                            src={SLIDES[0].image}
                            alt={SLIDES[0].caption}
                            className="w-full h-full object-cover"
                        />
                        {/* Optional overlay for better text contrast */}
                        <div className="absolute inset-0 bg-black/10" />
                    </div>
                </div>

                {/* Bottom Left Tagline with Summary */}
                {mounted && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isTaglineVisible ? 1 : 0 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.1, 0.25, 1]
                        }}
                        style={{
                            position: "fixed",
                            left: "2rem",
                            bottom: "5rem",
                            zIndex: 90,
                            maxWidth: "450px"
                        }}
                        className="pointer-events-none"
                    >
                        {/* Background with blur for contrast */}
                        <div
                            style={{
                                backgroundColor: isDarkSlide ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: `1px solid ${isDarkSlide ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <h3
                                className="text-xl md:text-2xl font-serif italic mb-3"
                                style={{
                                    fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
                                    fontWeight: 400,
                                    letterSpacing: '0.02em',
                                    color: isDarkSlide ? '#ffffff' : '#000000',
                                    textShadow: isDarkSlide ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 8px rgba(255,255,255,0.5)',
                                    transition: 'color 0.3s ease'
                                }}
                            >
                                You Dream it, We 3D it
                            </h3>
                            <p
                                className="text-sm md:text-base leading-relaxed"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 300,
                                    lineHeight: '1.6',
                                    color: isDarkSlide ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                                    transition: 'color 0.3s ease'
                                }}
                            >
                                Transforming your ideas into reality with precision 3D printing. From intricate temple models to architectural masterpieces and custom prints.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Logo rendered by LogoController component */}

                {/* Shop Now Button - Bottom Right */}
                <div className="absolute bottom-12 right-12 z-10">
                    <a
                        href="#products"
                        className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-all duration-200 shadow-lg group"
                    >
                        <span>Shop Now</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
