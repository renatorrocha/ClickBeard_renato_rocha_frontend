import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type IRegisterSchema, registerSchema } from "@/lib/models/auth";
import { useRegister } from "@/lib/queries/auth";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import ControlledBtn from "./controlled-btn";

const teste = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
});

export default function RegisterForm() {
	const { mutate: register, isPending } = useRegister();

	const form = useForm<IRegisterSchema>({
		resolver: zodResolver(teste),

		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: IRegisterSchema) {
		register(data);
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

				<ControlledBtn type="submit" isLoading={isPending} className="w-fit">
					Criar conta
				</ControlledBtn>
			</form>
		</Form>
	);
}
