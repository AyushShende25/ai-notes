import z from "zod";

import Logger from "@/utils/logger";

const envSchema = z.object({
	PORT: z.coerce.number().default(4400),
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	DATABASE_URL: z.string(),
	CLIENT_URL: z.string(),
	JWT_SECRET: z.string(),
	JWT_ACCESS_TOKEN_TTL: z.coerce.number(),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
	Logger.error("Invalid environment variables");
	Logger.error(envVars.error.format());
	process.exit(1);
}

export const env = envVars.data;
