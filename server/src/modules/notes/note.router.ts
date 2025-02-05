import { Router } from "express";

import { Authenticate } from "@/middleware/authenticate.middleware";
import {
	createNoteHandler,
	deleteNoteHandler,
	getAllNotesOfUserHandler,
	getNoteHandler,
	updateNoteHandler,
} from "@/modules/notes/note.controller";

const router = Router();

router.use(Authenticate);
router.route("/").get(getAllNotesOfUserHandler).post(createNoteHandler);
router
	.route("/:noteId")
	.get(getNoteHandler)
	.patch(updateNoteHandler)
	.delete(deleteNoteHandler);

export default router;
