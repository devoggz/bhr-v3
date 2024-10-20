"use client";

import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StoryTwo = ({ taskId }: { taskId: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [points, setPoints] = useState(0); // Initialize points
  const [isLoading, setIsLoading] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false); // Track if video is playing
  const [videoEnded, setVideoEnded] = useState(false); // Track if video has ended

  // Fetch user's current task completion status and points
  useEffect(() => {
    const checkTaskStatus = async () => {
      try {
        const res = await fetch(
          `/api/check-task-completion?phone=0712732826&task=${taskId}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch task completion status");
        }
        const data = await res.json();
        setTaskCompleted(data.completed);
        setPoints(data.points || 0);
      } catch (error) {
        console.error("Error fetching task data", error);
      }
    };

    checkTaskStatus();
  }, [taskId]);

  const handleCompletion = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/award-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: "0712732826", pointsToAdd: 5 }), // Send phone and points
      });

      if (res.ok) {
        const data = await res.json();
        setTaskCompleted(true); // Mark the task as completed
        setPoints(data.points); // Update points
        toast.success("Points awarded!"); // Show toast
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Task already completed!");
      }
    } catch (error) {
      console.error("Error awarding points:", error);
      toast.error("Error awarding points");
    }
    setIsLoading(false);
  };

  return (
    <div className="">
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start"></CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full object-cover"
          src="https://kenyabankinginsights.co.ke/wp-content/uploads/2024/07/1x-1-2-1024x683.jpeg"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          {taskCompleted && (
            <div className="text-green-500 p-2">Task Completed</div>
          )}

          <Button
            className="rounded-full bg-bhpink text-white p-4"
            onPress={onOpen}
            disabled={taskCompleted} // Disable button if task completed
          >
            Tazama Tangazo + 5 points
          </Button>

          <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody>
                    <div className="overflow-hidden rounded-2xl ">
                      <ReactPlayer
                        url="https://www.youtube.com/watch?v=k7qmKXAY0CQ "
                        className="react-player"
                        width="100%"
                        height="100%"
                        controls={false}
                        playing={true}
                        onPlay={() => setVideoPlaying(true)} // Track when video starts playing
                        onEnded={() => {
                          setVideoPlaying(false); // Mark video as not playing
                          setVideoEnded(true); // Mark video as ended
                        }}
                        onError={(e) =>
                          console.error("Error playing video: ", e)
                        }
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onPress={handleCompletion}
                      disabled={!videoEnded || isLoading || taskCompleted}
                      className="rounded-full w-full bg-bhpink text-white"
                    >
                      {isLoading ? "Awarding..." : "Nyakua pointi tano"}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StoryTwo;
