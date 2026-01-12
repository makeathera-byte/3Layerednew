"use client";

const REELS = [
    {
        id: 1,
        thumbnail: "/reels/reel1.jpg",
        title: "Precision Layer Demonstration",
    },
    {
        id: 2,
        thumbnail: "/reels/reel2.jpg",
        title: "Custom Part Assembly",
    },
    {
        id: 3,
        thumbnail: "/reels/reel3.jpg",
        title: "3D Printing Time-lapse",
    },
    {
        id: 4,
        thumbnail: "/reels/reel4.jpg",
        title: "Quality Control Process",
    },
];

export function InstagramReels() {
    return (
        <section className="py-24 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">
                    Our Work in Action
                </h2>
                <p className="text-center text-gray-600 mb-16">
                    Follow our journey on{" "}
                    <a href="https://www.instagram.com/3layered.global?igsh=MTZ5bjR0MXBidXNyZQ==" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                        Instagram
                    </a>
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {REELS.map((reel) => (
                        <div
                            key={reel.id}
                            className="aspect-[9/16] bg-gray-200 hover:opacity-80 transition-opacity cursor-pointer overflow-hidden group"
                        >
                            {/* Placeholder for Instagram embed */}
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200">
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 mx-auto mb-2 bg-gray-400 rounded-full" />
                                    <p className="text-sm text-gray-600 font-medium">{reel.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
