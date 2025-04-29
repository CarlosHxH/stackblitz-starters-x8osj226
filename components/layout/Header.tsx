'use client';
import { ChangeEvent, useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useCategories } from '@/hooks/useCategories';
import Link from 'next/link';
import { CartSidebar } from '../store/CartSidebar';

export const Header = () => {
	const { categories } = useCategories();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [location, setLocation] = useState('Cuiaba, MT');
	const { searchQuery, onSearchQuery } = useCart();

	return (
		<header className="sticky top-0 z-50 bg-white shadow-sm">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between py-4">
					{/* Logo */}
					<Link href="/" className="text-2xl font-bold text-market-green">
						SuperMarket
					</Link>

					{/* Location */}
					<div className="hidden md:flex items-center text-sm text-market-neutral-600 mx-4">
						<MapPin size={16} className="mr-1 text-market-green" />
						<span>{location}</span>
					</div>

					{/* Search */}
					<form className="hidden md:flex flex-1 mx-4 relative">
						<input
							type="text"
							placeholder="O que você está procurando hoje?"
							value={searchQuery}
							onChange={(e) => onSearchQuery(e.target.value)}
							className="w-full px-4 py-2 border border-market-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-market-green focus:border-transparent"
						/>
						<Button
							size="icon"
							variant="ghost"
							type="submit"
							className="absolute right-1 top-1/2 -translate-y-1/2"
						>
							<Search size={18} />
						</Button>
					</form>

					{/* Nav links (desktop) */}
					<nav className="hidden md:flex items-center space-x-6">
						<Link
							href="/products"
							className="text-market-neutral-700 hover:text-market-green transition-colors"
						>
							Produtos
						</Link>
						<Link
							href="/offers"
							className="text-market-neutral-700 hover:text-market-green transition-colors"
						>
							Ofertas
						</Link>
						<Link
							href="/orders"
							className="text-market-neutral-700 hover:text-market-green transition-colors"
						>
							Meus Pedidos
						</Link>
						<Link
							href="/account"
							className="text-market-neutral-700 hover:text-market-green"
						>
							<User size={20} />
						</Link>

						<CartSidebar />

						{/*
						<Link href="/cart" className="relative">
							<ShoppingCart
								size={20}
								className="text-market-neutral-700 hover:text-market-green"
							/>
							{totalItems > 0 && (
								<Badge className="absolute -top-2 -right-2 bg-market-orange text-white h-5 w-5 flex items-center justify-center rounded-full p-0">
									{totalItems}
								</Badge>
							)}
							</Link>*/}
					</nav>

					{/* Mobile menu button */}
					<div className="flex items-center md:hidden">
						<CartSidebar />
						{/*<Link href="/cart" className="relative mr-4">
							<ShoppingCart size={20} className="text-market-neutral-700" />
							{totalItems > 0 && (
								<Badge className="absolute -top-2 -right-2 bg-market-orange text-white h-5 w-5 flex items-center justify-center rounded-full p-0">
									{totalItems}
								</Badge>
							)}
							</Link>*/}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</Button>
					</div>
				</div>

				{/* Mobile search */}
				<div className="md:hidden pb-4">
					<form className="relative">
						<input
							type="text"
							placeholder="O que você está procurando hoje?"
							value={searchQuery}
							onChange={(e) => onSearchQuery(e.target.value)}
							className="w-full px-4 py-2 border border-market-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-market-green focus:border-transparent"
						/>
						<Button
							size="icon"
							variant="ghost"
							type="submit"
							className="absolute right-1 top-1/2 -translate-y-1/2"
						>
							<Search size={18} />
						</Button>
					</form>
				</div>
			</div>

			{/* Categories nav */}
			<div className="bg-market-neutral-100 hidden md:block">
				<div className="container mx-auto">
					<div className="flex items-center space-x-6 overflow-x-auto py-2 px-4 whitespace-nowrap">
						{categories.map((category) => (
							<Link
								key={category.id}
								href={`/category/${category.slug}`}
								className="text-sm text-market-neutral-700 hover:text-market-green transition-colors"
							>
								{category.name}
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen && (
				<div className="md:hidden bg-white absolute w-full shadow-md z-50">
					<nav className="flex flex-col p-4">
						<Link
							href="/products"
							className="py-3 border-b border-market-neutral-200 text-market-neutral-700"
							onClick={() => setIsMenuOpen(false)}
						>
							Produtos
						</Link>
						<Link
							href="/offers"
							className="py-3 border-b border-market-neutral-200 text-market-neutral-700"
							onClick={() => setIsMenuOpen(false)}
						>
							Ofertas
						</Link>
						<Link
							href="/orders"
							className="py-3 border-b border-market-neutral-200 text-market-neutral-700"
							onClick={() => setIsMenuOpen(false)}
						>
							Meus Pedidos
						</Link>
						<Link
							href="/account"
							className="py-3 text-market-neutral-700"
							onClick={() => setIsMenuOpen(false)}
						>
							Minha Conta
						</Link>

						<div className="pt-4 pb-2 border-t border-market-neutral-200 mt-2">
							<h3 className="font-medium text-market-neutral-900 mb-2">
								Categorias
							</h3>
							{categories.map((category) => (
								<Link
									key={category.id}
									href={`/category/${category.slug}`}
									className="block py-2 text-sm text-market-neutral-700"
									onClick={() => setIsMenuOpen(false)}
								>
									{category.name}
								</Link>
							))}
						</div>

						<div className="flex items-center text-sm text-market-neutral-600 mt-4">
							<MapPin size={16} className="mr-1 text-market-green" />
							<span>{location}</span>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
};
