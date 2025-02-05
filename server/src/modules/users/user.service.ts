import prisma from "@/config/db";
import { UnAuthorizedError } from "@/errors";

export const findUserByIdService = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!user) {
		throw new UnAuthorizedError("user not found");
	}
  const {password,...safeUser} = user
	return safeUser;
};

export const findUserbyEmail = async (email: string) => {
	return prisma.user.findUnique({
		where: { email },
	});
};
