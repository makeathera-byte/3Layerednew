"use client";

import Image from "next/image";
import Link from "next/link";
import { getHomepageCategories } from "@/data/categories";

/**
 * Product Categories Section
 * 
 * This component displays product categories on the homepage.
 * Categories are fetched from the centralized data source (data/categories.ts).
 * 
 * ADMIN PANEL READY:
 * When admin panel is implemented, categories will be fetched from an API/database.
 * Simply replace getHomepageCategories() with an API call.
 */

export function ProductCategories() {
    // Fetch categories marked for homepage display
    const categories = getHomepageCategories();

    return (
        <section id="products" className="py-24 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16">
                    What We Create
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.slug === 'custom-print' ? '/custom-print' : `/products/category/${category.slug}`}
                            className="group bg-white border border-gray-200 hover:border-black transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                                <Image
                                    src={category.imageUrl}
                                    alt={category.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-serif text-2xl font-bold mb-3 group-hover:underline transition-all">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600">{category.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
