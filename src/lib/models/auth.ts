import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(1, {
		message: "O nome é obrigatório",
	}),
	email: z.string().email({
		message: "Email inválido",
	}),
	password: z.string().min(6, {
		message: "A senha deve ter pelo menos 6 caracteres",
	}),
});

export type IRegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
	email: z.string({ required_error: "Email é obrigatório" }).email({
		message: "Email inválido",
	}),
	password: z
		.string()
		.min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
