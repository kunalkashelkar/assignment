"use server";

import {
  assignmentSubmissionSchema,
  type AssignmentSubmissionInput,
} from "@/schemas/assignment";
import type { ActionResult } from "@/types";

export async function submitAssignmentAction(
  rawData: unknown
): Promise<ActionResult<AssignmentSubmissionInput>> {
  // Validate payload through Zod schema
  const parseResult = assignmentSubmissionSchema.safeParse(rawData);

  if (!parseResult.success) {
    const flattenedErrors = parseResult.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Validation failed. Please verify the submitted fields.",
      errors: flattenedErrors,
    };
  }

  // Pure server execution: In a production app, persist to database or trigger pipeline
  const data = parseResult.data;

  return {
    success: true,
    message: `Assignment "${data.title}" successfully submitted and verified via End-to-End Server Action!`,
    data,
  };
}
