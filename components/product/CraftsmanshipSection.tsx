'use client';

import { CraftsmanshipSection as CraftsmanshipSectionType } from '@/types/product';
import { Package, Paintbrush, Factory, Sparkles } from 'lucide-react';

interface CraftsmanshipSectionProps {
    data: CraftsmanshipSectionType;
}

export function CraftsmanshipSection({ data }: CraftsmanshipSectionProps) {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        Craftsmanship & Materials
                    </h2>
                    <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                        Every detail engineered for lasting beauty and architectural precision
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Material */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Package className="w-6 h-6" />
                            <h3 className="text-xl font-light tracking-wide">Material</h3>
                        </div>
                        <h4 className="text-2xl font-light">{data.material.name}</h4>
                        <p className="text-gray-600 leading-relaxed">
                            {data.material.description}
                        </p>
                        <ul className="space-y-2">
                            {data.material.properties.map((prop, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                    <span className="text-black">•</span>
                                    <span className="text-gray-700">{prop}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Finish */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Paintbrush className="w-6 h-6" />
                            <h3 className="text-xl font-light tracking-wide">Finish</h3>
                        </div>
                        <h4 className="text-2xl font-light">{data.finish.type}</h4>
                        <p className="text-gray-600 leading-relaxed">
                            {data.finish.description}
                        </p>
                        {data.finish.handFinished && (
                            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 text-sm">
                                <Sparkles className="w-4 h-4" />
                                <span>Hand-Finished</span>
                            </div>
                        )}
                    </div>

                    {/* Process */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Factory className="w-6 h-6" />
                            <h3 className="text-xl font-light tracking-wide">Process</h3>
                        </div>
                        <h4 className="text-2xl font-light">{data.process.method}</h4>
                        <p className="text-gray-600 leading-relaxed">
                            {data.process.description}
                        </p>
                        {data.process.steps && (
                            <details className="mt-4">
                                <summary className="cursor-pointer text-sm underline hover:no-underline">
                                    View detailed process
                                </summary>
                                <ol className="mt-4 space-y-2 list-decimal list-inside text-sm text-gray-600">
                                    {data.process.steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </details>
                        )}
                    </div>

                    {/* Care */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-6 h-6" />
                            <h3 className="text-xl font-light tracking-wide">Care & Durability</h3>
                        </div>
                        <h4 className="text-2xl font-light">{data.care.durability}</h4>
                        <ul className="space-y-2 mt-4">
                            {data.care.instructions.map((instruction, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <span className="text-black mt-1">→</span>
                                    <span className="text-gray-700">{instruction}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
