"use client";

// /components/VideoCard.tsx
import React from "react";
import { Chip } from "@nextui-org/react";
import { RiTv2Line } from "react-icons/ri";
interface PostCardProps {
  title: string;
  videoURL: string;
  category: string;
  content: string;
}
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function UserPostCard({
  title,
  videoURL,
  category,
}: PostCardProps) {

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-28 bg-blend-soft-light bg-white backdrop-blur shadow-sm">
      <div className="leading-0">
        <div className=" aspect-square ">
          <ReactPlayer
            url={videoURL}
            className="react-player"
            width="100%"
            height="100%"
            controls={false}
            playing={false}
            loop={false}
            onError={(e) => console.error("Error playing video: ", e)}
          />

          <div className="p-4">
            <div className="mb-2 flex items-center gap-5">
              <Chip
                className="bg-emerald-50 px-2 text-emerald-800"
                size="sm"
                radius="sm"
                startContent={
                  <RiTv2Line className="text-2xl text-emerald-600 h-4 w-4 mr-2 pointer-events-none flex-shrink-0" />
                }
              >
                {category}
              </Chip>
            </div>

            <h3 className=" p-2 font-bold text-lg tracking-normal">{title}</h3>
            {/* <p className="p-2 text-sm">{content}</p> */}
            
          </div>
        </div>
      </div>
    </div>
  );
}
