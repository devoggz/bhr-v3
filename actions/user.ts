import prisma from "@/lib/prisma";

export const getUserByPhone = async (phoneNumber: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByPhoneNumber = async (phoneNumber: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
