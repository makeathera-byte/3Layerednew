'use client';

import { Navbar } from '@/components/Navbar';
import { SlideProvider } from '@/contexts/SlideContext';
import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <SlideProvider>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-black text-white rounded-full mb-6">
                            <Shield className="w-10 h-10" />
                        </div>
                        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Last updated: January 13, 2026
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white border border-gray-200 p-8 md:p-12 space-y-8">
                        <section>
                            <h2 className="font-serif text-2xl font-bold mb-4">1. Introduction</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                At 3 Layered, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-start gap-4 mb-4">
                                <Database className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="font-serif text-2xl font-bold mb-4">2. Information We Collect</h2>
                                </div>
                            </div>

                            <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We collect information that you provide directly to us, including:
                            </p>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                                <li>Name and contact information (email, phone number, address)</li>
                                <li>Account credentials</li>
                                <li>Payment information</li>
                                <li>Project specifications and design files</li>
                                <li>Communication preferences</li>
                            </ul>

                            <h3 className="font-semibold text-lg mb-3">Automatically Collected Information</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                When you use our website, we may automatically collect:
                            </p>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                <li>Device information (IP address, browser type, operating system)</li>
                                <li>Usage data (pages visited, time spent, click patterns)</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>
                        </section>

                        <section>
                            <div className="flex items-start gap-4 mb-4">
                                <Eye className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="font-serif text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                                </div>
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                <li>Process and fulfill your orders</li>
                                <li>Communicate with you about your projects</li>
                                <li>Provide customer support</li>
                                <li>Improve our services and website</li>
                                <li>Send you marketing communications (with your consent)</li>
                                <li>Detect and prevent fraud or security issues</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <div className="flex items-start gap-4 mb-4">
                                <Lock className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="font-serif text-2xl font-bold mb-4">4. Data Security</h2>
                                </div>
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-4">
                                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl font-bold mb-4">5. Information Sharing</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We do not sell your personal information. We may share your information with:
                            </p>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                <li><strong>Service Providers:</strong> Third parties who help us operate our business (payment processors, shipping companies)</li>
                                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                                <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl font-bold mb-4">6. Your Design Files</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Your submitted design files and project specifications are treated with strict confidentiality. We use them solely for the purpose of fulfilling your orders. We do not share, sell, or use your designs for any other purpose without your explicit permission.
                            </p>
                        </section>

                        <section>
                            <div className="flex items-start gap-4 mb-4">
                                <UserCheck className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="font-serif text-2xl font-bold mb-4">7. Your Rights</h2>
                                </div>
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your information</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Object to processing of your information</li>
                                <li>Request data portability</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl font-bold mb-4">8. Cookies</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use cookies and similar technologies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can control cookies through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl font-bold mb-4">9. Children's Privacy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl font-bold mb-4">10. Changes to This Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-serif text-2xl font-bold mb-4">11. Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have questions about this Privacy Policy, please contact us:
                            </p>
                            <div className="bg-gray-50 border border-gray-200 p-6 space-y-2">
                                <p className="text-gray-700"><strong>Phone:</strong> +91 99827 81000</p>
                                <p className="text-gray-700"><strong>Email:</strong> info@3layered.com</p>
                                <p className="text-gray-700"><strong>Address:</strong> Pune, Maharashtra, India</p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </SlideProvider>
    );
}
