import { ProductCategory } from '@/types/product';

/**
 * Product Categories Data
 * 
 * ADMIN PANEL INTEGRATION:
 * When admin panel is added, this file will be replaced with API calls to a database.
 * The admin panel will allow:
 * - Creating new categories
 * - Editing category details (name, description, image)
 * - Toggling homepage visibility (displayOnHomepage)
 * - Reordering categories (displayOrder)
 * - Activating/deactivating categories (status)
 * - Managing product assignments (productIds)
 */

export const categories: ProductCategory[] = [
    {
        id: 'miniature-temples',
        name: 'Miniature Temples',
        slug: 'miniature-temples',
        description: 'Precision-engineered replicas of world heritage temples. Each piece captures sacred geometry and architectural mastery in museum-quality detail.',
        extendedDescription: 'From the golden spires of Asian pagodas to the intricate carvings of ancient temples, we transform architectural heritage into tangible art. Every detail is preserved, every proportion honored.',
        imageUrl: '/temples.png',
        productIds: [
            'south-indian-temple',
            'mini-ganesha-mandir',
            'traditional-indian-temple'
        ],
        displayOnHomepage: true,
        displayOrder: 1,
        status: 'active',
        createdAt: '2026-01-10T00:00:00Z',
        updatedAt: '2026-01-14T21:00:00Z'
    },
    {
        id: 'architect-models',
        name: 'Architect Models',
        slug: 'architect-models',
        description: 'Contemporary interpretations of Asian architectural heritage. Miniature models of temples, forts, and monuments reimagined with modern aesthetics.',
        extendedDescription: 'Where tradition meets innovation. Each model blends the timeless beauty of Asian architecture with contemporary design sensibilities, creating pieces that honor the past while embracing the future.',
        imageUrl: '/architectures.png',
        productIds: [],
        displayOnHomepage: true,
        displayOrder: 2,
        status: 'active',
        createdAt: '2026-01-14T00:00:00Z',
        updatedAt: '2026-01-14T00:00:00Z'
    }
];

/**
 * Get all active categories
 */
export function getActiveCategories(): ProductCategory[] {
    return categories.filter(cat => cat.status === 'active');
}

/**
 * Get categories to display on homepage
 * Filtered by displayOnHomepage flag and sorted by displayOrder
 */
export function getHomepageCategories(): ProductCategory[] {
    return categories
        .filter(cat => cat.status === 'active' && cat.displayOnHomepage)
        .sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Get a single category by ID
 */
export function getCategoryById(id: string): ProductCategory | undefined {
    return categories.find(cat => cat.id === id);
}

/**
 * Get a single category by slug
 */
export function getCategoryBySlug(slug: string): ProductCategory | undefined {
    return categories.find(cat => cat.slug === slug);
}
