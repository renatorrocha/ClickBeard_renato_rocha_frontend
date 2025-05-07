import { z } from "zod";

export const barberModel = z.object({
	id: z.string().min(1, { message: "ID é obrigatório" }),
	name: z.string().min(1, { message: "Nome é obrigatório" }),
	document: z.string().min(1, { message: "CPF é obrigatório" }),
	specialties: z
		.array(z.object({ id: z.string(), label: z.string() }))
		.min(1, { message: "Especialidades são obrigatórias" }),
	createdAt: z.coerce.date(),
});

export const createBarberModel = barberModel
	.omit({
		id: true,
		createdAt: true,
	})
	.extend({
		specialties: z.array(z.string()),
	});

export const updateBarberModel = barberModel.omit({
	id: true,
	createdAt: true,
});

export type IBarberModel = z.infer<typeof barberModel>;
export type ICreateBarberModel = z.infer<typeof createBarberModel>;
export type IUpdateBarberModel = z.infer<typeof updateBarberModel>;
