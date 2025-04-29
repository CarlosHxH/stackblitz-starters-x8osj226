import { Truck, Package, CreditCard, Clock } from 'lucide-react';

interface FeatureProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
	<div className="flex flex-col items-center text-center p-4">
		<div className="bg-market-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
			{icon}
		</div>
		<h3 className="font-medium text-lg text-market-neutral-900 mb-2">
			{title}
		</h3>
		<p className="text-market-neutral-600">{description}</p>
	</div>
);

export const DeliveryInfo = () => {
	return (
		<div className="py-16 bg-market-neutral-100">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl font-bold text-market-neutral-900 mb-12 text-center">
					Por que escolher o MercadoCompleto?
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<Feature
						icon={<Truck size={28} className="text-market-green" />}
						title="Entrega Rápida"
						description="Entregamos para todo o Brasil com rapidez e segurança"
					/>
					<Feature
						icon={<Package size={28} className="text-market-green" />}
						title="Produtos de Qualidade"
						description="Selecionamos apenas os melhores produtos para você"
					/>
					<Feature
						icon={<CreditCard size={28} className="text-market-green" />}
						title="Pagamento Seguro"
						description="Diversas formas de pagamento com total segurança"
					/>
					<Feature
						icon={<Clock size={28} className="text-market-green" />}
						title="Suporte 24/7"
						description="Estamos sempre disponíveis para te ajudar"
					/>
				</div>
			</div>
		</div>
	);
};
