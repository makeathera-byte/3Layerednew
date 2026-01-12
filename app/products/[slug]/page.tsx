import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/product/HeroSection';
import { StorySection } from '@/components/product/StorySection';
import { CraftsmanshipSection } from '@/components/product/CraftsmanshipSection';
import { SpecificationsSection } from '@/components/product/SpecificationsSection';
import { CustomizationSection } from '@/components/product/CustomizationSection';
import { UseCasesSection } from '@/components/product/UseCasesSection';
import { AssuranceSection } from '@/components/product/AssuranceSection';
import { ReviewsSection } from '@/components/product/ReviewsSection';
import { FAQSection } from '@/components/product/FAQSection';
import { RelatedProductsSection } from '@/components/product/RelatedProductsSection';
import { SlideProvider } from '@/contexts/SlideContext';

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params for all products
export async function generateStaticParams() {
    const products = getAllProducts();
    return products.map((product) => ({
        slug: product.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: product.seo.title,
        description: product.seo.description,
        keywords: product.seo.keywords,
        openGraph: {
            title: product.seo.title,
            description: product.seo.description,
            images: [product.seo.ogImage],
            type: 'website', // Next.js only accepts 'website' or 'article'
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <SlideProvider>
            <Navbar />
            <main className="min-h-screen">
                {/* Breadcrumb Navigation */}
                <nav className="bg-gray-50 border-b border-gray-200 pt-24 pb-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <a href="/" className="hover:text-black transition-colors">
                                Home
                            </a>
                            <span>/</span>
                            <a
                                href="/products/category/miniature-temples"
                                className="hover:text-black transition-colors"
                            >
                                Miniature Temples
                            </a>
                            <span>/</span>
                            <span className="text-black">{product.hero.productName}</span>
                        </div>
                    </div>
                </nav>

                {/* Hero Section - Always visible */}
                <HeroSection
                    data={product.hero}
                    productId={product.id}
                    productSlug={product.slug}
                />

                {/* Story Section - Conditional */}
                <StorySection data={product.story} />

                {/* Craftsmanship Section - Always visible */}
                <CraftsmanshipSection data={product.craftsmanship} />

                {/* Specifications Section - Always visible */}
                <SpecificationsSection data={product.specifications} />

                {/* Customization Section - Conditional */}
                <CustomizationSection
                    data={product.customization}
                    basePrice={product.hero.price.amount}
                    currency={product.hero.price.currency}
                    displayFormat={product.hero.price.displayFormat}
                />

                {/* Use Cases Section - Conditional */}
                <UseCasesSection data={product.useCases} />

                {/* Assurance Section - Always visible */}
                <AssuranceSection data={product.assurance} />

                {/* Reviews Section - Conditional */}
                <ReviewsSection data={product.reviews} />

                {/* FAQ Section - Conditional */}
                <FAQSection data={product.faqs} />

                {/* Related Products Section - Conditional */}
                <RelatedProductsSection
                    data={product.relatedProducts}
                    currentProductId={product.id}
                />

                {/* JSON-LD Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Product',
                            name: product.hero.productName,
                            description: product.hero.tagline,
                            image: product.hero.gallery[0]?.url,
                            offers: {
                                '@type': 'Offer',
                                price: product.hero.price.amount,
                                priceCurrency: product.hero.price.currency,
                                availability: 'https://schema.org/PreOrder',
                            },
                        }),
                    }}
                />
            </main>
        </SlideProvider>
    );
}
