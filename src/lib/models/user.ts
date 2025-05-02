import { z } from "zod";

export const userModel = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	token: z.string(),
});

export type UserModel = z.infer<typeof userModel>;
