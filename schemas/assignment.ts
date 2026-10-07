import { z } from "zod";

export const assignmentSubmissionSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  studentEmail: z
    .string()
    .email({ message: "Please provide a valid university or contact email" }),
  moduleTrack: z.enum(
    ["accessible-primitives", "client-state", "form-mutations"] as const,
    {
      message: "Please select an assignment module",
    }
  ),
  codeQualityRating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(10, { message: "Rating cannot exceed 10" }),
  feedbackNotes: z
    .string()
    .max(500, { message: "Feedback must not exceed 500 characters" })
    .optional(),
});

export type AssignmentSubmissionInput = z.infer<
  typeof assignmentSubmissionSchema
>;
