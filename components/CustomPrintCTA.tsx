"use client";

import Link from "next/link";
import { Upload, FileCheck, Settings } from "lucide-react";

const STEPS = [
    {
        icon: Upload,
        title: "Upload",
        description: "Share your design files or specifications",
    },
    {
        icon: FileCheck,
        title: "Quote",
        description: "Receive a detailed quote within 24 hours",
    },
    {
        icon: Settings,
        title: "Manufacture",
        description: "We precision-print and deliver to your door",
    },
];

export function CustomPrintCTA() {
    return (
        <section className="py-24 px-6 bg-black text-white">
            <div className="max-w-5xl mx-auto">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">
                    Custom Printing Made Simple
                </h2>
                <p className="text-center text-gray-300 mb-16 text-lg">
                    From your design to finished product in three straightforward steps
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.title} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-white mb-6">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">
                                    {index + 1}. {step.title}
                                </h3>
                                <p className="text-gray-300">{step.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center">
                    <Link href="/custom-print" className="inline-block px-12 py-4 bg-white text-black text-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                        Request a Custom Print
                    </Link>
                </div>
            </div>
        </section>
    );
}
