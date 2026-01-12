import { Product } from '@/types/product';
import angkorWatData from './products/angkor-wat.json';
import borobudurData from './products/borobudur.json';
import goldenTempleData from './products/golden-temple.json';

// Convert JSON data to Product type with simplified structure for the list page
export const products: Product[] = [
    {
        id: angkorWatData.id,
        slug: angkorWatData.slug,
        name: angkorWatData.hero.productName,
        shortDescription: angkorWatData.hero.tagline,
        price: angkorWatData.hero.price.amount,
        compareAtPrice: undefined,
        images: angkorWatData.hero.gallery.map(img => img.url),
        categoryId: angkorWatData.categoryId,
        isFeatured: true,
        inStock: true,
        status: angkorWatData.status as 'draft' | 'published' | 'archived'
    },
    {
        id: borobudurData.id,
        slug: borobudurData.slug,
        name: borobudurData.hero.productName,
        shortDescription: borobudurData.hero.tagline,
        price: borobudurData.hero.price.amount,
        compareAtPrice: undefined,
        images: borobudurData.hero.gallery.map(img => img.url),
        categoryId: borobudurData.categoryId,
        isFeatured: true,
        inStock: true,
        status: borobudurData.status as 'draft' | 'published' | 'archived'
    },
    {
        id: goldenTempleData.id,
        slug: goldenTempleData.slug,
        name: goldenTempleData.hero.productName,
        shortDescription: goldenTempleData.hero.tagline,
        price: goldenTempleData.hero.price.amount,
        compareAtPrice: undefined,
        images: goldenTempleData.hero.gallery.map(img => img.url),
        categoryId: goldenTempleData.categoryId,
        isFeatured: false,
        inStock: true,
        status: goldenTempleData.status as 'draft' | 'published' | 'archived'
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
