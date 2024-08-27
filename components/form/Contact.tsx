"use client";

import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });

  const c = useTranslations('Contact');
  const translate = {
    title: c('title'),
    subTitle: c('subTitle'),
    name: {
      label: c('name.label'),
      placeholder: c('name.placeholder'),
      errorMessage: c('name.errorMessage')
    },
    email: {
      label: c('email.label'),
      placeholder: c('email.placeholder'),
      errorMessage: c('email.errorMessage')
    },
    subject: {
      label: c('subject.label'),
      placeholder: c('subject.placeholder'),
    },
    message: {
      label: c('message.label'),
      placeholder: c('message.placeholder'),
      errorMessage: c('message.errorMessage')
    },
    agreeToTerms: {
      label: c('agreeToTerms.label'),
      errorMessage: c('agreeToTerms.errorMessage')
    },
    button: c('button'),
    successMessage: c('successMessage'),
    failedMessage: c('failedMessage'),
    errorMessage: c('errorMessage')
  }


  const contactSchema = z.object({
    name: z.string().min(1, translate.name.errorMessage),
    email: z.string().min(1, translate.email.errorMessage),
    subject: z.string().optional(),
    message: z.string().min(1, translate.message.errorMessage),
    agreeToTerms: z.boolean({
      required_error: translate.agreeToTerms.errorMessage,
      invalid_type_error: translate.agreeToTerms.errorMessage,
    }).refine(val => val === true, {
      message: translate.agreeToTerms.errorMessage,
    }),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await axios.post("/api/email", data);
      if (response.status === 200) {
        setFormStatus({ type: "success", message: translate.successMessage });
        reset();
      } else {
        setFormStatus({ type: "error", message: translate.failedMessage });
      }
    } catch (error) {
      setFormStatus({ type: "error", message: translate.errorMessage });
    }
  };

  return (
    <section className="w-full pb-20 lg:py-10" id="contact">
      <h2 className="text-4xl text-white text-center pt-20 pb-20">
        {translate.title} <span className="text-purple"></span>
      </h2>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black-100">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          {translate.title}
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {translate.subTitle}<Link href="tel:+491715186152" className="mt-5 text-violet-500">
            +49 171 5186152
          </Link>
        </p>

        <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="name">{translate.name.label}</Label>
              <Input id="name" placeholder={translate.name.placeholder} type="text" {...register("name")} />
              {errors.name && typeof errors.name.message === 'string' && (
                <p className="error text-red-600 text-sm">{errors.name.message}</p>
              )}
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">{translate.email.label}</Label>
            <Input id="email" placeholder={translate.email.placeholder} type="email" {...register("email")} />
            {errors.email && typeof errors.email.message === 'string' && (
              <p className="error text-red-600 text-sm">{errors.email.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="subject">{translate.subject.label}</Label>
            <Input id="subject" placeholder={translate.subject.placeholder} type="text" {...register("subject")} />
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="message">{translate.message.label}</Label>
            <Textarea
              className="flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400"
              id="message"
              placeholder={translate.message.placeholder}
              {...register("message")}
            />
            {errors.message && typeof errors.message.message === 'string' && (
              <p className="error text-red-600 text-sm">{errors.message.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <div className="flex flex-row items-center gap-2  ">
              <input className="p-0  border-none" type="checkbox" id="agreeToTerms"    {...register("agreeToTerms")} />
              <Label htmlFor="agreeToTerms">{translate.agreeToTerms.label}</Label>
            </div>
            {errors.agreeToTerms && typeof errors.agreeToTerms.message === 'string' && (
              <p className="error text-red-600 text-sm">{errors.agreeToTerms.message}</p>
            )}
          </LabelInputContainer>

          <button
            disabled={!isValid}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {translate.button} &rarr;
            <BottomGradient />
          </button>

          {formStatus.message && (
            <p className={formStatus.type === "success" ? "text-green-600 mt-4" : "text-red-600 mt-4"}>
              {formStatus.message}
            </p>
          )}
        </form>
      </div>
    </section >
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
