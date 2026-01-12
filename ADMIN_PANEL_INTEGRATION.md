# Admin Panel Integration Guide

## Category Management

### Current Setup
Product categories are currently stored in `data/categories.ts` as a static TypeScript file. This setup is designed to be easily replaceable with a database-backed API when the admin panel is implemented.

### Data Structure
Each category includes:
- **Basic Info**: `id`, `name`, `slug`, `description`, `imageUrl`
- **Product Association**: `productIds` array
- **Admin Controls**:
  - `displayOnHomepage`: Toggle visibility on the homepage
  - `displayOrder`: Control the order of appearance (lower numbers appear first)
  - `status`: `'active' | 'inactive' | 'draft'`
  - `createdAt`, `updatedAt`: Timestamps

### Admin Panel Features Needed

#### Category CRUD Operations
1. **Create Category**
   - Form fields: name, slug, description, image upload
   - Auto-generate slug from name (editable)
   - Set defaults: `status: 'draft'`, `displayOnHomepage: false`, `displayOrder: 999`

2. **Edit Category**
   - Update all fields
   - Reorder categories via drag-and-drop
   - Upload/replace category image

3. **Delete Category**
   - Soft delete (set `status: 'inactive'`)
   - Warn if category has products assigned

4. **Toggle Homepage Display**
   - Quick toggle switch for `displayOnHomepage`
   - Preview changes before publishing

#### Product Assignment
- Assign/unassign products to categories
- Drag-and-drop interface to reorder products within a category
- Bulk operations (assign multiple products at once)

### Database Schema
When implementing the database, use this structure:

```sql
CREATE TABLE categories (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    display_on_homepage BOOLEAN DEFAULT false,
    display_order INT DEFAULT 999,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE category_products (
    category_id VARCHAR(255),
    product_id VARCHAR(255),
    display_order INT DEFAULT 0,
    PRIMARY KEY (category_id, product_id),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### API Endpoints
Create these API routes for admin operations:

```
GET    /api/admin/categories              - List all categories
GET    /api/admin/categories/:id          - Get single category
POST   /api/admin/categories              - Create new category
PUT    /api/admin/categories/:id          - Update category
DELETE /api/admin/categories/:id          - Delete category
PATCH  /api/admin/categories/:id/toggle   - Toggle homepage display
PATCH  /api/admin/categories/reorder      - Bulk reorder categories
POST   /api/admin/categories/:id/products - Assign product to category
DELETE /api/admin/categories/:id/products/:productId - Remove product from category
```

### Migration Steps

1. **Setup Database**
   - Create tables as per schema above
   - Add indexes on `slug`, `status`, `display_on_homepage`

2. **Create API Routes**
   - Implement all CRUD endpoints
   - Add authentication/authorization middleware

3. **Update Data Layer**
   - Replace `data/categories.ts` exports with API calls
   - Keep the same function signatures (`getHomepageCategories()`, etc.)
   - Example:
   ```typescript
   export async function getHomepageCategories(): Promise<ProductCategory[]> {
       const response = await fetch('/api/categories?homepage=true');
       const data = await response.json();
       return data;
   }
   ```

4. **Build Admin UI**
   - Category list page with table/grid view
   - Category form (create/edit)
   - Drag-and-drop reordering interface
   - Image upload component
   - Product assignment interface

5. **Add Caching**
   - Implement caching for public-facing category queries
   - Invalidate cache on admin updates

### Files to Update for Admin Panel

#### Frontend Components
- `components/ProductCategories.tsx` - Already admin-ready, just needs API integration
- `app/products/category/[categoryId]/page.tsx` - Update to fetch from API

#### Data Layer
- `data/categories.ts` - Replace with API client functions
- `lib/categories.ts` - Create this file for API calls

#### Admin Pages (New)
- `app/admin/categories/page.tsx` - Category list
- `app/admin/categories/new/page.tsx` - Create category
- `app/admin/categories/[id]/edit/page.tsx` - Edit category

#### API Routes (New)
- `app/api/admin/categories/route.ts`
- `app/api/admin/categories/[id]/route.ts`
- `app/api/categories/route.ts` - Public endpoint for frontend

### Testing Checklist
- [ ] Create category via admin panel
- [ ] Edit category details
- [ ] Upload category image
- [ ] Toggle homepage visibility
- [ ] Reorder categories
- [ ] Assign products to category
- [ ] Delete category (soft delete)
- [ ] Verify changes appear on homepage immediately
- [ ] Test with inactive/draft categories (shouldn't show)
- [ ] Performance test with 50+ categories

### Notes
- All category images should be stored in `/public/categories/` or uploaded to cloud storage (e.g., AWS S3, Cloudinary)
- Consider using Next.js Image Optimization for category images
- Implement optimistic UI updates for better UX
- Add loading states and error handling
- Consider implementing category SEO fields (meta title, meta description)
