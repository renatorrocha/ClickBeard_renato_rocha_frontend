import { z } from "zod";

export const userModel = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	role: z.enum(["CLIENT", "ADMIN"]),
	token: z.string(),
});

export type UserModel = z.infer<typeof userModel>;
