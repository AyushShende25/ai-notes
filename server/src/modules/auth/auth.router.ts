import { Router } from "express";

import { Authenticate } from "@/middleware/authenticate.middleware";
import { validate } from "@/middleware/validateRequest.middleware";
import {
	loginHandler,
	logoutHandler,
	signupHandler,
} from "@/modules/auth/auth.controller";
import { loginSchema, signupSchema } from "@/modules/auth/auth.schema";

const router = Router();

router.post("/signup", validate(signupSchema), signupHandler);

router.post("/login", validate(loginSchema), loginHandler);

router.post("/logout", Authenticate, logoutHandler);

export default router;
