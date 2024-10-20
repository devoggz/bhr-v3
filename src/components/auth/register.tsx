"use client";

import clsx from "clsx";
import SignInForm from "./sign-in-form";
import { Image, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import UserButton from "../UserButton";
import RegisterForm from "./register-form";

export default function Register() {
  const router = useRouter();

  return (
    <div className="container align-middle px-4 mb-16">
      <div className="mt-6 mb-6 ">
        <h2 className="  text-2xl font-bold titlecase text-bhgreen leading-[48px] ">
          Tengeneza akaunti yangu{" "}
        </h2>
      </div>
      <RegisterForm />
      <div className="mt-2 mb-2">
        <p className="text-center text-small">
          Una akaunti tayari{" "}
          <Link
            className="cursor-pointer"
            size="sm"
            onPress={() => router.replace("/login")}
          >
            Login/Ingia
          </Link>
        </p>
      </div>
      <div></div>
    </div>
  );
}
