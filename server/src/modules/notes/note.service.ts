import prisma from "@/config/db";
import { ForbiddenError, NotFoundError } from "@/errors";
import type {
	CreateNoteInput,
	UpdateNoteInput,
} from "@/modules/notes/note.schema";

export const getNotesService = async (authorId: string) => {
	return prisma.note.findMany({
		where: {
			authorId,
		},
	});
};

export const createNoteService = (
	createNoteInput: CreateNoteInput,
	authorId: string,
) => {
	return prisma.note.create({
		data: {
			title: createNoteInput.title,
			content: createNoteInput.content,
			authorId,
		},
	});
};

export const findNoteByIdService = async (noteId: string, authorId: string) => {
	const note = await prisma.note.findUnique({
		where: {
			id: noteId,
		},
	});

	if (!note) {
		throw new NotFoundError("Note not found");
	}

	if(note.authorId !== authorId){
		throw new ForbiddenError('permission denied')
	}

	return note;
};

export const updateNoteService = async (
	noteId: string,
	authorId: string,
	updateNoteInput: UpdateNoteInput["body"],
) => {
	console.log(noteId);
	
	const existingNote = await findNoteByIdService(noteId, authorId);

	if (!existingNote) {
		throw new NotFoundError("Note not found");
	}

	const updatedNote = await prisma.note.update({
		where: { id: existingNote.id },
		data: updateNoteInput,
	});

	return updatedNote;
};

export const deleteNoteService = async (noteId: string, authorId: string) => {
	const existingNote = await findNoteByIdService(noteId, authorId);

	if (!existingNote) {
		throw new NotFoundError("Note not found");
	}
	return prisma.note.delete({
		where: { id: noteId },
	});
};
