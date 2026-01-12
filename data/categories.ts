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
        imageUrl: '/temples.png',
        productIds: [
            'angkor-wat-temple',
            'borobudur-temple',
            'golden-temple'
        ],
        displayOnHomepage: true,
        displayOrder: 1,
        status: 'active',
        createdAt: '2026-01-10T00:00:00Z',
        updatedAt: '2026-01-11T12:34:00Z'
    },
    {
        id: 'prototypes',
        name: 'Prototypes',
        slug: 'prototypes',
        description: 'Rapid prototyping services for product development and design validation.',
        imageUrl: '/prototypes.png',
        productIds: [],
        displayOnHomepage: false,
        displayOrder: 3,
        status: 'active',
        createdAt: '2026-01-10T00:00:00Z',
        updatedAt: '2026-01-10T00:00:00Z'
    },
    {
        id: 'custom-parts',
        name: 'Custom Parts',
        slug: 'custom-parts',
        description: 'Precision-manufactured custom components for engineering and manufacturing needs.',
        imageUrl: '/custom-parts.png',
        productIds: [],
        displayOnHomepage: false,
        displayOrder: 4,
        status: 'active',
        createdAt: '2026-01-10T00:00:00Z',
        updatedAt: '2026-01-10T00:00:00Z'
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
