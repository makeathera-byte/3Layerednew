"use client";

import { MapPin, Clock } from "lucide-react";

export function MapSection() {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Info */}
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">
                            Visit Our Workshop
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold mb-1">Location</h3>
                                    <p className="text-gray-600">
                                        Pune<br />
                                        Maharashtra, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Clock className="w-6 h-6 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold mb-1">Business Hours</h3>
                                    <p className="text-gray-600">
                                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                                        Saturday: 10:00 AM - 4:00 PM<br />
                                        Sunday: Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Map */}
                    <div className="h-96 bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
                        {/* Placeholder for Google Maps embed */}
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-600">Google Maps Embed</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    (Add API key for production)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
