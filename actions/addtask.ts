"use server";
import * as z from "zod";
import { addTaskSchema } from "@/schemas";
import prisma from "@/lib/prisma";

export const addtask = async (values: z.infer<typeof addTaskSchema>) => {
  console.log(values);

  const validatedFields = addTaskSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Oops! All fields are required" };
  }

  const { thumbnailURL, videoURL, points } = validatedFields.data;

  await prisma.task.create({
    data: {
      thumbnailURL,
      videoURL,
      points,
    },
  });

  return { success: "Task Added!." };
};
