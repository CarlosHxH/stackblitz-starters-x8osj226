'use client';
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { Product, getProductById } from '@/data/products';

export interface CartItem {
	id: string;
	quantity: number;
	product: Product;
}

interface CartContextType {
	cartItems: CartItem[];
	addToCart: (productId: string, quantity?: number) => void;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	totalPrice: number;
	searchQuery: string;
	onSearchQuery: (search: string) => void;
	totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');

	const onSearchQuery = (search: string) => {
		setSearchQuery(search);
	};

	useEffect(() => {
		// Load cart from localStorage
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			try {
				const parsedCart = JSON.parse(savedCart);

				// Rehydrate the product data for each cart item
				const hydratedCart = parsedCart
					.map((item: any) => {
						const product = getProductById(item.id);
						if (!product) {
							// If product no longer exists, skip this item
							return null;
						}
						return {
							id: item.id,
							quantity: item.quantity,
							product,
						};
					})
					.filter(Boolean); // Remove null items

				setCartItems(hydratedCart);
			} catch (error) {
				console.error('Failed to parse cart from localStorage', error);
				localStorage.removeItem('cart');
			}
		}
	}, []);

	useEffect(() => {
		// Save cart to localStorage (only save id and quantity to avoid circular references)
		if (cartItems.length > 0) {
			const cartForStorage = cartItems.map((item) => ({
				id: item.id,
				quantity: item.quantity,
			}));
			localStorage.setItem('cart', JSON.stringify(cartForStorage));
		} else {
			localStorage.removeItem('cart');
		}

		// Calculate total price
		const total = cartItems.reduce((sum, item) => {
			const price = item.product.discount
				? item.product.price * (1 - item.product.discount / 100)
				: item.product.price;
			return sum + price * item.quantity;
		}, 0);

		setTotalPrice(total);
	}, [cartItems]);

	const addToCart = (productId: string, quantity = 1) => {
		const product = getProductById(productId);
		if (!product) return;

		setCartItems((prevItems) => {
			const existingItemIndex = prevItems.findIndex(
				(item) => item.id === productId
			);

			if (existingItemIndex >= 0) {
				// If item exists, update quantity
				const updatedItems = [...prevItems];
				updatedItems[existingItemIndex] = {
					...updatedItems[existingItemIndex],
					quantity: updatedItems[existingItemIndex].quantity + quantity,
				};
				return updatedItems;
			} else {
				// Add new item
				return [...prevItems, { id: productId, quantity, product }];
			}
		});
	};

	const removeFromCart = (productId: string) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.id !== productId)
		);
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}

		setCartItems((prevItems) => {
			return prevItems.map((item) => {
				if (item.id === productId) {
					return { ...item, quantity };
				}
				return item;
			});
		});
	};

	const clearCart = () => {
		setCartItems([]);
		localStorage.removeItem('cart');
	};

	const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				totalPrice,
				searchQuery,
				onSearchQuery,
				totalItems,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
