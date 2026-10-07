"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/schemas/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertCircle,
  Send,
  RotateCcw,
  ShieldCheck,
  User,
  Mail,
  Phone,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

export function ContactForm() {
  const [submissionSuccess, setSubmissionSuccess] = React.useState<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur", // Validates on blur and on submit
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // In client-only validation demo, simulate network handoff latency
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmissionSuccess(data);
  };

  const handleReset = () => {
    reset();
    setSubmissionSuccess(null);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5 rounded-xl border bg-card p-5 sm:p-7 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b">
          <div>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              Inquiry &amp; Support Form
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Every field validates through the canonical Zod schema before submission.
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] w-fit">
            zodResolver(contactFormSchema)
          </Badge>
        </div>

        {/* Full Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="fullName" className="text-xs flex items-center gap-1.5 font-medium">
              <User className="size-3 text-muted-foreground" />
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="e.g. Eleanor Vance"
              autoComplete="name"
              {...register("fullName")}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-[11px] text-destructive flex items-center gap-1">
                <AlertCircle className="size-3 shrink-0" />
                <span>{errors.fullName.message}</span>
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs flex items-center gap-1.5 font-medium">
              <Mail className="size-3 text-muted-foreground" />
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="eleanor@university.edu"
              autoComplete="email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.email && (
              <p id="email-error" className="text-[11px] text-destructive flex items-center gap-1">
                <AlertCircle className="size-3 shrink-0" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Phone & Subject Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs flex items-center gap-1.5 font-medium">
              <Phone className="size-3 text-muted-foreground" />
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 019-2834"
              autoComplete="tel"
              {...register("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.phone && (
              <p id="phone-error" className="text-[11px] text-destructive flex items-center gap-1">
                <AlertCircle className="size-3 shrink-0" />
                <span>{errors.phone.message}</span>
              </p>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <Label htmlFor="subject" className="text-xs flex items-center gap-1.5 font-medium">
              <HelpCircle className="size-3 text-muted-foreground" />
              Subject <span className="text-destructive">*</span>
            </Label>
            <Input
              id="subject"
              placeholder="e.g. Course architecture question"
              {...register("subject")}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={errors.subject ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.subject && (
              <p id="subject-error" className="text-[11px] text-destructive flex items-center gap-1">
                <AlertCircle className="size-3 shrink-0" />
                <span>{errors.subject.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-xs flex items-center gap-1.5 font-medium">
            <MessageSquare className="size-3 text-muted-foreground" />
            Message Context <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            rows={4}
            placeholder="Please detail your question or technical requirements (minimum 15 characters)..."
            {...register("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={errors.message ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.message && (
            <p id="message-error" className="text-[11px] text-destructive flex items-center gap-1">
              <AlertCircle className="size-3 shrink-0" />
              <span>{errors.message.message}</span>
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="text-xs h-9 px-5 gap-2"
          >
            <Send className="size-3.5" />
            <span>{isSubmitting ? "Validating & Submitting..." : "Submit Inquiry"}</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs h-9 gap-1.5"
          >
            <RotateCcw className="size-3" />
            <span>Clear Fields</span>
          </Button>
        </div>
      </form>

      {/* Submission Success Banner */}
      {submissionSuccess && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="size-4 text-emerald-400" />
              <span>Zod Validation Succeeded! Form Data Ingested</span>
            </div>
            <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px]">
              Type-Safe Payload
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground">
            All fields satisfied the canonical constraints in <code className="text-foreground">schemas/contact-schema.ts</code>.
          </p>
          <pre className="mt-2 rounded bg-background/60 p-2.5 font-mono text-[10px] text-foreground overflow-x-auto border">
            {JSON.stringify(submissionSuccess, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
