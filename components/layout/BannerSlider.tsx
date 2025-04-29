'use client';
import { Banner } from '@/types';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BannerSliderProps {
	banners: Banner[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const activeBanners = banners.filter((banner) => banner.active);

	const nextBanner = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === activeBanners.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevBanner = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? activeBanners.length - 1 : prevIndex - 1
		);
	};

	useEffect(() => {
		if (activeBanners.length <= 1) return;

		const interval = setInterval(nextBanner, 5000);
		return () => clearInterval(interval);
	}, [activeBanners.length]);

	if (activeBanners.length === 0) {
		return null;
	}

	const currentBanner = activeBanners[currentIndex];

	return (
		<div className="relative overflow-hidden w-full aspect-[21/9] max-h-[600px]">
			<div className="absolute inset-0 w-full">
				<img
					src={currentBanner.image}
					alt={currentBanner.title}
					className="w-full h-full object-cover"
					loading="eager"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
					<div className="container mx-auto px-4 sm:px-8 py-12">
						<div className="max-w-md text-white">
							<h2 className="text-3xl sm:text-4xl font-bold mb-4">
								{currentBanner.title}
							</h2>
							<p className="text-lg mb-6">{currentBanner.description}</p>
							{currentBanner.link && (
								<Button
									asChild
									size="lg"
									className="bg-autoshop-red hover:bg-red-700"
								>
									<Link href={currentBanner.link}>Saiba Mais</Link>
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>

			{activeBanners.length > 1 && (
				<>
					<Button
						variant="ghost"
						size="icon"
						className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
						onClick={prevBanner}
					>
						<ChevronLeft size={20} />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-10 w-10"
						onClick={nextBanner}
					>
						<ChevronRight size={20} />
					</Button>

					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
						{activeBanners.map((_, index) => (
							<button
								key={index}
								className={`w-2 h-2 rounded-full transition-colors ${
									index === currentIndex ? 'bg-white' : 'bg-white/50'
								}`}
								onClick={() => setCurrentIndex(index)}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
