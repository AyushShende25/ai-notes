import { z } from "zod";

export const signupSchema = z.object({
	body: z.object({
		username: z
			.string({
				required_error: "username is required",
			})
			.trim(),
		email: z
			.string({
				required_error: "Email address is required",
			})
			.email("Invalid email address")
			.trim(),
		password: z
			.string({
				required_error: "Password is required",
			})
			.min(8, "Password must be more than 8 characters")
			.max(32, "Password must be less than 32 characters")
			.trim(),
	}),
});

export const loginSchema = z.object({
	body: z.object({
		email: z
			.string({
				required_error: "Email address is required",
			})
			.email("Invalid email address")
			.trim(),
		password: z
			.string({
				required_error: "Password is required",
			})
			.trim(),
	}),
});

export type SignupInput = z.infer<typeof signupSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
