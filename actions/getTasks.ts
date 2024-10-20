"use server";
import prisma from "@/lib/prisma";

export const getTasks = async () => {
  try {
    const tasks = await prisma.task.findMany({
      select: {
        thumbnailURL: true,
        videoURL: true,
        points: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};
