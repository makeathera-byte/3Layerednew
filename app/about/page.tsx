'use client';

import { Navbar } from '@/components/Navbar';
import { SlideProvider } from '@/contexts/SlideContext';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <SlideProvider>
            <Navbar />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
                            About 3 Layered
                        </h1>
                        <p className="text-2xl md:text-3xl text-gray-600 font-light leading-relaxed">
                            Where architectural philosophy meets modern manufacturing
                        </p>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-16">
                            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-12 text-center">
                                Our Philosophy
                            </h2>
                            <div className="space-y-8 text-lg md:text-xl leading-relaxed text-gray-700">
                                <p className="font-light">
                                    3 Layered was built at the intersection of custom manufacturing and Asian architectural design philosophy.
                                </p>
                                <p className="font-light">
                                    Traditional Asian architecture is defined by <span className="text-black font-medium">balance</span>, <span className="text-black font-medium">proportion</span>, and <span className="text-black font-medium">intentional restraint</span>. Every element serves a purpose. Nothing exists without reason. These principles closely mirror how effective custom manufacturing should operate—precise, deliberate, and outcome-driven.
                                </p>
                                <p className="font-light">
                                    At 3 Layered, we reinterpret these architectural foundations through modern fabrication. Using advanced custom printing and manufacturing processes, we translate timeless structural logic into contemporary parts, products, and forms. The result is work that feels grounded yet modern—designed with clarity, engineered with discipline, and executed with precision.
                                </p>
                                <p className="font-light">
                                    Our approach is not about decoration or replication. It is about reviving architectural principles through function, applying them to custom-built components that perform in real-world applications.
                                </p>
                            </div>
                        </div>

                        {/* Manifesto Quote */}
                        <div className="border-l-4 border-black pl-8 py-6 my-16">
                            <p className="text-2xl md:text-3xl font-light italic text-gray-900 mb-4">
                                "This is custom manufacturing informed by architecture—where tradition guides structure, and modern technology delivers execution."
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Principles */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-serif text-5xl md:text-6xl font-bold mb-16 text-center">
                            Three Core Principles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Principle 1 */}
                            <div className="text-center">
                                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-serif font-bold mx-auto mb-6">
                                    1
                                </div>
                                <h3 className="font-serif text-2xl font-bold mb-4">Balance</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Every element exists in harmony with the whole. Form and function are inseparable, each supporting the other with purposeful precision.
                                </p>
                            </div>

                            {/* Principle 2 */}
                            <div className="text-center">
                                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-serif font-bold mx-auto mb-6">
                                    2
                                </div>
                                <h3 className="font-serif text-2xl font-bold mb-4">Proportion</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Relationships matter. Scale, ratio, and spatial logic define our work—creating pieces that feel correct, not just complete.
                                </p>
                            </div>

                            {/* Principle 3 */}
                            <div className="text-center">
                                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-serif font-bold mx-auto mb-6">
                                    3
                                </div>
                                <h3 className="font-serif text-2xl font-bold mb-4">Restraint</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Excellence through elimination. We remove the unnecessary to reveal what truly matters—clarity over complexity.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Founder Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Image Placeholder */}
                            <div className="order-2 lg:order-1">
                                <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
                                    {/* Placeholder for founder image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">⚡</div>
                                            <p className="text-sm">Founder Portrait</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="order-1 lg:order-2">
                                <div className="mb-8">
                                    <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Founder</p>
                                    <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                                        Jay Gehlot
                                    </h2>
                                </div>

                                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                    <p className="font-light">
                                        Jay Gehlot founded 3 Layered with a singular vision: to bring the timeless principles of Asian architectural thought into the realm of modern custom manufacturing.
                                    </p>
                                    <p className="font-light">
                                        Drawing from years of studying traditional temple construction, sacred geometry, and structural philosophy, Jay recognized that the same principles that created enduring monuments could revolutionize how we approach contemporary fabrication.
                                    </p>
                                    <p className="font-light">
                                        His background bridges design theory and practical engineering—understanding both why a form should exist and how to bring it into physical reality with uncompromising precision.
                                    </p>
                                    <p className="font-light">
                                        At 3 Layered, Jay has created a space where ancient architectural wisdom informs cutting-edge manufacturing—producing work that honors tradition while pushing the boundaries of what custom fabrication can achieve.
                                    </p>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <p className="text-sm text-gray-500 italic">
                                        "We're not just making parts. We're translating centuries of architectural philosophy into physical form—one precision component at a time."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Do */}
                <section className="py-24 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-serif text-5xl md:text-6xl font-bold mb-16 text-center">
                            What We Create
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Service 1 */}
                            <div className="border-2 border-gray-200 p-8 hover:border-black transition-colors duration-300">
                                <h3 className="font-serif text-2xl font-bold mb-4">Architectural Miniatures</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Museum-quality replicas of world heritage temples and structures, engineered with precision and finished by hand.
                                </p>
                                <Link href="/products/category/miniature-temples" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                                    Explore Collection <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Service 2 */}
                            <div className="border-2 border-gray-200 p-8 hover:border-black transition-colors duration-300">
                                <h3 className="font-serif text-2xl font-bold mb-4">Rapid Prototyping</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Fast-turnaround prototypes for product development, maintaining the balance between speed and quality.
                                </p>
                                <Link href="/products/category/prototypes" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                                    Get Started <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-black text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            Ready to Create Something Exceptional?
                        </h2>
                        <p className="text-xl text-gray-300 font-light mb-12 leading-relaxed">
                            Whether you're looking for architectural miniatures or custom manufacturing solutions, we bring the same precision to every project.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/products/category/miniature-temples"
                                className="inline-block bg-white text-black px-8 py-4 text-lg font-light hover:bg-gray-100 transition-colors"
                            >
                                Browse Products
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-block border-2 border-white text-white px-8 py-4 text-lg font-light hover:bg-white hover:text-black transition-colors"
                            >
                                Start Custom Project
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </SlideProvider>
    );
}
