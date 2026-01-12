"use client";

import { useEffect, useRef } from "react";

const BRANDS = [
    "ideal Brandzz",
    "Bella Homes",
    "Smile gifts",
    "Mittal Precision steal Auto com pvt ltd",
];

export function BrandMarquee() {
    const scrollerRef = useRef<HTMLDivElement>(null);

    return (
        <section id="work" className="py-16 border-t border-b border-gray-200 bg-white overflow-hidden">
            <p className="text-center text-sm uppercase tracking-widest text-gray-500 mb-8">
                Trusted by Industry Leaders
            </p>

            <div
                ref={scrollerRef}
                className="group flex gap-16 overflow-hidden"
                style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
            >
                {/* First set of brands */}
                <div className="flex gap-16 animate-marquee group-hover:[animation-play-state:paused]">
                    {BRANDS.map((brand, index) => (
                        <div
                            key={`${brand}-1-${index}`}
                            className="flex items-center justify-center min-w-[200px]"
                        >
                            <span className="text-2xl font-bold text-gray-300 whitespace-nowrap">
                                {brand}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Duplicate set for seamless loop */}
                <div className="flex gap-16 animate-marquee group-hover:[animation-play-state:paused]">
                    {BRANDS.map((brand, index) => (
                        <div
                            key={`${brand}-2-${index}`}
                            className="flex items-center justify-center min-w-[200px]"
                        >
                            <span className="text-2xl font-bold text-gray-300 whitespace-nowrap">
                                {brand}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
