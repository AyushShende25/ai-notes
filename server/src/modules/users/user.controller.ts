import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { findUserByIdService } from "@/modules/users/user.service";

export const getMeHandler = async (req: Request, res: Response) => {
	const user = await findUserByIdService(req.userId as string);
	res.status(StatusCodes.OK).json({
		success: true,
		data: user,
	});
};
