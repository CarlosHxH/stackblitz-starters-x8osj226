'use client';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetFooter,
	SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { memo } from 'react'; // Add memoization for performance
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';

// Memoize the CartSidebar component for better performance
export const CartSidebar = memo(() => {
	const {
		cartItems = [],
		updateQuantity,
		totalPrice,
		removeFromCart,
	} = useCart();

	// Calculate discounted price if exists
	const finalPrice = (product: Product) =>
		product.discount
			? product.price * (1 - product.discount / 100)
			: product.price;

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="relative">
					<ShoppingCart className="h-5 w-5" />
					{cartItems.length > 0 && (
						<span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
							{cartItems.reduce((sum: number, item) => sum + item.quantity, 0)}
						</span>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent className="w-[90vw] sm:w-[450px] text-black bg-white">
				<SheetHeader>
					<SheetTitle>Carrinho de Compras</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col gap-4 py-4 h-[calc(100vh-200px)] overflow-auto">
					{cartItems.length === 0 ? (
						<p className="text-center text-gray-500">Seu carrinho está vazio</p>
					) : (
						cartItems.map((item) => (
							<div key={item.id} className="flex gap-4 border-b pb-4">
								<img
									src={item.product.image}
									alt={item.product.name}
									className="w-20 h-20 object-cover rounded"
									loading="lazy" // Add lazy loading for performance
								/>
								<div className="flex-1">
									<h3 className="font-medium">{item.product.name}</h3>

									{/* Price */}
									<div className="mt-2 mb-3">
										{item.product.discount && item.product.discount > 0 ? (
											<div className="flex flex-col">
												<span className="line-through text-market-neutral-500 text-sm">
													{formatCurrency(item.product.price)}
												</span>
												<span className="text-md font-bold text-market-green">
													{formatCurrency(finalPrice(item.product))}
												</span>
											</div>
										) : (
											<span className="text-md font-bold text-market-green">
												{formatCurrency(item.product.price)}
											</span>
										)}
									</div>
									<div className="flex items-center gap-2 mt-2">
										<Button
											variant="outline"
											size="icon"
											onClick={() => updateQuantity(item.id, --item.quantity)}
										>
											<Minus className="h-4 w-4" />
										</Button>
										<span>{item.quantity}</span>
										<Button
											variant="outline"
											size="icon"
											onClick={() => updateQuantity(item.id, ++item.quantity)}
										>
											<Plus className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => removeFromCart(item.id)}
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						))
					)}
				</div>
				<SheetFooter>
					<div className="w-full space-y-4">
						{cartItems.length === 0 ? (
							<>
								<p className="text-center text-gray-500">
									Seu carrinho está vazio
								</p>
								<SheetTrigger className={'w-full'}>
									<Button className={'border-2 w-full'}>
										Continuar comprando
									</Button>
								</SheetTrigger>
							</>
						) : (
							<>
								<div className="flex justify-between font-medium">
									<span>Total</span>
									<span>{formatCurrency(totalPrice)}</span>
								</div>
								<SheetTrigger asChild>
									<Button asChild className={'w-full border-2'} disabled={cartItems.length === 0}>
										<Link href={"/checkout"}>Finalizar Compras</Link>
									</Button>
								</SheetTrigger>
							</>
						)}
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
});

CartSidebar.displayName = 'CartSidebar'; // Add display name for dev tools
