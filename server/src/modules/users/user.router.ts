import { Router } from "express";

import { Authenticate } from "@/middleware/authenticate.middleware";
import { getMeHandler } from "@/modules/users/user.controller";

const router = Router();

router.get("/me", Authenticate, getMeHandler);

export default router;
