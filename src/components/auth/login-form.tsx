"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GoogleLogin from "../google-login";
import { loginSchema } from "@/schemas";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import { login } from "../../../actions/login";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError(""), setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          router.push("/home");
        }
      });
    });
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  return (
    <div className="mb-6 mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nambari ya Simu</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    size="lg"
                    placeholder="0700123456"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    size="lg"
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSuccess message={success} />

          <FormError message={error} />

          <div className="mt-12">
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-bhblue text-white  mt-2 mb-2 font-bold rounded-lg  
            "
            >
              Login/ Ingia
            </Button>
          </div>
        </form>
      </Form>
      {/* <GoogleLogin /> */}
    </div>
  );
};

export default LoginForm;
