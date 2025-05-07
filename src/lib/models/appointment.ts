import { z } from "zod";

export const appointmentSchema = z.object({
	id: z.string(),
	date: z.coerce.date(),
	specialty: z.object({
		name: z.string(),
	}),
	barber: z.object({
		name: z.string(),
	}),
	createdAt: z.coerce.date().optional(),
	updatedAt: z.coerce.date().optional(),
	canceledAt: z.coerce.date().optional().nullable(),
});

export const createAppointmentSchema = z.object({
	date: z.coerce.date(),
	specialtyId: z.string().min(1, "Selecione uma especialidade"),
	barberId: z.string().min(1, "Selecione um barbeiro"),
});

export type ICreateAppointment = z.infer<typeof createAppointmentSchema>;

export type IAppointment = z.infer<typeof appointmentSchema>;
