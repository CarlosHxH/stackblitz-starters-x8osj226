import { useCart } from '@/context/CartContext';

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	categoryId: string;
	rating: number;
	stock: number;
	featured?: boolean;
	discount?: number;
	seller: {
		id: string;
		name: string;
		rating: number;
	};
	deliveryEstimate: {
		min: number;
		max: number;
	};
}

export const products: Product[] = [
	{
		id: '1',
		name: 'Smartphone Galaxy X Pro',
		description:
			'O mais potente smartphone do mercado, com tela AMOLED de 6.5" e câmera de 108MP.',
		price: 2499.99,
		image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=Smartphone',
		categoryId: '1',
		rating: 4.8,
		stock: 15,
		featured: true,
		discount: 10,
		seller: {
			id: 's1',
			name: 'TechMaster',
			rating: 4.9,
		},
		deliveryEstimate: {
			min: 2,
			max: 3,
		},
	},
	{
		id: '2',
		name: 'Smart TV LED 50"',
		description:
			'Televisão LED 4K com tecnologia HDR e sistema operacional inteligente.',
		price: 3199.9,
		image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=SmartTV',
		categoryId: '1',
		rating: 4.7,
		stock: 8,
		featured: true,
		seller: {
			id: 's2',
			name: 'Eletroshow',
			rating: 4.6,
		},
		deliveryEstimate: {
			min: 3,
			max: 5,
		},
	},
	{
		id: '3',
		name: 'Sofá Retrátil 3 Lugares',
		description:
			'Sofá confortável com tecido macio e design moderno para sua sala de estar.',
		price: 1899.99,
		image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=Sofa',
		categoryId: '2',
		rating: 4.5,
		stock: 5,
		featured: false,
		seller: {
			id: 's3',
			name: 'MóveisDecor',
			rating: 4.7,
		},
		deliveryEstimate: {
			min: 5,
			max: 8,
		},
	},
	{
		id: '4',
		name: 'Tênis Esportivo Corrida',
		description:
			'Tênis leve e confortável para corridas diárias. Material respirável.',
		price: 299.9,
		image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=Tenis',
		categoryId: '5',
		rating: 4.2,
		stock: 25,
		discount: 15,
		featured: false,
		seller: {
			id: 's4',
			name: 'EsporteTudo',
			rating: 4.5,
		},
		deliveryEstimate: {
			min: 1,
			max: 2,
		},
	},
	{
		id: '5',
		name: 'Kit Skincare Premium',
		description:
			'Kit completo com limpador, tônico, hidratante e sérum anti-idade.',
		price: 349.9,
		image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=Skincare',
		categoryId: '4',
		rating: 4.9,
		stock: 12,
		featured: true,
		seller: {
			id: 's5',
			name: 'BeautyExpress',
			rating: 4.8,
		},
		deliveryEstimate: {
			min: 1,
			max: 3,
		},
	},
	{
		id: '6',
		name: 'Cafeteira Elétrica Programável',
		description:
			'Cafeteira automática com timer e sistema de filtragem avançado.',
		price: 399.99,
		image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=Cafeteira',
		categoryId: '8',
		rating: 4.6,
		stock: 10,
		discount: 5,
		featured: false,
		seller: {
			id: 's6',
			name: 'HomeUtensils',
			rating: 4.4,
		},
		deliveryEstimate: {
			min: 2,
			max: 4,
		},
	},
	{
		id: '7',
		name: 'Notebook UltraSlim',
		description:
			'Notebook leve e potente com processador de última geração e 12h de bateria.',
		price: 5699.9,
		image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=Notebook',
		categoryId: '1',
		rating: 4.7,
		stock: 7,
		featured: true,
		seller: {
			id: 's7',
			name: 'TechStore',
			rating: 4.9,
		},
		deliveryEstimate: {
			min: 2,
			max: 3,
		},
	},
	{
		id: '8',
		name: 'Conjunto de Panelas Antiaderentes',
		description:
			'Kit com 5 panelas de alta qualidade com revestimento antiaderente.',
		price: 499.99,
		image: 'https://placehold.co/500x500/38B94A/FFFFFF.png?text=Panelas',
		categoryId: '8',
		rating: 4.3,
		stock: 15,
		discount: 8,
		featured: false,
		seller: {
			id: 's8',
			name: 'CozinhaTotal',
			rating: 4.5,
		},
		deliveryEstimate: {
			min: 3,
			max: 5,
		},
	},
];

export const getAllProducts = () => {
	return products;
};

export const getFeaturedProducts = () => {
	return products.filter((product) => product.featured);
};

export const getProductsByCategory = (categoryId: string) => {
	return products.filter((product) => product.categoryId === categoryId);
};

export const getProductById = (id: string) => {
	return products.find((product) => product.id === id);
};

export const getDiscountedProducts = () => {
	return products.filter((product) => product.discount && product.discount > 0);
};

export const filterProducts = (searchQuery: string) => {
	const up = (e: string) => e.toUpperCase();
	return products.filter((p) =>
		[up(p.name), up(p.description)].includes(up(searchQuery))
	);
};
