import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(80, { message: "Full name must not exceed 80 characters." })
    .regex(/^[a-zA-Z\s.'-]+$/, {
      message: "Full name should only contain letters and standard punctuation.",
    }),

  email: z
    .string()
    .email({ message: "Please provide a valid email address." })
    .max(120, { message: "Email must not exceed 120 characters." }),

  phone: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits." })
    .max(20, { message: "Phone number must not exceed 20 characters." })
    .regex(/^[+0-9\s().-]+$/, {
      message: "Please enter a valid phone number (digits, +, hyphens, or spaces).",
    }),

  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." })
    .max(150, { message: "Subject must not exceed 150 characters." }),

  message: z
    .string()
    .min(15, { message: "Message must be at least 15 characters to provide sufficient context." })
    .max(1500, { message: "Message must not exceed 1500 characters." }),
});

// Infer canonical TypeScript type directly from schema (no duplication)
export type ContactFormData = z.infer<typeof contactFormSchema>;
