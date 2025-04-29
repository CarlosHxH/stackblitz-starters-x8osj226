
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Eletrônicos', slug: 'eletronicos' },
  { id: '2', name: 'Móveis', slug: 'moveis' },
  { id: '3', name: 'Moda', slug: 'moda' },
  { id: '4', name: 'Beleza', slug: 'beleza' },
  { id: '5', name: 'Esportes', slug: 'esportes' },
  { id: '6', name: 'Alimentos', slug: 'alimentos' },
  { id: '7', name: 'Bebidas', slug: 'bebidas' },
  { id: '8', name: 'Casa e Jardim', slug: 'casa-jardim' },
  { id: '9', name: 'Eletrodomésticos', slug: 'eletrodomesticos' },
  { id: '10', name: 'Pet Shop', slug: 'pet-shop' },
  { id: '11', name: 'Bebês e Crianças', slug: 'bebe-criancas' },
  { id: '12', name: 'Livros', slug: 'livros' },
];
