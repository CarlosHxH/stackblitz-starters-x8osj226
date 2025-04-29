'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

export default function Checkout() {
	const { cartItems = [] } = useCart();
	const [cep, setCep] = useState('');
	const [selectedFee, setSelectedFee] = useState<string | null>(null);

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0
	);
	const deliveryFee =
		cartItems.find((fee) => fee.id === selectedFee)?.product.price || 0;
	const total = subtotal + deliveryFee;

	const handleCepSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (cep.length !== 8) {
			toast.error('CEP inválido');
			return;
		}

		// Simulate CEP search with first delivery fee
		if (cartItems.length > 0) {
			setSelectedFee(cartItems[0].id);
			toast.success('CEP encontrado');
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">Checkout</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-6">
					<div className="bg-white p-6 rounded-lg shadow">
						<h2 className="text-lg font-semibold mb-4">Cálculo de Entrega</h2>
						<form onSubmit={handleCepSearch} className="flex gap-2">
							<Input
								placeholder="Digite seu CEP"
								value={cep}
								onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
								maxLength={8}
								className="flex-1"
							/>
							<Button type="submit">Calcular</Button>
						</form>

						{selectedFee && (
							<div className="mt-4 space-y-2">
								<h3 className="font-medium">Opções de Entrega:</h3>
								{cartItems.map((fee) => (
									<div
										key={fee.id}
										className="flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50"
										onClick={() => setSelectedFee(fee.id)}
									>
										<div>
											<p className="font-medium">{fee.product.name}</p>
											<p className="text-sm text-gray-600">
												{fee.product.description}
											</p>
										</div>
										<div className="flex items-center gap-2">
											<span>{formatCurrency(fee.product.price)}</span>
											<div
												className={`w-4 h-4 rounded-full border-2 ${
													selectedFee === fee.id
														? 'border-blue-500 bg-blue-500'
														: 'border-gray-300'
												}`}
											/>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="space-y-6">
					<div className="bg-white p-6 rounded-lg shadow">
						<h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
						<div className="space-y-4">
							{cartItems.map((item) => (
								<div key={item.id} className="flex justify-between">
									<span>
										{item.quantity}x {item.product.name}
									</span>
									<span>
										{formatCurrency(item.product.price * item.quantity)}
									</span>
								</div>
							))}
							<div className="border-t pt-4">
								<div className="flex justify-between">
									<span>Subtotal</span>
									<span>{formatCurrency(subtotal)}</span>
								</div>
								<div className="flex justify-between">
									<span>Entrega</span>
									<span>{formatCurrency(deliveryFee)}</span>
								</div>
								<div className="flex justify-between font-bold mt-2">
									<span>Total</span>
									<span>{formatCurrency(total)}</span>
								</div>
							</div>
						</div>
					</div>

					<Button className="w-full" size="lg" disabled={!selectedFee}>
						Finalizar Compra
					</Button>
				</div>
			</div>
		</div>
	);
}
