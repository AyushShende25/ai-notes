import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
	type Application,
	type Response,
	type Request,
} from "express";

import { env } from "@/config/env";
import { NotFoundError } from "@/errors";
import { errorHandler } from "@/middleware/errorHandler.middleware";
import morganMiddleware from "@/middleware/morgan.middleware";
import authRouter from "@/modules/auth/auth.router";
import notesRouter from "@/modules/notes/note.router";
import usersRouter from "@/modules/users/user.router";

const app: Application = express();

app
	.use(cors({ origin: env.CLIENT_URL, credentials: true }))
	.use(morganMiddleware)
	.use(cookieParser())
	.use(express.json())
	.get("/health", (_req: Request, res: Response) => {
		res.json({
			ok: true,
		});
	});

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app
	.all("*splat", () => {
		throw new NotFoundError();
	})
	.use(errorHandler);

export default app;
