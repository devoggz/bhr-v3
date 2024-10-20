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

const StoryThree = ({ taskId }: { taskId: string }) => {
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
          src="/images/boda-insure.png"
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
                        url="https://fb.watch/v6c6nriHR-/ "
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

export default StoryThree;

// "use client";

// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Image,
//   Button,
// } from "@nextui-org/react";
// import { useRouter } from "next/navigation";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   useDisclosure,
//   ModalBody,
//   ModalFooter,
// } from "@nextui-org/react";

// import React, { useState, useEffect } from "react";
// import { CustomButton } from "../CustomButton";
// import ReactPlayer from "react-player";
// import CompleteButton from "../CompleteButton";
// import { CheckCircle } from "lucide-react";

// const StoryThree = () => {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [taskCompleted, setTaskCompleted] = useState(false);

//   // Check if the task was already completed
//   useEffect(() => {
//     const completed = localStorage.getItem("task_completed");
//     if (completed) {
//       setTaskCompleted(true);
//     }
//   }, []);

//   const handleCompletion = () => {
//     setTaskCompleted(true);
//     localStorage.setItem("task_completed", "true");
//   };

//   return (
//     <div className="">
//       <Card
//         isFooterBlurred
//         className="w-full h-[300px] col-span-12 sm:col-span-5"
//       >
//         <CardHeader className="absolute z-10 top-1 flex-col items-start">
//           {/* Task details */}
//         </CardHeader>
//         <Image
//           removeWrapper
//           alt="Card example background"
//           className="z-0 w-full h-full object-cover"
//           src="/images/boda-insure.png"
//         />
//         <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
//           {taskCompleted && (
//             <div className="flex flex-row items-center justify-center gap-2 px-2 bg-green-500 text-white p-2 rounded-full">
//               <CheckCircle />
//               Umemaliza
//             </div>
//           )}
//           <Button
//             className="rounded-full bg-bhpink text-white p-4"
//             onPress={onOpen}
//           >
//             Tazama Tangazo + 5 points
//           </Button>
//           <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
//             <ModalContent>
//               {(onClose) => (
//                 <>
//                   <ModalBody>
//                     <div className="overflow-hidden rounded-2xl ">
//                       <ReactPlayer
//                         url="https://fb.watch/v6c6nriHR-/  "
//                         className="react-player"
//                         width="100%"
//                         height="100%"
//                         controls={false}
//                         playing={true}
//                         onError={(e) =>
//                           console.error("Error playing video: ", e)
//                         }
//                       />
//                     </div>
//                   </ModalBody>
//                   <ModalFooter>
//                     <CompleteButton onComplete={handleCompletion} />
//                   </ModalFooter>
//                 </>
//               )}
//             </ModalContent>
//           </Modal>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default StoryThree;

// // "use client";

// // import {
// //   Card,
// //   CardHeader,
// //   CardBody,
// //   CardFooter,
// //   Image,
// //   Button,
// // } from "@nextui-org/react";
// // import { useRouter } from "next/navigation";
// // import {
// //   Modal,
// //   ModalContent,
// //   ModalHeader,
// //   useDisclosure,
// //   ModalBody,
// //   ModalFooter,
// // } from "@nextui-org/react";

// // import React, { useEffect, useState } from "react";
// // import { CustomButton } from "../CustomButton";
// // import ReactPlayer from "react-player";
// // import CompleteButton from "../CompleteButton";
// // import { CheckCircle } from "lucide-react";

// // const StoryThree = () => {
// //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
// //   const [isPlaying, setPlaying] = useState(false);
// //   const [taskCompleted, setTaskCompleted] = useState(false);

// //   // Check if the task was already completed
// //   useEffect(() => {
// //     const completed = localStorage.getItem("task_completed");
// //     if (completed) {
// //       setTaskCompleted(true);
// //     }
// //   }, []);

// //   const handleCompletion = () => {
// //     setTaskCompleted(true);
// //     localStorage.setItem("task_completed", "true");
// //   };

// //   const router = useRouter();
// //   return (
// //     <div>
// //       <Card
// //         isFooterBlurred
// //         className="w-full h-[300px] col-span-12 sm:col-span-5"
// //       >
// //         <CardHeader className="absolute z-10 top-1 flex-col items-start">
// //           {/* <p className="text-tiny text-white/60 uppercase font-bold">
// //             Life Ijipe Leo
// //           </p>
// //           <h4 className="text-white font-bold text-xl">
// //             Sema YEA to new begginings
// //           </h4> */}
// //         </CardHeader>
// //         <Image
// //           removeWrapper
// //           alt="Card example background"
// //           className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
// //           src="/images/boda-insure.png"
// //         />
// //         <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
// //           {taskCompleted && (
// //             <div className="flex flex-row items-center justify-center gap-2 px-2 bg-green-500 text-white p-2 rounded-full">
// //               <CheckCircle />
// //               Imemalizika
// //             </div>
// //           )}
// //           <Button
// //             className="rounded-full bg-bhpink text-white p-4"
// //             onPress={onOpen}
// //           >
// //             Tazama Tangazo +5 points
// //           </Button>
// //           <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
// //             <ModalContent>
// //               {(onClose) => (
// //                 <>
// //                   <ModalHeader className="flex flex-col gap-1">
// //                     Story Za Pesa
// //                   </ModalHeader>
// //                   <ModalBody>
// //                     <div className="overflow-hidden rounded-2xl ">
// //                       <ReactPlayer
// //                         url="https://fb.watch/v6c6nriHR-/ "
// //                         className="react-player"
// //                         width="100%"
// //                         height="100%"
// //                         onP
// //                         controls={false}
// //                         playing={true}
// //                         onError={(e) =>
// //                           console.error("Error playing video: ", e)
// //                         }
// //                       />
// //                       {/* <Video src={videoURL} /> */}
// //                     </div>
// //                   </ModalBody>
// //                   <ModalFooter>
// //                     <Button
// //                       className="w-full"
// //                       color="default"
// //                       onPress={onClose}
// //                     >
// //                       Maliza kutazama Tangazo
// //                     </Button>
// //                   </ModalFooter>
// //                 </>
// //               )}
// //             </ModalContent>
// //           </Modal>
// //         </CardFooter>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default StoryThree;
