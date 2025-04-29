'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Banner, Category, DeliveryFee, Order, Product } from '@/types';
import {
	mockBanners,
	mockCategories,
	mockDeliveryFees,
	mockOrders,
	mockProducts,
} from '@/data/mockData';
import { toast } from '@/components/ui/sonner';

interface CartItem extends Product {
	quantity: number;
}

interface StoreContextType {
	// Products
	products: Product[];
	addProduct: (
		product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
	) => void;
	updateProduct: (product: Product) => void;
	deleteProduct: (id: string) => void;

	// Categories
	categories: Category[];
	addCategory: (
		category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
	) => void;
	updateCategory: (category: Category) => void;
	deleteCategory: (id: string) => void;

	// Banners
	banners: Banner[];
	addBanner: (banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>) => void;
	updateBanner: (banner: Banner) => void;
	deleteBanner: (id: string) => void;

	// Delivery Fees
	deliveryFees: DeliveryFee[];
	addDeliveryFee: (
		fee: Omit<DeliveryFee, 'id' | 'createdAt' | 'updatedAt'>
	) => void;
	updateDeliveryFee: (fee: DeliveryFee) => void;
	deleteDeliveryFee: (id: string) => void;

	// Orders
	orders: Order[];
	updateOrderStatus: (id: string, status: Order['status']) => void;

	// Cart
	cart: CartItem[];
	updateCart: (newCart: CartItem[]) => void;
	addToCart: (product: Product) => void;

	// Auth (simplified for demo)
	isAdmin: boolean;
	toggleAdminMode: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	const [products, setProducts] = useState<Product[]>(mockProducts);
	const [categories, setCategories] = useState<Category[]>(mockCategories);
	const [banners, setBanners] = useState<Banner[]>(mockBanners);
	const [deliveryFees, setDeliveryFees] =
		useState<DeliveryFee[]>(mockDeliveryFees);
	const [orders, setOrders] = useState<Order[]>(mockOrders);
	const [cart, setCart] = useState<CartItem[]>([]);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	// Products CRUD
	const addProduct = (
		product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
	) => {
		const newProduct = {
			...product,
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		setProducts([...products, newProduct as Product]);
		toast.success('Produto adicionado com sucesso!');
	};

	const updateProduct = (product: Product) => {
		setProducts(
			products.map((p) =>
				p.id === product.id
					? { ...product, updatedAt: new Date().toISOString() }
					: p
			)
		);
		toast.success('Produto atualizado com sucesso!');
	};

	const deleteProduct = (id: string) => {
		setProducts(products.filter((p) => p.id !== id));
		toast.success('Produto removido com sucesso!');
	};

	// Categories CRUD
	const addCategory = (
		category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
	) => {
		const newCategory = {
			...category,
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		setCategories([...categories, newCategory as Category]);
		toast.success('Categoria adicionada com sucesso!');
	};

	const updateCategory = (category: Category) => {
		setCategories(
			categories.map((c) =>
				c.id === category.id
					? { ...category, updatedAt: new Date().toISOString() }
					: c
			)
		);
		toast.success('Categoria atualizada com sucesso!');
	};

	const deleteCategory = (id: string) => {
		setCategories(categories.filter((c) => c.id !== id));
		toast.success('Categoria removida com sucesso!');
	};

	// Banners CRUD
	const addBanner = (
		banner: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>
	) => {
		const newBanner = {
			...banner,
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		setBanners([...banners, newBanner as Banner]);
		toast.success('Banner adicionado com sucesso!');
	};

	const updateBanner = (banner: Banner) => {
		setBanners(
			banners.map((b) =>
				b.id === banner.id
					? { ...banner, updatedAt: new Date().toISOString() }
					: b
			)
		);
		toast.success('Banner atualizado com sucesso!');
	};

	const deleteBanner = (id: string) => {
		setBanners(banners.filter((b) => b.id !== id));
		toast.success('Banner removido com sucesso!');
	};

	// Delivery Fees CRUD
	const addDeliveryFee = (
		fee: Omit<DeliveryFee, 'id' | 'createdAt' | 'updatedAt'>
	) => {
		const newFee = {
			...fee,
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		setDeliveryFees([...deliveryFees, newFee as DeliveryFee]);
		toast.success('Taxa de entrega adicionada com sucesso!');
	};

	const updateDeliveryFee = (fee: DeliveryFee) => {
		setDeliveryFees(
			deliveryFees.map((f) =>
				f.id === fee.id ? { ...fee, updatedAt: new Date().toISOString() } : f
			)
		);
		toast.success('Taxa de entrega atualizada com sucesso!');
	};

	const deleteDeliveryFee = (id: string) => {
		setDeliveryFees(deliveryFees.filter((f) => f.id !== id));
		toast.success('Taxa de entrega removida com sucesso!');
	};

	// Orders
	const updateOrderStatus = (id: string, status: Order['status']) => {
		setOrders(
			orders.map((o) =>
				o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o
			)
		);
		toast.success('Status do pedido atualizado com sucesso!');
	};

	// Cart
	const updateCart = (newCart: CartItem[]) => {
		setCart(newCart);
	};

	const addToCart = (product: Product) => {
		setCart((currentCart) => {
			const existingItem = currentCart.find((item) => item.id === product.id);

			if (existingItem) {
				return currentCart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}

			return [...currentCart, { ...product, quantity: 1 }];
		});

		toast.success('Produto adicionado ao carrinho');
	};

	// Auth (simplified for demo)
	const toggleAdminMode = () => {
		setIsAdmin(!isAdmin);
		toast.info(`Modo ${!isAdmin ? 'Administrador' : 'Cliente'} ativado`);
	};

	return (
		<StoreContext.Provider
			value={{
				products,
				addProduct,
				updateProduct,
				deleteProduct,
				categories,
				addCategory,
				updateCategory,
				deleteCategory,
				banners,
				addBanner,
				updateBanner,
				deleteBanner,
				deliveryFees,
				addDeliveryFee,
				updateDeliveryFee,
				deleteDeliveryFee,
				orders,
				updateOrderStatus,
				cart,
				updateCart,
				addToCart,
				isAdmin,
				toggleAdminMode,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};

export const useStore = () => {
	const context = useContext(StoreContext);
	if (context === undefined) {
		throw new Error('useStore must be used within a StoreProvider');
	}
	return context;
};
