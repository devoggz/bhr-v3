"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { registerSchema } from "@/schemas";
import { register } from "../../../actions/register";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollShadow } from "@nextui-org/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "@/hooks/useLocation";

import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "@nextui-org/react";
import TermsConditions from "@/app/(share layout)/terms/page";
import FormError from "../ui/form-error";
import FormSuccess from "../ui/form-success";
import { countiesData } from "@/data/countyData";

const items = [
  {
    id: "mwenyepikipiki",
    label: "Mwenye Pikipiki",
  },
  {
    id: "mwendeshaji",
    label: "Mwendeshaji",
  },
  {
    id: "mechanic",
    label: "Mechanic",
  },
] as const;

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      county: "",
      subCounty: "",
      ward: "",
      phoneNumber: "",
      password: "",
      username: "",
      idNumber: "",
      bikeNumber: "",
      riderType: [],
      terms: false,
      stage: "",
    },
  });
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError(""), setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          router.push("/login");
        }
      });
    });
  };

  // BIKE FIRST, TUSHIRIKIANE, T

  const {
    selectedCounty,
    selectedSubCounty,
    selectedWard,
    handleCountyChange,
    handleSubCountyChange,
    handleWardChange,
  } = useLocation(countiesData);

  return (
    <div className="container mb-6 mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4 items-center">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jina la kwanza</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jina la Pili</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="johndoe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nambari ya Simu </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="07000123456"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nambari ya Kipande</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="12345678"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* MAKE IT UPPERCASE */}
            <FormField
              control={form.control}
              name="bikeNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nambari ya PikiPiki</FormLabel>

                  <FormControl>
                    <Input
                      className="uppercase"
                      disabled={isPending}
                      placeholder="KMWT1234"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="my-6" />

          <div className="grid grid-cols-2 gap-4 items-center justify-between">
            {/* County Selector */}
            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Kaunti Yako</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCountyChange(value); // Update subcounty options based on selected county
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kaunti" />
                      </SelectTrigger>
                      <SelectContent>
                        {countiesData.map((county) => (
                          <SelectItem
                            key={county.county_code}
                            value={county.county_name}
                          >
                            {county.county_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SubCounty Selector */}
            <FormField
              control={form.control}
              name="subCounty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Kaunti Ndogo</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleSubCountyChange(value); // Update ward options based on selected subcounty
                      }}
                      defaultValue={field.value}
                      disabled={!selectedCounty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kaunti Ndogo" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCounty?.sub_counties.map((subCounty) => (
                          <SelectItem
                            key={subCounty.subcounty_name}
                            value={subCounty.subcounty_name}
                          >
                            {subCounty.subcounty_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ward Selector */}
            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Ward Yako</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleWardChange(value); // Update stage options based on selected ward
                      }}
                      defaultValue={field.value}
                      disabled={!selectedSubCounty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ward" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedSubCounty?.wards.map((ward) => (
                          <SelectItem
                            key={ward.ward_name}
                            value={ward.ward_name}
                          >
                            {ward.ward_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stage Selector */}
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chagua Stage Yako</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedWard}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedWard?.stages.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="riderType"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    Mwenye Pikipiki/Mwendeshaji/Mechanic
                  </FormLabel>
                </div>
                <div className="grid grid-cols-3 gap-1 items-center justify-center">
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="riderType"
                      render={({ field }) => {
                        return (
                          <FormItem key={item.id}>
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: any) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
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
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Nakubaliana na Terms and Conditions</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormSuccess message={success} />

          <FormError message={error} />

          <div className="mt-12">
            <Button
              disabled={isPending}
              className="w-full bg-bhgreen  mt-2 mb-2 text-white h-12 font-medium rounded-lg  
            "
            >
              Tengeneza Akaunti Yangu
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
