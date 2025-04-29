'use client';
import { useState } from 'react';
import { ShoppingCart, Package, ChevronLeft, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/data/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getProductsByCategory } from '@/data/products';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

const ProductPage = () => {
	const { id } = useParams<{ id: string }>();
	const { addToCart } = useCart();
	const [quantity, setQuantity] = useState(1);

	const product = id ? getProductById(id) : null;

	if (!product) {
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
				<Link href="/" className="text-market-green hover:underline">
					Voltar para a página inicial
				</Link>
			</div>
		);
	}

	const similarProducts = getProductsByCategory(product.categoryId)
		.filter((p) => p.id !== product.id)
		.slice(0, 4);

	// Calculate discounted price if exists
	const finalPrice = product.discount
		? product.price * (1 - product.discount / 100)
		: product.price;

	const handleIncreaseQuantity = () => {
		if (quantity < product.stock) {
			setQuantity(quantity + 1);
		}
	};

	const handleDecreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Breadcrumb */}
			<div className="mb-6">
				<Link
					href="/"
					className="text-market-neutral-600 hover:text-market-green flex items-center"
				>
					<ChevronLeft size={16} className="mr-1" />
					Voltar para produtos
				</Link>
			</div>

			{/* Product Details */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
				{/* Product Image */}
				<div className="bg-white rounded-lg overflow-hidden shadow-sm">
					<img
						src={product.image}
						alt={product.name}
						className="w-full h-full object-contain"
					/>
				</div>

				{/* Product Info */}
				<div>
					<p className="text-sm text-market-neutral-600 mb-1">
						Vendido por{' '}
						<span className="font-medium">{product.seller.name}</span>
					</p>

					<h1 className="text-2xl md:text-3xl font-bold text-market-neutral-900 mb-2">
						{product.name}
					</h1>

					{/* Rating */}
					<div className="flex items-center mb-4">
						<div className="flex items-center">
							{[1, 2, 3, 4, 5].map((star) => (
								<svg
									key={star}
									className={`w-5 h-5 ${
										star <= Math.round(product.rating)
											? 'text-yellow-400'
											: 'text-market-neutral-300'
									}`}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
							))}
						</div>
						<span className="text-market-neutral-600 ml-2">
							{product.rating} ({Math.round(product.rating * 10)} avaliações)
						</span>
					</div>

					{/* Price */}
					<div className="mb-6">
						{product.discount && product.discount > 0 ? (
							<div className="flex flex-col">
								<div className="flex items-center">
									<span className="bg-market-orange text-white text-sm font-medium px-2 py-1 rounded mr-3">
										-{product.discount}%
									</span>
									<span className="line-through text-market-neutral-500">
										{formatCurrency(product.price)}
									</span>
								</div>
								<span className="text-3xl font-bold text-market-green mt-1">
									{formatCurrency(finalPrice)}
								</span>
							</div>
						) : (
							<span className="text-3xl font-bold text-market-green">
								{formatCurrency(product.price)}
							</span>
						)}
					</div>

					{/* Description */}
					<div className="mb-6">
						<h2 className="text-lg font-medium mb-2">Descrição</h2>
						<p className="text-market-neutral-700">{product.description}</p>
					</div>

					{/* Stock Information */}
					<div className="mb-6">
						<p
							className={`text-sm ${
								product.stock > 0 ? 'text-market-green' : 'text-market-orange'
							}`}
						>
							{product.stock > 0
								? `${product.stock} unidades disponíveis`
								: 'Produto esgotado'}
						</p>
					</div>

					{/* Delivery Information */}
					<div className="flex items-start mb-6 bg-market-neutral-100 p-4 rounded-md">
						<Package className="text-market-green mr-3 mt-1 flex-shrink-0" />
						<div>
							<p className="font-medium mb-1">Entrega</p>
							<p className="text-market-neutral-700 text-sm">
								Entrega estimada em {product.deliveryEstimate.min}-
								{product.deliveryEstimate.max} dias úteis
							</p>
						</div>
					</div>

					{/* Quantity Selector */}
					<div className="flex items-center mb-6">
						<span className="mr-4 font-medium">Quantidade:</span>
						<div className="flex items-center border border-market-neutral-300 rounded-md">
							<button
								className="p-2 text-market-neutral-500 hover:text-market-neutral-800 disabled:opacity-50"
								onClick={handleDecreaseQuantity}
								disabled={quantity <= 1}
							>
								<Minus size={16} />
							</button>
							<span className="px-4 py-2 border-x border-market-neutral-300">
								{quantity}
							</span>
							<button
								className="p-2 text-market-neutral-500 hover:text-market-neutral-800 disabled:opacity-50"
								onClick={handleIncreaseQuantity}
								disabled={quantity >= product.stock}
							>
								<Plus size={16} />
							</button>
						</div>
					</div>

					{/* Add to Cart Button */}
					<Button
						size="lg"
						className="w-full mb-4"
						onClick={() => addToCart(product.id, quantity)}
						disabled={product.stock <= 0}
					>
						<ShoppingCart className="mr-2 h-5 w-5" />
						Adicionar ao Carrinho
					</Button>
				</div>
			</div>

			{/* Similar Products */}
			{similarProducts.length > 0 && (
				<ProductGrid products={similarProducts} title="Produtos Similares" />
			)}
		</div>
	);
};

export default ProductPage;
