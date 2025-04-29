'use client';
import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useCategories } from '@/hooks/useCategories';
import { products } from '@/data/products';

const ProductsPage = () => {
	const { categories } = useCategories();
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000]);
	const [sortOption, setSortOption] = useState('featured');
	const [showFilters, setShowFilters] = useState(false);

	// Filter products by category
	let filteredProducts =
		activeFilters.length > 0
			? products.filter((product) => activeFilters.includes(product.categoryId))
			: products;

	// Filter products by price range
	filteredProducts = filteredProducts.filter(
		(product) =>
			product.price >= priceRange[0] && product.price <= priceRange[1]
	);

	// Sort products
	switch (sortOption) {
		case 'price-asc':
			filteredProducts = [...filteredProducts].sort(
				(a, b) => a.price - b.price
			);
			break;
		case 'price-desc':
			filteredProducts = [...filteredProducts].sort(
				(a, b) => b.price - a.price
			);
			break;
		case 'rating':
			filteredProducts = [...filteredProducts].sort(
				(a, b) => b.rating - a.rating
			);
			break;
		case 'newest':
			// In a real app, we would sort by date
			filteredProducts = [...filteredProducts];
			break;
		default:
			// featured is default
			filteredProducts = [...filteredProducts].sort(
				(a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
			);
	}

	const handleCategoryToggle = (categoryId: string) => {
		if (activeFilters.includes(categoryId)) {
			setActiveFilters(activeFilters.filter((id) => id !== categoryId));
		} else {
			setActiveFilters([...activeFilters, categoryId]);
		}
	};

	const handlePriceChange = (index: number, value: number) => {
		const newRange = [...priceRange] as [number, number];
		newRange[index] = value;
		setPriceRange(newRange);
	};

	const clearFilters = () => {
		setActiveFilters([]);
		setPriceRange([0, 6000]);
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(price);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl md:text-3xl font-bold mb-6">Todos os Produtos</h1>

			{/* Mobile Filter Controls */}
			<div className="lg:hidden mb-6">
				<Button
					variant="outline"
					className="w-full flex items-center justify-between"
					onClick={() => setShowFilters(!showFilters)}
				>
					<span className="flex items-center">
						<Filter size={16} className="mr-2" />
						Filtros
					</span>
					{showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
				</Button>
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* Filters Sidebar */}
				<div className={`lg:w-1/4 ${!showFilters && 'hidden'} lg:block`}>
					<div className="bg-white p-6 rounded-lg shadow-sm">
						<div className="flex justify-between items-center mb-4">
							<h2 className="font-medium text-lg">Filtros</h2>
							<Button
								variant="ghost"
								className="text-market-neutral-600 text-sm h-8 px-2"
								onClick={clearFilters}
							>
								Limpar
							</Button>
						</div>

						{/* Categories Filter */}
						<div className="mb-6">
							<h3 className="font-medium mb-3">Categorias</h3>
							<div className="space-y-2">
								{categories.map((category) => (
									<label
										key={category.id}
										className="flex items-center cursor-pointer"
									>
										<input
											type="checkbox"
											checked={activeFilters.includes(category.id)}
											onChange={() => handleCategoryToggle(category.id)}
											className="rounded border-market-neutral-300 text-market-green focus:ring-market-green mr-2"
										/>
										<span>{category.name}</span>
									</label>
								))}
							</div>
						</div>

						{/* Price Range Filter */}
						<div>
							<h3 className="font-medium mb-3">Faixa de Preço</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm mb-1">
										Mínimo: {formatPrice(priceRange[0])}
									</label>
									<input
										type="range"
										min={0}
										max={6000}
										step={100}
										value={priceRange[0]}
										onChange={(e) =>
											handlePriceChange(0, Number(e.target.value))
										}
										className="w-full h-2 bg-market-neutral-200 rounded-lg appearance-none cursor-pointer"
									/>
								</div>
								<div>
									<label className="block text-sm mb-1">
										Máximo: {formatPrice(priceRange[1])}
									</label>
									<input
										type="range"
										min={0}
										max={6000}
										step={100}
										value={priceRange[1]}
										onChange={(e) =>
											handlePriceChange(1, Number(e.target.value))
										}
										className="w-full h-2 bg-market-neutral-200 rounded-lg appearance-none cursor-pointer"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Product List */}
				<div className="lg:w-3/4">
					{/* Sort Controls */}
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
						<p className="text-market-neutral-700 mb-3 sm:mb-0">
							Mostrando {filteredProducts.length} produtos
						</p>

						<div className="flex items-center">
							<span className="mr-2 text-market-neutral-700">Ordenar por:</span>
							<select
								value={sortOption}
								onChange={(e) => setSortOption(e.target.value)}
								className="border border-market-neutral-300 rounded-md p-2 text-market-neutral-800 focus:outline-none focus:ring-1 focus:ring-market-green"
							>
								<option value="featured">Destaque</option>
								<option value="price-asc">Menor Preço</option>
								<option value="price-desc">Maior Preço</option>
								<option value="rating">Melhor Avaliação</option>
								<option value="newest">Mais Recentes</option>
							</select>
						</div>
					</div>

					{filteredProducts.length === 0 ? (
						<div className="text-center py-12 bg-white rounded-lg shadow-sm">
							<h2 className="text-xl font-medium text-market-neutral-900 mb-2">
								Nenhum produto encontrado
							</h2>
							<p className="text-market-neutral-700 mb-6">
								Tente alterar seus filtros para encontrar o que procura
							</p>
							<Button onClick={clearFilters}>Limpar Filtros</Button>
						</div>
					) : (
						<ProductGrid products={filteredProducts} />
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductsPage;
