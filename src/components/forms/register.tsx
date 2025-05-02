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

const registerSchema = z.object({
	email: z.string({ required_error: "Email é obrigatório" }).email({
		message: "Email inválido",
	}),
	name: z
		.string({ required_error: "Nome é obrigatório" })
		.min(1, { message: "Nome é obrigatório" }),
	password: z
		.string({ required_error: "Senha é obrigatória" })
		.min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterForm() {
	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
	});

	async function onSubmit(data: RegisterSchema) {
		console.log(data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4 w-full max-w-md"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>

							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

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
					Criar conta
				</Button>
			</form>
		</Form>
	);
}
