'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NotFound = () => {
	const route = useRouter();

	useEffect(() => {
		console.error(
			'404 Error: User attempted to access non-existent route:',
			location.pathname
		);
	}, [location.pathname]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-market-neutral-100">
			<div className="text-center bg-white p-12 rounded-lg shadow-sm max-w-md">
				<div className="mb-6 p-6 inline-block bg-market-green/10 rounded-full">
					<ShoppingCart size={64} className="text-market-green" />
				</div>
				<h1 className="text-4xl font-bold text-market-neutral-900 mb-4">404</h1>
				<p className="text-xl text-market-neutral-600 mb-8">
					Oops! Página não encontrada
				</p>
				<div className="flex flex-col space-y-2">
					<Button asChild>
						<Link href="/">Voltar ao início</Link>
					</Button>
					<Button variant="outline" asChild>
						<Link href="/products">Ver produtos</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
