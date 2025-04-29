'use client';
import { HeroSection } from '@/components/store/HeroSection';
import { CategorySection } from '@/components/store/CategorySection';
import { ProductGrid } from '@/components/products/ProductGrid';
import { DeliveryInfo } from '@/components/store/DeliveryInfo';
import { getFeaturedProducts, getDiscountedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';
import BannerSlider from '@/components/store/BannerSlider';
import { mockBanners } from '@/data/mockData';

const Index = () => {
	const featuredProducts = getFeaturedProducts();
	const discountedProducts = getDiscountedProducts();
	const { searchQuery } = useCart();

	const activeBanners = mockBanners.filter((banner) => banner.active);

	useEffect(() => {
		console.log({ searchQuery });
	}, [searchQuery]);

	return (
		<div>
			<HeroSection />
			<BannerSlider banners={activeBanners} />
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
