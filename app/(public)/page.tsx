'use client';
import { HeroSection } from '@/components/store/HeroSection';
import { CategorySection } from '@/components/store/CategorySection';
import { ProductGrid } from '@/components/products/ProductGrid';
import { DeliveryInfo } from '@/components/store/DeliveryInfo';
import { getFeaturedProducts, getDiscountedProducts } from '@/data/products';

const Index = () => {
	const featuredProducts = getFeaturedProducts();
	const discountedProducts = getDiscountedProducts();

	return (
		<div>
			<HeroSection />
			<div className="container mx-auto px-4 py-8">
				<CategorySection />
				<ProductGrid products={featuredProducts} title="Produtos em Destaque" />
				<ProductGrid
					products={discountedProducts}
					title="Ofertas Imperdíveis"
				/>
			</div>
			<DeliveryInfo />
		</div>
	);
};

export default Index;
