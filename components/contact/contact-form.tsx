"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/schemas/contact-schema";
import {
  submitContactFormAction,
  type ContactActionResult,
} from "@/actions/contact-actions";
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
  Loader2,
  Server,
  Sparkles,
} from "lucide-react";

export function ContactForm() {
  const [serverResult, setServerResult] = React.useState<ContactActionResult | null>(null);
  const [optimisticDraft, setOptimisticDraft] = React.useState<ContactFormData | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    setServerResult(null);

    // OPTIMISTIC FEEDBACK PATTERN:
    // We register the validated submission as an "in-flight optimistic submission"
    // immediately to reassure the user, but we DO NOT falsely declare that the
    // database record has been finalized before the server returns.
    setOptimisticDraft(data);

    const toastId = toast.loading("Dispatching inquiry to server action...", {
      description: `Targeting server endpoint for: "${data.subject}"`,
    });

    startTransition(async () => {
      try {
        const response = await submitContactFormAction(data);
        setServerResult(response);
        setOptimisticDraft(null);

        if (response.success) {
          toast.success("Inquiry successfully processed!", {
            id: toastId,
            description: response.message,
            duration: 5000,
          });
          reset();
        } else {
          toast.error("Submission rejected by server", {
            id: toastId,
            description: response.message,
            duration: 6000,
          });

          // Map server-side validation rejections back into React Hook Form errors
          if (response.errors) {
            Object.entries(response.errors).forEach(([field, messages]) => {
              if (messages && messages[0]) {
                setError(field as keyof ContactFormData, {
                  type: "server",
                  message: messages[0],
                });
              }
            });
          }
        }
      } catch {
        // Rollback optimistic state and display failure toast
        setOptimisticDraft(null);
        toast.error("Network or unexpected server failure", {
          id: toastId,
          description: "Could not reach server action. Your form draft has been preserved.",
        });
      }
    });
  };

  const handleReset = () => {
    reset();
    setServerResult(null);
    setOptimisticDraft(null);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={isPending}
        className="space-y-5 rounded-xl border bg-card p-5 sm:p-7 shadow-sm transition-opacity"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b">
          <div>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              Inquiry &amp; Support Form
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Client validation with Zod resolver &rarr; Server Action with secondary Zod verification &amp; Sonner toasts.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {isPending ? (
              <Badge variant="default" className="text-[10px] bg-primary animate-pulse">
                Mutation In-Flight
              </Badge>
            ) : (
              <Badge variant="secondary" className="font-mono text-[10px]">
                Ready for Dispatch
              </Badge>
            )}
          </div>
        </div>

        {/* Optimistic in-flight banner */}
        {optimisticDraft && isPending && (
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-xs space-y-1 animate-in fade-in">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Sparkles className="size-3.5 animate-spin" />
              <span>Optimistic Submission In-Flight:</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Transmitting &quot;{optimisticDraft.subject}&quot; for {optimisticDraft.fullName}. Awaiting server transaction confirmation...
            </p>
          </div>
        )}

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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
            disabled={isPending}
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
            disabled={isPending}
            className="text-xs h-9 px-5 gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Dispatching Mutation...</span>
              </>
            ) : (
              <>
                <Send className="size-3.5" />
                <span>Submit Inquiry</span>
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={isPending}
            className="text-xs h-9 gap-1.5"
          >
            <RotateCcw className="size-3" />
            <span>Clear Fields</span>
          </Button>
        </div>
      </form>

      {/* Verified Server Result Card */}
      {serverResult && (
        <div
          className={`rounded-xl border p-4 text-xs space-y-2.5 animate-in fade-in ${
            serverResult.success
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              {serverResult.success ? (
                <CheckCircle2 className="size-4 text-emerald-400" />
              ) : (
                <AlertCircle className="size-4 text-destructive" />
              )}
              <span>
                {serverResult.success
                  ? "Server Action Execution Confirmed!"
                  : "Server Action Validation Rejection"}
              </span>
            </div>
            <Badge
              variant={serverResult.success ? "outline" : "destructive"}
              className="text-[10px]"
            >
              <Server className="size-3 mr-1" />
              {serverResult.success ? "Status: 200 OK" : "Status: 422 Unprocessable"}
            </Badge>
          </div>

          <p className="text-[11px] opacity-90">{serverResult.message}</p>

          {serverResult.data && (
            <pre className="mt-2 rounded bg-background/60 p-2.5 font-mono text-[10px] text-foreground overflow-x-auto border">
              {JSON.stringify(serverResult.data, null, 2)}
            </pre>
          )}

          {serverResult.errors && (
            <div className="mt-2 rounded bg-background/60 p-2 text-[10px] font-mono text-destructive border border-destructive/20 space-y-1">
              <span className="font-bold">Server Validation Error Details:</span>
              <pre className="overflow-x-auto">{JSON.stringify(serverResult.errors, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
