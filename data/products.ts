import { Product } from '@/types/product';
import southIndianTempleData from './products/south-indian-temple.json';
import miniGaneshaMandir from './products/mini-ganesha-mandir.json';
import traditionalIndianTempleData from './products/traditional-indian-temple.json';

// Convert JSON data to Product type with simplified structure for the list page
export const products: Product[] = [
    {
        id: southIndianTempleData.id,
        slug: southIndianTempleData.slug,
        name: southIndianTempleData.hero.productName,
        shortDescription: southIndianTempleData.hero.tagline,
        price: southIndianTempleData.hero.price.amount,
        compareAtPrice: southIndianTempleData.hero.price.compareAtPrice,
        images: southIndianTempleData.hero.gallery.map(img => img.url),
        categoryId: southIndianTempleData.categoryId,
        isFeatured: true,
        inStock: true,
        status: southIndianTempleData.status as 'draft' | 'published' | 'archived'
    },
    {
        id: miniGaneshaMandir.id,
        slug: miniGaneshaMandir.slug,
        name: miniGaneshaMandir.hero.productName,
        shortDescription: miniGaneshaMandir.hero.tagline,
        price: miniGaneshaMandir.hero.price.amount,
        compareAtPrice: miniGaneshaMandir.hero.price.compareAtPrice,
        images: miniGaneshaMandir.hero.gallery.map(img => img.url),
        categoryId: miniGaneshaMandir.categoryId,
        isFeatured: true,
        inStock: true,
        status: miniGaneshaMandir.status as 'draft' | 'published' | 'archived'
    },
    {
        id: traditionalIndianTempleData.id,
        slug: traditionalIndianTempleData.slug,
        name: traditionalIndianTempleData.hero.productName,
        shortDescription: traditionalIndianTempleData.hero.tagline,
        price: traditionalIndianTempleData.hero.price.amount,
        compareAtPrice: traditionalIndianTempleData.hero.price.compareAtPrice,
        images: traditionalIndianTempleData.hero.gallery.map(img => img.url),
        categoryId: traditionalIndianTempleData.categoryId,
        isFeatured: true,
        inStock: true,
        status: traditionalIndianTempleData.status as 'draft' | 'published' | 'archived'
    }
];

// Get product by ID
export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug);
}

// Get products by category
export function getProductsByCategory(categoryId: string): Product[] {
    return products.filter(p => p.categoryId === categoryId && p.status === 'published');
}

// Get featured products
export function getFeaturedProducts(): Product[] {
    return products.filter(p => p.isFeatured && p.status === 'published');
}
