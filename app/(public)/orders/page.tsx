'use client';
import { useState } from 'react';
import { Package, ChevronDown, ChevronUp, Truck, Clock } from 'lucide-react';
import Link from 'next/link';

// Simulated order data for demonstration
const mockOrders = [
	{
		id: 'ORD12345',
		date: '2023-10-15',
		total: 429.97,
		status: 'Entregue',
		items: [
			{
				id: '1',
				name: 'Smartphone Galaxy X Pro',
				price: 2249.99,
				quantity: 1,
				image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=Smartphone',
			},
			{
				id: '6',
				name: 'Cafeteira Elétrica Programável',
				price: 379.99,
				quantity: 1,
				image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=Cafeteira',
			},
		],
		shipping: {
			address: 'Rua das Flores, 123, Apto 42',
			city: 'São Paulo',
			state: 'SP',
			postalCode: '01234-567',
			tracking: 'BR123456789',
		},
		deliveredAt: '2023-10-20',
	},
	{
		id: 'ORD12346',
		date: '2023-11-03',
		total: 299.9,
		status: 'Em Trânsito',
		items: [
			{
				id: '4',
				name: 'Tênis Esportivo Corrida',
				price: 254.92,
				quantity: 1,
				image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=Tenis',
			},
		],
		shipping: {
			address: 'Rua das Flores, 123, Apto 42',
			city: 'São Paulo',
			state: 'SP',
			postalCode: '01234-567',
			tracking: 'BR987654321',
			estimatedDelivery: '2023-11-10',
		},
	},
	{
		id: 'ORD12347',
		date: '2023-11-08',
		total: 5699.9,
		status: 'Processando',
		items: [
			{
				id: '7',
				name: 'Notebook UltraSlim',
				price: 5699.9,
				quantity: 1,
				image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=Notebook',
			},
		],
		shipping: {
			address: 'Rua das Flores, 123, Apto 42',
			city: 'São Paulo',
			state: 'SP',
			postalCode: '01234-567',
		},
	},
];

const OrdersPage = () => {
	const [orders] = useState(mockOrders);
	const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

	// Format the price with Brazilian currency
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(price);
	};

	// Format the date in Brazilian format
	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		};
		return new Date(dateString).toLocaleDateString('pt-BR', options);
	};

	const toggleOrderExpand = (orderId: string) => {
		if (expandedOrder === orderId) {
			setExpandedOrder(null);
		} else {
			setExpandedOrder(orderId);
		}
	};

	const getStatusClass = (status: string) => {
		switch (status) {
			case 'Entregue':
				return 'bg-green-100 text-green-800';
			case 'Em Trânsito':
				return 'bg-blue-100 text-blue-800';
			case 'Processando':
				return 'bg-yellow-100 text-yellow-800';
			default:
				return 'bg-market-neutral-100 text-market-neutral-800';
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Entregue':
				return <Package className="w-5 h-5" />;
			case 'Em Trânsito':
				return <Truck className="w-5 h-5" />;
			case 'Processando':
				return <Clock className="w-5 h-5" />;
			default:
				return <Package className="w-5 h-5" />;
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl md:text-3xl font-bold mb-6">Meus Pedidos</h1>

			{orders.length === 0 ? (
				<div className="text-center py-12 bg-white rounded-lg shadow-sm">
					<div className="mb-4 p-6 inline-block bg-market-neutral-100 rounded-full">
						<Package size={48} className="text-market-neutral-400" />
					</div>
					<h2 className="text-xl font-medium text-market-neutral-900 mb-2">
						Você ainda não fez nenhum pedido
					</h2>
					<p className="text-market-neutral-700 mb-6">
						Explore nossa loja e faça seu primeiro pedido!
					</p>
					<Link
						href="/products"
						className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-market-green hover:bg-market-green-dark"
					>
						Ver Produtos
					</Link>
				</div>
			) : (
				<div className="space-y-6">
					{orders.map((order) => (
						<div
							key={order.id}
							className="bg-white rounded-lg shadow-sm overflow-hidden"
						>
							{/* Order Header */}
							<div className="p-6 border-b border-market-neutral-200">
								<div className="flex flex-col md:flex-row md:items-center justify-between">
									<div className="flex flex-col mb-4 md:mb-0">
										<div className="flex items-center mb-1">
											<span className="font-medium text-lg mr-3">
												Pedido #{order.id}
											</span>
											<span
												className={`text-xs px-2 py-1 rounded-full flex items-center ${getStatusClass(
													order.status
												)}`}
											>
												{getStatusIcon(order.status)}
												<span className="ml-1">{order.status}</span>
											</span>
										</div>
										<span className="text-market-neutral-600">
											Realizado em {formatDate(order.date)}
										</span>
									</div>

									<div className="flex flex-col items-end">
										<span className="text-market-neutral-800 mb-1">
											Total:{' '}
											<span className="font-bold text-market-green">
												{formatPrice(order.total)}
											</span>
										</span>
										<button
											className="text-market-green hover:text-market-green-dark flex items-center text-sm"
											onClick={() => toggleOrderExpand(order.id)}
										>
											{expandedOrder === order.id ? (
												<>
													<span>Ocultar detalhes</span>
													<ChevronUp size={16} className="ml-1" />
												</>
											) : (
												<>
													<span>Ver detalhes</span>
													<ChevronDown size={16} className="ml-1" />
												</>
											)}
										</button>
									</div>
								</div>
							</div>

							{/* Order Details */}
							{expandedOrder === order.id && (
								<div className="p-6">
									{/* Order Items */}
									<div className="mb-6">
										<h3 className="font-medium text-lg mb-3">
											Itens do Pedido
										</h3>
										<div className="space-y-4">
											{order.items.map((item) => (
												<div
													key={item.id}
													className="flex flex-col sm:flex-row sm:items-center"
												>
													<div className="flex items-center mb-3 sm:mb-0">
														<img
															src={item.image}
															alt={item.name}
															className="w-16 h-16 object-cover rounded"
														/>
														<div className="ml-4">
															<Link
																href={`/product/${item.id}`}
																className="font-medium text-market-neutral-900 hover:text-market-green"
															>
																{item.name}
															</Link>
															<div className="text-market-neutral-600">
																Quantidade: {item.quantity}
															</div>
														</div>
													</div>
													<div className="sm:ml-auto">
														<span className="font-medium">
															{formatPrice(item.price * item.quantity)}
														</span>
													</div>
												</div>
											))}
										</div>
									</div>

									{/* Shipping Information */}
									<div className="mb-6">
										<h3 className="font-medium text-lg mb-3">
											Informações de Entrega
										</h3>
										<div className="bg-market-neutral-50 p-4 rounded-md">
											<p className="mb-1">
												<span className="font-medium">Endereço:</span>{' '}
												{order.shipping.address}
											</p>
											<p className="mb-1">
												<span className="font-medium">Cidade:</span>{' '}
												{order.shipping.city}, {order.shipping.state}
											</p>
											<p className="mb-1">
												<span className="font-medium">CEP:</span>{' '}
												{order.shipping.postalCode}
											</p>

											{order.shipping.tracking && (
												<p className="mb-1">
													<span className="font-medium">
														Código de Rastreio:
													</span>{' '}
													{order.shipping.tracking}
												</p>
											)}

											{order.shipping.estimatedDelivery && (
												<p className="mb-1">
													<span className="font-medium">Entrega Estimada:</span>{' '}
													{formatDate(order.shipping.estimatedDelivery)}
												</p>
											)}

											{order.deliveredAt && (
												<p className="mb-1">
													<span className="font-medium">Entregue em:</span>{' '}
													{formatDate(order.deliveredAt)}
												</p>
											)}
										</div>
									</div>

									{/* Payment Information */}
									<div>
										<h3 className="font-medium text-lg mb-3">
											Resumo de Pagamento
										</h3>
										<div className="bg-market-neutral-50 p-4 rounded-md">
											<div className="flex justify-between mb-1">
												<span>Subtotal:</span>
												<span>{formatPrice(order.total - 15.99)}</span>
											</div>
											<div className="flex justify-between mb-1">
												<span>Frete:</span>
												<span>{formatPrice(15.99)}</span>
											</div>
											<div className="flex justify-between font-medium text-lg pt-2 border-t border-market-neutral-200 mt-2">
												<span>Total:</span>
												<span className="text-market-green">
													{formatPrice(order.total)}
												</span>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default OrdersPage;
