'use client';
import { useState } from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { getDiscountedProducts } from '@/data/products';

const OffersPage = () => {
	const [filterDiscount, setFilterDiscount] = useState<number | null>(null);

	const discountedProducts = getDiscountedProducts();

	const filteredProducts = filterDiscount
		? discountedProducts.filter(
				(product) => product.discount && product.discount >= filterDiscount
		  )
		: discountedProducts;

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl md:text-3xl font-bold mb-6">
				Ofertas Imperdíveis
			</h1>

			<div className="mb-8">
				<h2 className="text-lg font-medium mb-3">Filtrar por desconto:</h2>
				<div className="flex flex-wrap gap-2">
					<Button
						variant={filterDiscount === null ? 'default' : 'outline'}
						onClick={() => setFilterDiscount(null)}
					>
						Todos
					</Button>
					<Button
						variant={filterDiscount === 10 ? 'default' : 'outline'}
						onClick={() => setFilterDiscount(10)}
					>
						10% ou mais
					</Button>
					<Button
						variant={filterDiscount === 20 ? 'default' : 'outline'}
						onClick={() => setFilterDiscount(20)}
					>
						20% ou mais
					</Button>
					<Button
						variant={filterDiscount === 30 ? 'default' : 'outline'}
						onClick={() => setFilterDiscount(30)}
					>
						30% ou mais
					</Button>
					<Button
						variant={filterDiscount === 50 ? 'default' : 'outline'}
						onClick={() => setFilterDiscount(50)}
					>
						50% ou mais
					</Button>
				</div>
			</div>

			{filteredProducts.length > 0 ? (
				<ProductGrid products={filteredProducts} />
			) : (
				<div className="bg-market-neutral-100 p-8 rounded-lg text-center">
					<h2 className="text-xl font-medium text-market-neutral-700 mb-2">
						Nenhuma oferta encontrada
					</h2>
					<p className="text-market-neutral-600">
						Tente outros filtros ou volte mais tarde para novas promoções.
					</p>
				</div>
			)}
		</div>
	);
};

export default OffersPage;
