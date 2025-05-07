import { z } from "zod";

export const barberModel = z.object({
	id: z.string(),
	name: z.string(),
	document: z.string(),
	specialities: z.array(z.string()),
	createdAt: z.date(),
});

export const createBarberModel = barberModel.omit({
	id: true,
	createdAt: true,
});

export const updateBarberModel = barberModel.omit({
	id: true,
	createdAt: true,
});

export type IBarberModel = z.infer<typeof barberModel>;
export type ICreateBarberModel = z.infer<typeof createBarberModel>;
export type IUpdateBarberModel = z.infer<typeof updateBarberModel>;
