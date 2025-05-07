import { z } from "zod";

export const appointmentSchema = z.object({
	id: z.string(),
	date: z.string(),
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

export type IAppointment = z.infer<typeof appointmentSchema>;
