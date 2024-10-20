"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

interface UserProps {
  phoneNumber: string;
  username: string;
  bikeNumber: string;
  riderType: string;
  points: number;
  stage: string;
}

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/profile" });
  revalidatePath("/profile");
};

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
  revalidatePath("/login");
};

const getUserByEmail = async (phoneNumber: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        phoneNumber,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUser = async ({
  phoneNumber,
  username,
  bikeNumber,
  points,
  stage,
}: UserProps) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        phoneNumber,
        username,
        bikeNumber,
        points,
        stage,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
