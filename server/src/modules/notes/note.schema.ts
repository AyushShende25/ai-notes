import { z } from "zod";

const baseNoteSchema = z.object({
	title: z.string({
		required_error: "title is required",
	}),
	content: z.string({
		required_error: "title is required",
	}),
});

const noteIdSchema = z.object({
	noteId: z.string({ required_error: "note id is required" }),
});

export const createNoteSchema = z.object({
	body: baseNoteSchema,
});

export const getNoteSchema = z.object({
	params: noteIdSchema,
});

export const updateNoteSchema = z.object({
	body: baseNoteSchema.partial(),
	params: noteIdSchema,
});

export const deleteNoteSchema = z.object({
	params: noteIdSchema,
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>["body"];
export type GetNoteInput = z.infer<typeof getNoteSchema>["params"];
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
export type DeleteNoteInput = z.infer<typeof deleteNoteSchema>["params"];
