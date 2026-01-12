import { ProductPage } from '@/types/product';
import angkorWat from '@/data/products/angkor-wat.json';
import borobudur from '@/data/products/borobudur.json';
import goldenTemple from '@/data/products/golden-temple.json';

// In-memory product database (will be replaced with actual database later)
const products: ProductPage[] = [
    angkorWat as ProductPage,
    borobudur as ProductPage,
    goldenTemple as ProductPage,
];

/**
 * Get all published products
 */
export function getAllProducts(): ProductPage[] {
    return products.filter(p => p.status === 'published');
}

/**
 * Get a single product by its slug
 */
export function getProductBySlug(slug: string): ProductPage | undefined {
    return products.find(p => p.slug === slug && p.status === 'published');
}

/**
 * Get all products in a specific category
 */
export function getProductsByCategory(categoryId: string): ProductPage[] {
    return products.filter(
        p => p.categoryId === categoryId && p.status === 'published'
    );
}

/**
 * Get related products for a given product
 * Uses manual selection from relatedProducts section if available,
 * otherwise falls back to same category
 */
export function getRelatedProducts(
    productId: string,
    limit: number = 3
): ProductPage[] {
    const product = products.find(p => p.id === productId);
    if (!product) return [];

    // If manual related products are specified, use those
    if (
        product.relatedProducts.enabled &&
        product.relatedProducts.selectionType === 'manual'
    ) {
        const relatedIds = product.relatedProducts.products
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map(rp => rp.productId)
            .slice(0, limit);

        return relatedIds
            .map(id => products.find(p => p.id === id && p.status === 'published'))
            .filter((p): p is ProductPage => p !== undefined);
    }

    // Otherwise, get products from same category (excluding current product)
    return products
        .filter(
            p =>
                p.categoryId === product.categoryId &&
                p.id !== productId &&
                p.status === 'published'
        )
        .slice(0, limit);
}

/**
 * Get product by ID
 */
export function getProductById(id: string): ProductPage | undefined {
    return products.find(p => p.id === id && p.status === 'published');
}

/**
 * Format price for display
 */
export function formatPrice(price: ProductPage['hero']['price']): string {
    return price.displayFormat.replace('{amount}', price.amount.toLocaleString());
}
