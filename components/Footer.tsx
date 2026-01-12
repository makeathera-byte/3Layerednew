"use client";

import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="font-serif text-3xl font-bold mb-4">3 LAYERED</h3>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            Premium 3D printing services delivering precision and innovation in every layer.
                        </p>
                        <p className="text-sm text-gray-500">
                            Excellence in every layer, precision in every detail.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/custom-print" className="text-gray-400 hover:text-white transition-colors">
                                    Custom Print
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Services</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/products/category/miniature-temples" className="text-gray-400 hover:text-white transition-colors">
                                    Miniature Temples
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/category/prototypes" className="text-gray-400 hover:text-white transition-colors">
                                    Prototypes
                                </Link>
                            </li>
                            <li>
                                <Link href="/custom-print" className="text-gray-400 hover:text-white transition-colors">
                                    Custom Printing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <a href="tel:+919982781000" className="text-gray-400 hover:text-white transition-colors">
                                    +91 99827 81000
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <a href="mailto:info@3layered.com" className="text-gray-400 hover:text-white transition-colors break-all">
                                    info@3layered.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400">
                                    Pune, Maharashtra<br />India
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Instagram className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <a
                                    href="https://www.instagram.com/3layered.global?igsh=MTZ5bjR0MXBidXNyZQ=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    @3layered.global
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} 3 Layered. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
