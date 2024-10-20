"use client";

import HomeCategoryBlock from "@/components/HomeCategoryBlock";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Home() {
  return (
    <>
      <main className="container p-4 mb-12 space-y-6  ">
        <section className="overflow-hidden rounded-2xl">
          <ReactPlayer
            url="https://utfs.io/f/msHXJUCYPHtuZsAKOeWE2yB1rHlw0xbE5JjXPFtCpRshSvDW "
            className=" react-player"
            width="100%"
            height="100%"
            // light="https://utfs.io/f/msHXJUCYPHtumnm5gaCYPHtuWsjUeXlxiOLzyE2hIv1qAbKS"
            controls={true}
            playing={false}
            onError={(e) => console.error("Error playing video: ", e)}
          />
        </section>
        <h1 className="mt-4 mb-4 text-bhgreen font-bold text-2xl">
          Habari kutoka kwa Wanaboda
        </h1>
        <HomeCategoryBlock />
      </main>
    </>
  );
}
