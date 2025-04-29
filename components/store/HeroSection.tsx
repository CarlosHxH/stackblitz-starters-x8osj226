import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const HeroSection = () => {
	return (
		<div className="relative bg-green-600 bg-gradient-to-r from-market-green to-market-green-dark overflow-hidden">
			<div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
				<div className="max-w-xl">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
						Tudo o que você precisa em um só lugar
					</h1>
					<p className="text-lg md:text-xl text-white/90 mb-8">
						Entregamos qualidade diretamente em sua casa, com os melhores preços
						e frete rápido para todo o Brasil.
					</p>
					<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
						<Button
							size="lg"
							className="bg-white text-market-green hover:bg-white/90 text-lg"
							asChild
						>
							<Link href="/products">Ver Produtos</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-white text-white hover:bg-white/10 text-lg"
							asChild
						>
							<Link href="/offers">Ver Ofertas</Link>
						</Button>
					</div>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
				<svg
					width="380"
					height="380"
					viewBox="0 0 200 200"
					className="text-white/10"
				>
					<defs>
						<pattern
							id="dots"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<circle cx="3" cy="3" r="3" fill="currentColor" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#dots)" />
				</svg>
			</div>

			<div className="absolute -bottom-6 left-10 transform rotate-12 hidden lg:block">
				<div className="w-24 h-24 rounded-full bg-white/10"></div>
			</div>

			<div className="absolute top-10 right-[20%] transform -rotate-12 hidden lg:block">
				<div className="w-12 h-12 rounded-full bg-white/10"></div>
			</div>
		</div>
	);
};
