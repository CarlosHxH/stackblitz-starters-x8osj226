// Shipping calculation API (mock implementation)

export type ShippingInfo = {
	cep: string;
	cost: number;
	estimate: {
		min: number;
		max: number;
	};
	carrier: string;
};

export type ShippingOption = {
	id: string;
	name: string;
	cost: number;
	estimate: {
		min: number;
		max: number;
	};
};

export const calculateShipping = async (
	cep: string,
	weight?: number
): Promise<ShippingOption[]> => {
	// In a real application, this would call an external shipping API
	// For now, we'll simulate a network request
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Validate CEP format
	const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
	if (!cepRegex.test(cep)) {
		throw new Error('Formato de CEP inválido. Use: 00000-000');
	}

	// Convert to numeric representation for "random" but deterministic results
	const cepNumbers = cep.replace(/\D/g, '');
	const cepSum = cepNumbers
		.split('')
		.reduce((sum, digit) => sum + parseInt(digit, 10), 0);

	// Use the sum to determine shipping cost (between R$15 and R$35)
	const baseCost = 15 + (cepSum % 20);
	const weightFactor = weight ? Math.min(weight / 10, 1) : 0.5;

	return [
		{
			id: 'standard',
			name: 'Entrega Padrão',
			cost: Math.round(baseCost * 100) / 100,
			estimate: {
				min: 3,
				max: 7,
			},
		},
		{
			id: 'express',
			name: 'Entrega Expressa',
			cost: Math.round(baseCost * 1.5 * 100) / 100,
			estimate: {
				min: 1,
				max: 3,
			},
		},
		{
			id: 'economic',
			name: 'Entrega Econômica',
			cost: Math.round(baseCost * 0.8 * 100) / 100,
			estimate: {
				min: 5,
				max: 10,
			},
		},
	];
};
