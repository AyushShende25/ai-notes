import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env";
import type { LoginInput, SignupInput } from "@/modules/auth/auth.schema";
import { loginService, signupService } from "@/modules/auth/auth.service";

const cookieOptions = {
	httpOnly: true,
	sameSite: true,
	secure: env.NODE_ENV !== "development",
};

export const signupHandler = async (
	req: Request<{}, {}, SignupInput>,
	res: Response,
) => {
	const { access_token } = await signupService(req.body);

	res.cookie("access_token", access_token, {
		...cookieOptions,
		maxAge: 1000 * 60 * 60 * 24,
	});

	res.status(StatusCodes.CREATED).json({
		success: true,
		message: "user registered successfully",
	});
};

export const loginHandler = async (
	req: Request<{}, {}, LoginInput>,
	res: Response,
) => {
	const { access_token } = await loginService(req.body);

	res.cookie("access_token", access_token, {
		...cookieOptions,
		maxAge: 1000 * 60 * 60 * 24,
	});

	res
		.status(StatusCodes.OK)
		.json({ success: true, message: "user login success" });
};

export const logoutHandler = (req: Request, res: Response) => {
	res.clearCookie("access_token", { ...cookieOptions, expires: new Date(0) });

	res.status(StatusCodes.OK).json({
		success: true,
		message: "user logged out successfully",
	});
};
