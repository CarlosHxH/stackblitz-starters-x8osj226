import { useCategories } from '@/hooks/useCategories';
import Link from 'next/link';

export const CategorySection = () => {
	const { categories, loading } = useCategories();

	if (loading) return <div>Carregando categorias...</div>;

	return (
		<div className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl font-bold text-market-neutral-900 mb-6">
					Categorias
				</h2>

				<div className="flex overflow-x-auto space-x-8 space-x-6 gap-4">
					{categories.map((category) => (
						<Link
							key={category.id}
							href={`/category/${category.slug}`}
							className="group"
						>
							<div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 text-center flex flex-col items-center">
								<div className="w-16 h-16 bg-market-green/10 rounded-full flex items-center justify-center mb-3">
									{/* We would use actual icons here, but for now we'll use the first letter */}
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
			</div>
		</div>
	);
};
