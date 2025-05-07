import { z } from "zod";

export const registerSchema = z.object({
	name: z.string(),
	email: z.string().email({
		message: "Email inválido",
	}),
	password: z.string().min(8, {
		message: "A senha deve ter pelo menos 8 caracteres",
	}),
});

export type IRegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
	email: z.string({ required_error: "Email é obrigatório" }).email({
		message: "Email inválido",
	}),
	password: z
		.string()
		.min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
