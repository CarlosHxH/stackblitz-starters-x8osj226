export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	image: string;
	categoryId: string;
	createdAt: string;
	updatedAt: string;
	quantity: number;
}

export interface Category {
	id: string;
	name: string;
	description: string;
	image?: string;
	createdAt: string;
	updatedAt: string;
}

export interface Banner {
	id: string;
	title: string;
	description: string;
	image: string;
	link?: string;
	active: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface DeliveryFee {
	id: string;
	name: string;
	price: number; // Changed from 'fee' to 'price' to match usage in components
	minOrderValue: number;
	description: string;
	createdAt: string;
	updatedAt: string;
}

export interface Shipping {
	address: string;
	city: string;
	state: string;
	postalCode: string;
	tracking?: string;
	estimatedDelivery?: string;
}

export interface Order {
	id: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	address: string;
	city: string;
	state: string;
	postalCode: string;
	items: OrderItem[];
	subtotal: number;
	deliveryFee: number;
	total: number;
	status: OrderStatus;
	paymentMethod: PaymentMethod;
	createdAt: string;
	updatedAt: string;
	shipping: Shipping;
}

export interface OrderItem {
	id: string;
	productId: string;
	productName: string;
	quantity: number;
	price: number;
	subtotal: number;
	image: string;
}

export type OrderStatus =
	| 'pending'
	| 'processing'
	| 'shipped'
	| 'delivered'
	| 'canceled';
export type PaymentMethod =
	| 'credit_card'
	| 'pix'
	| 'bank_transfer'
	| 'cash_on_delivery';

export interface User {
	id: string;
	name: string;
	email: string;
	role: 'admin' | 'customer';
}
