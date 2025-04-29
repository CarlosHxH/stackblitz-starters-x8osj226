'use client';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getProductsByCategory } from '@/data/products';
import { useCategories } from '@/hooks/useCategories';
import { useParams } from 'next/navigation';

const CategoryPage = () => {
	const { slug } = useParams<{ slug: string }>();
	const { categories } = useCategories();

	const category = categories.find((cat) => cat.slug === slug);
	const products = category ? getProductsByCategory(category.id) : [];

	if (!category) {
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h2 className="text-2xl font-bold mb-4">Categoria não encontrada</h2>
				<p className="text-market-neutral-600">
					A categoria que você está procurando não existe.
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl md:text-3xl font-bold mb-6">{category.name}</h1>

			{products.length === 0 ? (
				<div className="text-center py-12 bg-white rounded-lg shadow-sm">
					<h2 className="text-xl font-medium text-market-neutral-900 mb-2">
						Nenhum produto encontrado nesta categoria
					</h2>
					<p className="text-market-neutral-600">
						Em breve teremos novos produtos disponíveis.
					</p>
				</div>
			) : (
				<ProductGrid products={products} />
			)}
		</div>
	);
};

export default CategoryPage;
