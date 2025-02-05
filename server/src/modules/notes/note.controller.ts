import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import type {
	CreateNoteInput,
	DeleteNoteInput,
	GetNoteInput,
	UpdateNoteInput,
} from "@/modules/notes/note.schema";
import {
	createNoteService,
	deleteNoteService,
	findNoteByIdService,
	getNotesService,
	updateNoteService,
} from "@/modules/notes/note.service";

export const getAllNotesOfUserHandler = async (req: Request, res: Response) => {
	const notes = await getNotesService(req.userId as string);
	res.status(StatusCodes.OK).json({
		status: true,
		data: notes,
	});
};

export const createNoteHandler = async (
	req: Request<{}, {}, CreateNoteInput>,
	res: Response,
) => {
	const note = await createNoteService(req.body, req.userId as string);
	res.status(StatusCodes.CREATED).json({
		status: true,
		data: note,
	});
};

export const getNoteHandler = async (
	req: Request<GetNoteInput>,
	res: Response,
) => {
	console.log(req.params.noteId,
		req.userId as string,);
	
	const note = await findNoteByIdService(
		req.params.noteId,
		req.userId as string,
	);
	res.status(StatusCodes.OK).json({
		status: true,
		data: note,
	});
};

export const updateNoteHandler = async (
	req: Request<UpdateNoteInput["params"], {}, UpdateNoteInput["body"]>,
	res: Response,
) => {
	const note = await updateNoteService(
		req.params.noteId,
		req.userId as string,
		req.body,
	);
	res.status(StatusCodes.OK).json({
		status: true,
		data: note,
	});
};

export const deleteNoteHandler = async (
	req: Request<DeleteNoteInput>,
	res: Response,
) => {
	await deleteNoteService(req.params.noteId, req.userId as string);
	res.status(StatusCodes.NO_CONTENT).json();
};
