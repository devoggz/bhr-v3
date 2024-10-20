"use server";
import * as z from "zod";
import { registerSchema } from "@/schemas";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getUserByPhone } from "./user";
import { redirect } from "next/navigation";

export const register = async (values: z.infer<typeof registerSchema>) => {
  console.log(values);

  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Oops! All fields are required" };
  }

  const {
    firstName,
    lastName,
    phoneNumber,
    password,
    username,
    idNumber,
    bikeNumber,
    riderType,
    terms,
    ward,
    stage,
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByPhone(phoneNumber);

  if (existingUser) {
    return { error: "Already a member, proceed to login page" };
  }

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword,
      username,
      idNumber,
      bikeNumber,
      riderType,
      terms,
      ward,
      stage,
    },
  });

  // send verification token

  return { success: "Sawa, wacha tukuingize….." };
};
