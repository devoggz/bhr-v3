// TaskOneCard.tsx

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Assuming next-auth is used for session management
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";

interface TaskOneCardProps {
  videoURL: string;
  thumbnailURL: string;
  points: number;
  taskId: string; // Assuming you have a taskId for each task
  userId: string; // Assuming you pass the logged-in user's id to this component
  isTaskCompleted: boolean; // Determines if the task is already completed
}

const TaskOneCard: React.FC<TaskOneCardProps> = ({
  videoURL,
  thumbnailURL,
  points,
  taskId,
  userId,
  isTaskCompleted,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="relative">
        <Image
          src={thumbnailURL}
          alt="Task Thumbnail"
          width={400}
          height={200}
          className="rounded-md"
        />
      </div>

      <div className="mt-4 text-center">
        <video controls src={videoURL} className="w-full h-48" />

        <div className="mt-4">
          <p className="font-semibold text-gray-800">Earn {points} Points</p>

          <Button className="bg-emerald-500 text-white mt-2">Get Points</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskOneCard;
