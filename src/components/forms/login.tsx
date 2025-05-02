import { useAuthStore } from "@/lib/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const loginSchema = z.object({
	email: z.string({ required_error: "Email é obrigatório" }).email({
		message: "Email inválido",
	}),
	password: z
		.string({ required_error: "Senha é obrigatória" })
		.min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	const { login } = useAuthStore();

	async function onSubmit(data: LoginSchema) {
		login({
			email: data.email,
			password: data.password,
			name: "renato",
			role: "CLIENT",
			token: "1234567890",
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 w-full max-w-md"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>

							<FormControl>
								<Input {...field} />
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
								<Input {...field} />
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
	);
}
