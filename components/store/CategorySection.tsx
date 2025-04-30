import { useCategories } from '@/hooks/useCategories';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CategorySection = () => {
	const { categories, loading } = useCategories();
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(false);

	// Verificar se devemos mostrar as setas de navegação
	const checkScrollPosition = () => {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer) return;

		// Mostrar seta esquerda se houver conteúdo scrollado para a esquerda
		setShowLeftArrow(scrollContainer.scrollLeft > 0);

		// Mostrar seta direita se houver mais conteúdo para a direita
		const hasMoreContentRight = 
			scrollContainer.scrollWidth > scrollContainer.clientWidth &&
			scrollContainer.scrollLeft < (scrollContainer.scrollWidth - scrollContainer.clientWidth);
		setShowRightArrow(hasMoreContentRight);
	};

	// Checar a posição inicial quando as categorias são carregadas
	useEffect(() => {
		if (!loading) {
			checkScrollPosition();
		}
	}, [categories, loading]);

	// Adicionar listener para atualizar as setas durante o scroll
	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (scrollContainer) {
			scrollContainer.addEventListener('scroll', checkScrollPosition);
			// Verificar também no redimensionamento da janela
			window.addEventListener('resize', checkScrollPosition);

			return () => {
				scrollContainer.removeEventListener('scroll', checkScrollPosition);
				window.removeEventListener('resize', checkScrollPosition);
			};
		}
	}, []);

	// Função para scroll horizontal
	const scroll = (direction: 'left' | 'right') => {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer) return;

		const scrollAmount = 300; // pixels para scroll
		const scrollTo = direction === 'left' 
			? scrollContainer.scrollLeft - scrollAmount 
			: scrollContainer.scrollLeft + scrollAmount;
		
		scrollContainer.scrollTo({
			left: scrollTo,
			behavior: 'smooth'
		});
	};

	if (loading) return <div>Carregando categorias...</div>;

	return (
		<div className="py-12 relative">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl font-bold text-market-neutral-900 mb-6">
					Categorias
				</h2>

				<div className="relative">
					{/* Botão de navegação esquerda */}
					{showLeftArrow && (
						<button 
							onClick={() => scroll('left')}
							className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 focus:outline-none"
							aria-label="Rolar para a esquerda"
						>
							<ChevronLeft className="text-market-neutral-600" size={24} />
						</button>
					)}

					{/* Container de categorias com scroll */}
					<div 
						ref={scrollContainerRef}
						className="flex overflow-x-auto space-x-6 py-2 px-1 scrollbar-hide"
						onScroll={checkScrollPosition}
					>
						{categories.map((category) => (
							<Link
								key={category.id}
								href={`/category/${category.slug}`}
								className="group flex-shrink-0"
							>
								<div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 text-center flex flex-col items-center w-28">
									<div className="w-16 h-16 bg-market-green/10 rounded-full flex items-center justify-center mb-3">
										<span className="text-market-green text-xl font-medium">
											{category.name.charAt(0)}
										</span>
									</div>
									<span className="text-market-neutral-800 group-hover:text-market-green transition-colors">
										{category.name}
									</span>
								</div>
							</Link>
						))}
					</div>

					{/* Botão de navegação direita */}
					{showRightArrow && (
						<button 
							onClick={() => scroll('right')}
							className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 focus:outline-none"
							aria-label="Rolar para a direita"
						>
							<ChevronRight className="text-market-neutral-600" size={24} />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};