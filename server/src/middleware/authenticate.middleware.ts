import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "@/config/env";
import { UnAuthorizedError } from "@/errors";
import type { ActiveUserData } from "@/modules/auth/auth.types";
import { findUserByIdService } from "@/modules/users/user.service";

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

export const Authenticate = async (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	const accessToken =
		req.cookies?.access_token || req.headers.authorization?.split(" ")[1];

	if (!accessToken) {
		throw new UnAuthorizedError("you are not logged in");
	}

	let decoded: ActiveUserData;
	try {
		decoded = jwt.verify(accessToken, env.JWT_SECRET) as ActiveUserData;
	} catch (error) {
		throw new UnAuthorizedError("Invalid token or user does not exist");
	}

	const user = await findUserByIdService(decoded.sub);

	if (!user) {
		throw new UnAuthorizedError("Invalid token or user does not exist");
	}

	req.userId = user.id;

	next();
};
