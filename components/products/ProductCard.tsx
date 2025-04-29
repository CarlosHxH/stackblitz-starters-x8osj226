import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

interface ProductCardProps {
	product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
	const { addToCart } = useCart();

	// Format the price with Brazilian currency
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(price);
	};

	// Calculate discounted price if exists
	const finalPrice = product.discount
		? product.price * (1 - product.discount / 100)
		: product.price;

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
			{/* Product Image Container */}
			<div className="relative h-48">
				<Link href={`/product/${product.id}`}>
					<img
						src={product.image}
						alt={product.name}
						className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
					/>
				</Link>

				{/* Discount Badge */}
				{product.discount && product.discount > 0 && (
					<Badge className="absolute top-3 left-3 bg-market-orange text-white">
						-{product.discount}%
					</Badge>
				)}
			</div>

			{/* Product Content */}
			<div className="p-4 flex flex-col flex-grow">
				<Link href={`/product/${product.id}`} className="block">
					{/* Seller */}
					<p className="text-xs text-market-neutral-600 mb-1">
						{product.seller.name}
					</p>

					{/* Product Name */}
					<h3 className="font-medium text-lg text-market-neutral-900 line-clamp-2 mb-1 hover:text-market-green">
						{product.name}
					</h3>
				</Link>

				{/* Rating */}
				<div className="flex items-center mb-2">
					<div className="flex items-center">
						{[1, 2, 3, 4, 5].map((star) => (
							<svg
								key={star}
								className={`w-4 h-4 ${
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
					<span className="text-xs text-market-neutral-600 ml-1">
						({product.rating})
					</span>
				</div>

				<div className="flex-grow"></div>

				{/* Price */}
				<div className="mt-2 mb-3">
					{product.discount && product.discount > 0 ? (
						<div className="flex flex-col">
							<span className="line-through text-market-neutral-500 text-sm">
								{formatPrice(product.price)}
							</span>
							<span className="text-xl font-bold text-market-green">
								{formatPrice(finalPrice)}
							</span>
						</div>
					) : (
						<span className="text-xl font-bold text-market-green">
							{formatPrice(product.price)}
						</span>
					)}
				</div>

				{/* Delivery Info * /}
				<div className="text-xs text-market-neutral-600 mb-3">
					<span>
						Entrega em {product.deliveryEstimate.min}-
						{product.deliveryEstimate.max} dias úteis
					</span>
				</div>*/}

				{/* Add to Cart Button */}
				<Button
					className="w-full border-2 hover:bg-green-600 transition duration-700 ease-in-out"
					onClick={() => addToCart(product.id, 1)}
				>
					<ShoppingCart className="mr-2 h-4 w-4" />
					Adicionar
				</Button>
			</div>
		</div>
	);
};
