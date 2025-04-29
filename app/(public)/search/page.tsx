'use client';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { categories as allCategories } from '@/data/categories';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const SearchPage = () => {
	const { searchQuery, onSearchQuery } = useCart();

	const searchParams = useSearchParams();
	const query = searchParams.get('q') || '';
	//const [searchQuery, setSearchQuery] = useState(query);
	const [searchResults, setSearchResults] = useState(products);

	const filteredProducts = searchQuery
		? products.filter((product) =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: products;

	useEffect(() => {
		if (query) {
			const results = products.filter((product) => {
				// Get the category name for this product
				const category = allCategories.find(
					(cat) => cat.id === product.categoryId
				);

				return (
					product.name.toLowerCase().includes(query.toLowerCase()) ||
					product.description.toLowerCase().includes(query.toLowerCase()) ||
					product.seller.name.toLowerCase().includes(query.toLowerCase()) ||
					(category &&
						category.name.toLowerCase().includes(query.toLowerCase()))
				);
			});
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	}, [query]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		//setSearchParams(searchQuery ? { q: searchQuery } : {});
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl md:text-3xl font-bold mb-6">Buscar produtos</h1>

			<form onSubmit={handleSearch} className="mb-8">
				{query ? (
					<>
						<div className="mb-6">
							<p className="text-market-neutral-700">
								{searchResults.length}{' '}
								{searchResults.length === 1 ? 'resultado' : 'resultados'} para "
								{query}"
							</p>
						</div>

						{searchResults.length > 0 ? (
							<ProductGrid products={searchResults} />
						) : (
							<div className="bg-market-neutral-100 p-8 rounded-lg text-center">
								<h2 className="text-xl font-medium text-market-neutral-700 mb-2">
									Nenhum produto encontrado
								</h2>
								<p className="text-market-neutral-600">
									Tente buscar por outro termo ou navegar por nossas categorias.
								</p>
							</div>
						)}
					</>
				) : (
					<div className="bg-market-neutral-100 p-8 rounded-lg text-center">
						<h2 className="text-xl font-medium text-market-neutral-700 mb-2">
							Digite um termo para buscar
						</h2>
						<p className="text-market-neutral-600">
							Você pode buscar por nome do produto, descrição ou categoria.
						</p>
					</div>
				)}

				<div className="flex max-w-xl mx-auto">
					<Input
						type="text"
						placeholder="O que você está procurando?"
						value={searchQuery}
						onChange={(e) => onSearchQuery(e.target.value)}
						className="flex-1 mr-2"
					/>
					<Button type="submit">
						<Search className="mr-2 h-4 w-4" />
						Buscar
					</Button>
				</div>
			</form>

			<div>
				<ProductGrid products={filteredProducts} />
			</div>
		</div>
	);
};

export default SearchPage;
