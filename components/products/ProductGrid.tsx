import { ProductCard } from './ProductCard';
import { Product } from '@/data/products';

interface ProductGridProps {
	products: Product[];
	title?: string;
}

export const ProductGrid = ({ products, title }: ProductGridProps) => {
	return (
		<div className="mb-12">
			{title && (
				<h2 className="text-2xl font-bold text-market-neutral-900 mb-6">
					{title}
				</h2>
			)}

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};
