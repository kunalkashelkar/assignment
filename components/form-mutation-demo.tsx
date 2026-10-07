"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  assignmentSubmissionSchema,
  type AssignmentSubmissionInput,
} from "@/schemas/assignment";
import { submitAssignmentAction } from "@/actions/assignment-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import type { ActionResult } from "@/types";

export function FormMutationDemo() {
  const [serverResult, setServerResult] = React.useState<
    ActionResult<AssignmentSubmissionInput> | null
  >(null);
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignmentSubmissionInput>({
    resolver: zodResolver(assignmentSubmissionSchema),
    defaultValues: {
      title: "Architecture & Type-Safe Mutations",
      studentEmail: "student@university.edu",
      moduleTrack: "form-mutations",
      codeQualityRating: 10,
      feedbackNotes: "Strict end-to-end validation with Zod and Next.js Server Actions.",
    },
  });

  const onSubmit = (values: AssignmentSubmissionInput) => {
    setServerResult(null);
    startTransition(async () => {
      const response = await submitAssignmentAction(values);
      setServerResult(response);
      if (response.success) {
        // keep form values or selectively reset
      }
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-xs">
            Assignment Project Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g. Accessible Component Architecture"
            {...register("title")}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="text-xs text-destructive">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="studentEmail" className="text-xs">
              Student University Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="studentEmail"
              type="email"
              placeholder="student@institution.edu"
              {...register("studentEmail")}
              aria-invalid={Boolean(errors.studentEmail)}
              aria-describedby={
                errors.studentEmail ? "email-error" : undefined
              }
            />
            {errors.studentEmail && (
              <p id="email-error" className="text-xs text-destructive">
                {errors.studentEmail.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="moduleTrack" className="text-xs">
              Assignment Focus Track <span className="text-destructive">*</span>
            </Label>
            <select
              id="moduleTrack"
              {...register("moduleTrack")}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="accessible-primitives" className="bg-card text-foreground">
                1. Accessible UI Primitives
              </option>
              <option value="client-state" className="bg-card text-foreground">
                2. Client State (Zustand)
              </option>
              <option value="form-mutations" className="bg-card text-foreground">
                3. End-to-End Server Action
              </option>
            </select>
            {errors.moduleTrack && (
              <p className="text-xs text-destructive">
                {errors.moduleTrack.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="codeQualityRating" className="text-xs">
            Architecture Self-Assessment Rating (1-10)
          </Label>
          <Input
            id="codeQualityRating"
            type="number"
            min={1}
            max={10}
            {...register("codeQualityRating", { valueAsNumber: true })}
          />
          {errors.codeQualityRating && (
            <p className="text-xs text-destructive">
              {errors.codeQualityRating.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="feedbackNotes" className="text-xs">
            Implementation Summary Notes
          </Label>
          <textarea
            id="feedbackNotes"
            rows={2}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Notes regarding schema validation and mutation flow..."
            {...register("feedbackNotes")}
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Button type="submit" disabled={isPending} className="text-xs">
            {isPending ? (
              <>
                <Loader2 className="size-3.5 animate-spin mr-1.5" />
                Executing Server Action...
              </>
            ) : (
              <>
                <Send className="size-3.5 mr-1.5" />
                Dispatch Server Action Mutation
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              reset();
              setServerResult(null);
            }}
            className="text-xs"
          >
            Reset Form
          </Button>
        </div>
      </form>

      {serverResult && (
        <div
          className={`rounded-lg border p-3.5 text-xs ${
            serverResult.success
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            {serverResult.success ? (
              <CheckCircle2 className="size-4 text-emerald-400" />
            ) : (
              <AlertCircle className="size-4 text-destructive" />
            )}
            <span>
              {serverResult.success
                ? "Server Action Execution Verified!"
                : "Server Action Validation Rejection"}
            </span>
            <Badge
              variant={serverResult.success ? "secondary" : "destructive"}
              className="ml-auto text-[10px]"
            >
              {serverResult.success ? "HTTP Status: OK" : "Invalid Payload"}
            </Badge>
          </div>
          <p className="mt-1 text-[11px] opacity-90">{serverResult.message}</p>
          {serverResult.data && (
            <pre className="mt-2 text-[10px] bg-background/50 p-2 rounded border font-mono overflow-x-auto">
              {JSON.stringify(serverResult.data, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
