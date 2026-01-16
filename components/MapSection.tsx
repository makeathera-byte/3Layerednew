"use client";

import { MapPin, Clock } from "lucide-react";

export function MapSection() {
    // Google Maps Embed API configuration
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const address = "Sukwani Artize, BRT Link Rd, Ravet, Pimpri-Chinchwad, Maharashtra 412101, India";
    const encodedLocation = encodeURIComponent(address);

    // Construct the Google Maps Embed URL
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedLocation}&zoom=15`;

    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Info */}
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">
                            Visit Our Workshop
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            Professional 3D printing services and architectural model makers in Pimpri-Chinchwad, Maharashtra
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold mb-1">Location</h3>
                                    <p className="text-gray-600">
                                        Sukwani Artize<br />
                                        BRT Link Rd, Ravet<br />
                                        Pimpri-Chinchwad, Maharashtra 412101<br />
                                        India
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
                        {apiKey ? (
                            <iframe
                                src={mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Workshop Location Map"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                    <p className="text-gray-600">Google Maps Embed</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        API key required
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
