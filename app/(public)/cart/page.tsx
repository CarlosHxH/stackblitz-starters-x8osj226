'use client';
import { useState } from 'react';
import {
	ShoppingCart,
	Trash2,
	ChevronLeft,
	Plus,
	Minus,
	Truck,
	CreditCard,
	Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getFeaturedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { calculateShipping } from '@/lib/shipping';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const CartPage = () => {
	const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } =
		useCart();
	const [deliveryCep, setDeliveryCep] = useState('');
	const [isCheckingOut, setIsCheckingOut] = useState(false);
	const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
	const [shippingOptions, setShippingOptions] = useState<any[]>([]);
	const [selectedShipping, setSelectedShipping] = useState<string | null>(null);

	const featuredProducts = getFeaturedProducts().slice(0, 4);

	// Format the price with Brazilian currency
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(price);
	};

	// Get the selected shipping cost
	const getSelectedShippingCost = () => {
		if (!selectedShipping || !shippingOptions.length) return 0;
		const option = shippingOptions.find((opt) => opt.id === selectedShipping);
		return option ? option.cost : 0;
	};

	// Calculate shipping cost
	const shippingCost = getSelectedShippingCost();

	// Calculate total with shipping
	const totalWithShipping = totalPrice + shippingCost;

	// Handle CEP input formatting
	const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '');
		if (value.length <= 8) {
			// Format as 00000-000
			if (value.length > 5) {
				setDeliveryCep(`${value.substring(0, 5)}-${value.substring(5)}`);
			} else {
				setDeliveryCep(value);
			}
		}
	};

	// Calculate shipping
	const handleCalculateShipping = async () => {
		if (deliveryCep.length < 8) {
			toast.error('Por favor, digite um CEP válido');
			return;
		}

		setIsCalculatingShipping(true);
		try {
			const options = await calculateShipping(deliveryCep);
			setShippingOptions(options);
			setSelectedShipping(options[0]?.id || null);
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Erro ao calcular frete'
			);
		} finally {
			setIsCalculatingShipping(false);
		}
	};

	// Handle checkout
	const handleCheckout = () => {
		if (!selectedShipping && cartItems.length > 0) {
			toast.error('Por favor, calcule o frete antes de continuar');
			return;
		}

		setIsCheckingOut(true);
		// In a real app, this would redirect to checkout or payment page
		setTimeout(() => {
			clearCart();
			setIsCheckingOut(false);
			toast.success(
				'Pedido realizado com sucesso! Em um app real, você seria redirecionado para a página de pagamento.'
			);
		}, 1500);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
				<ShoppingCart className="mr-3" />
				Seu Carrinho
			</h1>

			{cartItems.length === 0 ? (
				<div className="text-center py-12 bg-white rounded-lg shadow-sm">
					<div className="mb-4 p-6 inline-block bg-market-neutral-100 rounded-full">
						<ShoppingCart size={48} className="text-market-neutral-400" />
					</div>
					<h2 className="text-xl font-medium text-market-neutral-900 mb-2">
						Seu carrinho está vazio
					</h2>
					<p className="text-market-neutral-700 mb-6">
						Adicione produtos para continuar suas compras
					</p>
					<Link href="/products">
						<Button>Continuar Comprando</Button>
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
							{/* Cart Header */}
							<div className="px-6 py-4 border-b border-market-neutral-200 flex justify-between">
								<span className="font-medium">Produto</span>
								<span className="font-medium hidden md:block">Subtotal</span>
							</div>

							{/* Cart Items List */}
							{cartItems.map((item) => {
								const price = item.product.discount
									? item.product.price * (1 - item.product.discount / 100)
									: item.product.price;
								const subtotal = price * item.quantity;

								return (
									<div
										key={item.id}
										className="px-6 py-4 border-b border-market-neutral-200 last:border-0"
									>
										<div className="flex flex-col md:flex-row md:items-center justify-between">
											{/* Product Info */}
											<div className="flex items-center space-x-4">
												{/* Product Image */}
												<Link
													href={`/product/${item.id}`}
													className="flex-shrink-0"
												>
													<img
														src={item.product.image}
														alt={item.product.name}
														className="w-16 h-16 object-cover rounded"
													/>
												</Link>

												{/* Product Details */}
												<div className="flex flex-col">
													<Link
														href={`/product/${item.id}`}
														className="font-medium text-market-neutral-900 hover:text-market-green line-clamp-1"
													>
														{item.product.name}
													</Link>
													<span className="text-market-neutral-600 text-sm">
														Vendido por {item.product.seller.name}
													</span>

													<div className="mt-1 flex items-center">
														<span className="text-market-green font-medium mr-2">
															{formatPrice(price)}
														</span>

														{item.product.discount &&
															item.product.discount > 0 && (
																<span className="line-through text-market-neutral-500 text-sm">
																	{formatPrice(item.product.price)}
																</span>
															)}
													</div>

													{/* Mobile Subtotal */}
													<div className="md:hidden mt-2">
														<span className="font-medium">
															Subtotal: {formatPrice(subtotal)}
														</span>
													</div>
												</div>
											</div>

											{/* Quantity and Subtotal */}
											<div className="flex items-center mt-3 md:mt-0">
												<div className="flex items-center border border-market-neutral-300 rounded-md">
													<button
														className="p-1 text-market-neutral-500 hover:text-market-neutral-800 disabled:opacity-50"
														onClick={() =>
															updateQuantity(item.id, item.quantity - 1)
														}
														disabled={item.quantity <= 1}
													>
														<Minus size={14} />
													</button>
													<span className="px-3 py-1 border-x border-market-neutral-300">
														{item.quantity}
													</span>
													<button
														className="p-1 text-market-neutral-500 hover:text-market-neutral-800 disabled:opacity-50"
														onClick={() =>
															updateQuantity(item.id, item.quantity + 1)
														}
														disabled={item.quantity >= item.product.stock}
													>
														<Plus size={14} />
													</button>
												</div>

												{/* Delete Button */}
												<button
													className="ml-2 p-2 text-market-neutral-500 hover:text-red-500"
													onClick={() => removeFromCart(item.id)}
													aria-label="Remove item"
												>
													<Trash2 size={18} />
												</button>

												{/* Desktop Subtotal */}
												<div className="hidden md:block ml-8">
													<span className="font-medium">
														{formatPrice(subtotal)}
													</span>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>

						<div className="flex justify-between mb-8">
							<Link
								href="/products"
								className="text-market-green hover:underline flex items-center"
							>
								<ChevronLeft size={16} className="mr-1" />
								Continuar Comprando
							</Link>

							<Button
								variant="outline"
								className="text-market-neutral-700"
								onClick={clearCart}
							>
								<Trash2 size={16} className="mr-2" />
								Limpar Carrinho
							</Button>
						</div>
					</div>

					{/* Order Summary */}
					<div>
						<div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
							<h3 className="text-lg font-medium mb-4">Resumo do Pedido</h3>

							<div className="space-y-3 mb-6">
								<div className="flex justify-between">
									<span className="text-market-neutral-700">Subtotal</span>
									<span>{formatPrice(totalPrice)}</span>
								</div>

								<div className="flex justify-between">
									<span className="text-market-neutral-700">Frete</span>
									<span>
										{shippingOptions.length > 0
											? formatPrice(shippingCost)
											: 'Calcular'}
									</span>
								</div>

								<div className="border-t border-market-neutral-200 pt-3 flex justify-between">
									<span className="font-medium">Total</span>
									<span className="font-bold text-market-green text-xl">
										{formatPrice(totalWithShipping)}
									</span>
								</div>
							</div>

							{/* Shipping Calculator */}
							<div className="mb-6">
								<div className="flex items-center mb-2">
									<Truck size={16} className="text-market-green mr-2" />
									<h4 className="font-medium">Calcular Frete</h4>
								</div>

								<div className="flex">
									<Input
										type="text"
										placeholder="00000-000"
										value={deliveryCep}
										onChange={handleCepChange}
										className="flex-1 px-3 py-2 border border-market-neutral-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-market-green"
										maxLength={9}
									/>
									<Button
										variant="secondary"
										className="rounded-l-none"
										onClick={handleCalculateShipping}
										disabled={isCalculatingShipping}
									>
										{isCalculatingShipping ? (
											<Loader2 className="h-4 w-4 animate-spin" />
										) : (
											'Calcular'
										)}
									</Button>
								</div>

								{/* Shipping Options */}
								{shippingOptions.length > 0 && (
									<div className="mt-4">
										<RadioGroup
											value={selectedShipping || ''}
											onValueChange={setSelectedShipping}
										>
											{shippingOptions.map((option) => (
												<div
													key={option.id}
													className="flex items-center space-x-2 my-2"
												>
													<RadioGroupItem value={option.id} id={option.id} />
													<Label htmlFor={option.id} className="flex-1">
														<div className="flex justify-between">
															<span className="text-sm">{option.name}</span>
															<span className="font-medium text-sm">
																{formatPrice(option.cost)}
															</span>
														</div>
														<div className="text-xs text-market-neutral-500">
															Receba em {option.estimate.min}-
															{option.estimate.max} dias úteis
														</div>
													</Label>
												</div>
											))}
										</RadioGroup>
									</div>
								)}
							</div>

							{/* Checkout Button */}
							<Button
								size="lg"
								className="w-full"
								onClick={handleCheckout}
								disabled={isCheckingOut || cartItems.length === 0}
							>
								{isCheckingOut ? (
									<>
										<Loader2 className="mr-2 h-5 w-5 animate-spin" />
										Processando...
									</>
								) : (
									<>
										<CreditCard className="mr-2 h-5 w-5" />
										Finalizar Compra
									</>
								)}
							</Button>

							{/* Payment Methods */}
							<div className="mt-4 text-center text-xs text-market-neutral-600">
								<p className="mb-2">
									Aceitamos os seguintes métodos de pagamento
								</p>
								<div className="flex justify-center space-x-2">
									<div className="p-1 bg-market-neutral-100 rounded">
										<svg
											width="30"
											height="20"
											viewBox="0 0 30 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect width="30" height="20" rx="2" fill="#1434CB" />
											<path
												d="M11.5455 15.3125H8.72727L6.93182 8.31818C6.88196 8.12889 6.78485 7.95833 6.64045 7.80652C6.49621 7.6553 6.31061 7.55682 6.08364 7.51136V7.29545H10.4318C10.7273 7.29545 10.9621 7.37121 11.1364 7.52273C11.3106 7.67417 11.4091 7.87122 11.4318 8.11364L12.2273 12.8125C12.2348 12.8428 12.2386 12.8788 12.2386 12.9205C12.2386 12.9621 12.2386 13.0038 12.2386 13.0455L12.7955 8.11364C12.8258 7.87122 12.9242 7.67417 13.0909 7.52273C13.2576 7.37121 13.4811 7.29545 13.7614 7.29545H16.5795L15.0682 15.3125H13.5227L14.9091 8.11364H14.3864L12.0682 15.3125H11.5455ZM19.2159 15.3125H16.4886L18.1023 7.29545H20.8295L19.2159 15.3125ZM22.3068 15.3125C22.0265 15.3125 21.8004 15.2386 21.6286 15.0909C21.4569 14.9432 21.371 14.7538 21.371 14.5227C21.371 14.4736 21.371 14.4242 21.371 14.375C21.3786 14.3258 21.3862 14.2765 21.3938 14.2273L22.5114 7.29545H23.9545C24.2348 7.29545 24.4572 7.36742 24.6214 7.51136C24.7856 7.6553 24.8678 7.83335 24.8678 8.04545C24.8678 8.09091 24.8678 8.14015 24.8678 8.19318C24.8602 8.24621 24.8526 8.29924 24.8452 8.35227L23.7273 14.2273C23.7197 14.2765 23.7121 14.3258 23.7046 14.375C23.697 14.4242 23.6932 14.4736 23.6932 14.5227C23.6932 14.7462 23.7784 14.9356 23.9489 15.0909C24.1193 15.2386 24.3409 15.3125 24.6136 15.3125H22.3068Z"
												fill="white"
											/>
										</svg>
									</div>
									<div className="p-1 bg-market-neutral-100 rounded">
										<svg
											width="30"
											height="20"
											viewBox="0 0 30 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect width="30" height="20" rx="2" fill="#252525" />
											<path
												d="M11.25 13.75C13.3211 13.75 15 12.0711 15 10C15 7.92893 13.3211 6.25 11.25 6.25C9.17893 6.25 7.5 7.92893 7.5 10C7.5 12.0711 9.17893 13.75 11.25 13.75Z"
												fill="#EB001B"
											/>
											<path
												d="M18.75 13.75C20.8211 13.75 22.5 12.0711 22.5 10C22.5 7.92893 20.8211 6.25 18.75 6.25C16.6789 6.25 15 7.92893 15 10C15 12.0711 16.6789 13.75 18.75 13.75Z"
												fill="#F79E1B"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M15 6.79167C15.925 7.4 16.5834 8.41667 16.5834 9.58333C16.5834 10.75 15.925 11.7667 15 12.375C14.075 11.7667 13.4167 10.75 13.4167 9.58333C13.4167 8.41667 14.075 7.4 15 6.79167Z"
												fill="#FF5F00"
											/>
										</svg>
									</div>
									<div className="p-1 bg-market-neutral-100 rounded">
										<svg
											width="30"
											height="20"
											viewBox="0 0 30 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect width="30" height="20" rx="2" fill="#016FD0" />
											<path
												d="M15 13.3334H18.3333V6.66669H15V13.3334ZM11.6667 13.3334H15V6.66669H11.6667V13.3334ZM11.6667 10H8.33333V13.3334H5V6.66669H8.33333V10H11.6667V6.66669H15V10H11.6667ZM21.6667 13.3334H25V10H21.6667V13.3334ZM21.6667 10H25V6.66669H18.3333V13.3334H21.6667V10Z"
												fill="white"
											/>
										</svg>
									</div>
									<div className="p-1 bg-market-neutral-100 rounded">
										<svg
											width="30"
											height="20"
											viewBox="0 0 30 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect width="30" height="20" rx="2" fill="#FFCB05" />
											<path
												d="M6.66669 10C6.66669 9.07952 7.07142 8.19675 7.79032 7.53452C8.50922 6.87229 9.47671 6.5 10.4833 6.5H19.5167C20.5233 6.5 21.4908 6.87229 22.2097 7.53452C22.9286 8.19675 23.3334 9.07952 23.3334 10C23.3334 10.9205 22.9286 11.8033 22.2097 12.4655C21.4908 13.1277 20.5233 13.5 19.5167 13.5H10.4833C9.47671 13.5 8.50922 13.1277 7.79032 12.4655C7.07142 11.8033 6.66669 10.9205 6.66669 10Z"
												fill="#11A976"
											/>
											<path
												d="M15 11.3334C15.7364 11.3334 16.3333 10.7364 16.3333 10C16.3333 9.26364 15.7364 8.66669 15 8.66669C14.2636 8.66669 13.6667 9.26364 13.6667 10C13.6667 10.7364 14.2636 11.3334 15 11.3334Z"
												fill="white"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Product Recommendations */}
			<div className="mt-16">
				<ProductGrid
					products={featuredProducts}
					title="Recomendados para você"
				/>
			</div>
		</div>
	);
};

export default CartPage;
