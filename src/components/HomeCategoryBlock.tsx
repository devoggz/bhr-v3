"use client";

import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

// import required modules
import { Pagination } from "swiper/modules";

const HomeCategoryBlock = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col  gap-4">

<Card  className="py-4 cursor-pointer">
          <CardHeader className="pb-2 pt-2 px-4 flex-col items-start">
            <div onClick={()=> router.push("/bike-yangu")} >
              
        <h4 className="font-bold text-large text-bhpink ">Yaani Bike Yangu Inanibamba</h4>
</div>
      </CardHeader>
      <CardBody className="overflow-hidden py-2">
            <Image
              isZoomed
          alt="Card background"
          className="cursor-pointer object-cover w-full rounded-xl"
              src="/images/bikeyangu.jpeg"
              onClick={()=> router.push("/bike-yangu")}        />
      </CardBody>
      </Card>


      <Card  className="py-4 cursor-pointer">
          <CardHeader className="pb-2 pt-2 px-4 flex-col items-start">
            <div onClick={()=> router.push("/tushirikiane-tufaulu")} >
              
        <h4 className="font-bold text-large text-bhpink ">Tushirikiane Tufaulu</h4>
</div>
      </CardHeader>
      <CardBody className="overflow-hidden py-2">
            <Image
              isZoomed
          alt="Card background"
          className="cursor-pointer object-cover w-full rounded-xl"
              src="/images/tushirikiane.jpeg"
              onClick={()=> router.push("/tushirikiane-tufaulu")}        />
      </CardBody>
      </Card>

      
      <Card  className="py-4 cursor-pointer">
          <CardHeader className="pb-2 pt-2 px-4 flex-col items-start">
            <div onClick={()=> router.push("/sacco-zitujenge")} >
              
        <h4 className="font-bold text-bhpink text-large ">Sacco Zitujenge</h4>
</div>
      </CardHeader>
      <CardBody className="overflow-hidden py-2">
            <Image
              isZoomed
          alt="Card background"
          className="cursor-pointer object-cover w-full rounded-xl"
              src="/images/sacco.jpeg"
              onClick={()=> router.push("/sacco-zitujenge")}        />
      </CardBody>
      </Card>



      
    </div>
  );
};

export default HomeCategoryBlock;
