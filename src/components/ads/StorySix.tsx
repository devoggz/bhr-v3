"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import CompleteButton from "../CompleteButton";
import { CheckCircle } from "lucide-react";

const StorySix = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [taskCompleted, setTaskCompleted] = useState(false);

  // Check if the task was already completed
  useEffect(() => {
    const completed = localStorage.getItem("task_completed");
    if (completed) {
      setTaskCompleted(true);
    }
  }, []);

  const handleCompletion = () => {
    setTaskCompleted(true);
    localStorage.setItem("task_completed", "true");
  };

  return (
    <div className="">
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          {/* Task details */}
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full object-cover"
          src="/images/uba.jpg"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          {taskCompleted && (
            <div className="flex flex-row items-center justify-center gap-2 px-2 bg-green-500 text-white p-2 rounded-full">
              <CheckCircle />
              Umemaliza
            </div>
          )}
          <Button
            className="rounded-full bg-bhpink text-white p-4"
            onPress={onOpen}
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
                        url="https://www.tiktok.com/@roam.electric/video/7392654519718530310"
                        className="react-player"
                        width="100%"
                        height="100%"
                        controls={false}
                        playing={true}
                        onError={(e) =>
                          console.error("Error playing video: ", e)
                        }
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <CompleteButton onComplete={handleCompletion} />
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

export default StorySix;
