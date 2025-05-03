import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
	email: z.string().email('Email inválido'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

const ADMIN_CREDENTIALS = {
	email: 'admin@example.com',
	password: '123456',
};

const USER_CREDENTIALS = {
	email: 'user@example.com',
	password: '123456',
};

export default function Login() {
	const navigate = useRouter();
	const { toggleAdminMode } = useStore();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const isAdmin =
			values.email === ADMIN_CREDENTIALS.email &&
			values.password === ADMIN_CREDENTIALS.password;

		const isUser =
			values.email === USER_CREDENTIALS.email &&
			values.password === USER_CREDENTIALS.password;

		if (isAdmin) {
			toast.success('Login realizado com sucesso como administrador!');
			toggleAdminMode(); // Activate admin mode
			navigate.push('/admin');
		} else if (isUser) {
			toast.success('Login realizado com sucesso!');
			navigate.push('/');
		} else {
			toast.error('Credenciais inválidas');
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold">Login</h2>
					<p className="mt-2 text-gray-600">
						Faça login para acessar sua conta
					</p>
					<div className="mt-4 p-4 bg-blue-50 rounded-md">
						<p className="text-sm text-blue-600">
							Credenciais de teste:
							<br />
							Admin: admin@example.com / 123456
							<br />
							Usuário: user@example.com / 123456
						</p>
					</div>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="seu@email.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input type="password" placeholder="******" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full">
							Entrar
						</Button>
					</form>
				</Form>

				<p className="text-center text-sm">
					Não tem uma conta?{' '}
					<Link href="/register" className="text-autoshop-blue hover:underline">
						Registre-se
					</Link>
				</p>
			</div>
		</div>
	);
}
