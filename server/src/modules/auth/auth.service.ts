import jwt from "jsonwebtoken";

import prisma from "@/config/db";
import { env } from "@/config/env";
import { BadRequestError, UnAuthorizedError } from "@/errors";
import type { LoginInput, SignupInput } from "@/modules/auth/auth.schema";
import type { ActiveUserData } from "@/modules/auth/auth.types";
import { findUserbyEmail } from "@/modules/users/user.service";
import type { User } from "@prisma/client";

export const signupService = async (signupInput: SignupInput) => {
	const existingUser = await findUserbyEmail(signupInput.email);
	if (existingUser) {
		throw new BadRequestError("email already in use");
	}

	const hashedPassword = await Bun.password.hash(signupInput.password);

	const newUser = await prisma.user.create({
		data: {
			email: signupInput.email,
			username: signupInput.username,
			password: hashedPassword,
		},
	});

	const { password, ...safeUser } = newUser;
	return await generateToken(safeUser);
};

export const loginService = async (loginInput: LoginInput) => {
	const user = await findUserbyEmail(loginInput.email);

	if (!user) {
		throw new UnAuthorizedError("Invalid Credentials");
	}

	const isPasswordValid = await Bun.password.verify(
		loginInput.password,
		user.password,
	);
	console.log(isPasswordValid);
	
	if (!isPasswordValid) {
		throw new UnAuthorizedError("Invalid credentials");
	}

	const { access_token } = await generateToken(user);

	return { access_token };
};

const generateToken = async (user: Omit<User, "password">) => {
	const access_token = await signToken<Partial<ActiveUserData>>(
		user.id,
		env.JWT_ACCESS_TOKEN_TTL,
		{
			email: user.email,
		},
	);

	return { access_token };
};

const signToken = async <T>(userId: string, expiresIn: number, payload?: T) => {
	return await jwt.sign(
		{
			sub: userId,
			...payload,
		},
		env.JWT_SECRET,
		{
			expiresIn,
		},
	);
};
