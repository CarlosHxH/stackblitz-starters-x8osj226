import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
	return new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	}).format(date);
}

export function formatCurrency(value: number): string {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(value);
}


// Definindo uma interface para a taxa de entrega
export interface TaxaEntrega {
    cep: string; // CEP do destino
    distancia: number; // Distância em km
    taxaBase: number; // Taxa base em R$
    taxaPorKm: number; // Taxa adicional por km em R$
}

// Função para calcular a taxa de entrega
export function calcularTaxaEntrega(distancia: number, taxaBase: number, taxaPorKm: number): number {
    if (distancia < 0) {
        throw new Error("A distância não pode ser negativa.");
    }
    
    // Calcula a taxa total
    const taxaTotal = taxaBase + (distancia * taxaPorKm);
    return taxaTotal;
}



// Mapeamento de CEPs para distâncias (exemplo)
const mapaDistancias: { [cep: string]: number } = {
    "78000000": 10, // Exemplo de CEP e distância
    "78001000": 15,
    "78002000": 20,
	"78148804": 0,
    // Adicione mais CEPs e distâncias conforme necessário
};

// Função para calcular a taxa de entrega por CEP
export function calcularTaxaEntregaPorCep(cep: string, taxaBase=2, taxaPorKm=2): number {
    const distancia = mapaDistancias[cep];
/*
    if (distancia === undefined) {
        throw new Error("CEP não encontrado ou não disponível para entrega.");
    }
*/
    // Calcula a taxa total
    const taxaTotal = taxaBase + (distancia * taxaPorKm);
    return taxaTotal;
}
/*
// Exemplo de uso
const cepDestino = "78000-000"; // CEP de exemplo
const taxaBase = 5; // Taxa base em R$
const taxaPorKm = 2; // Taxa adicional por km em R$

try {
    const taxa = calcularTaxaEntregaPorCep(cepDestino, taxaBase, taxaPorKm);
    console.log(`A taxa de entrega para o CEP ${cepDestino} é R$ ${taxa.toFixed(2)}`);
} catch (error) {
    console.error(error.message);
}
/*
// Exemplo de uso
const taxaEntrega: TaxaEntrega = {
    distancia: 10, // Distância em km
    taxaBase: 5, // Taxa base em R$
    taxaPorKm: 2 // Taxa adicional por km em R$
};
*/
// const taxa = calcularTaxaEntrega(1, 5, 2);
// console.log(`A taxa de entrega é R$ ${taxa.toFixed(2)}`);