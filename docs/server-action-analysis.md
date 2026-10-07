# Server Action & Type-Safe Mutation Analysis

## 1. Executive Overview
Next.js Server Actions establish an integrated, type-safe Remote Procedure Call (RPC) architecture. Rather than relying on separate REST controllers or external mock APIs, Server Actions permit client components to execute asynchronous mutations that run exclusively inside the server runtime.

---

## 2. End-to-End Type-Safe Data Flow

```
[ User Form Submission ]
         │
         ▼
[ Client Validation: React Hook Form + zodResolver ]
         │ (Catches invalid formats before network dispatch)
         ▼
[ Server Action Invocation: submitContactFormAction(data) ]
         │ (HTTP POST with Next.js Action RPC protocol)
         ▼
[ Server-Side Zod Validation: contactFormSchema.safeParse(rawPayload) ]
         │ (Zero-trust gatekeeper protecting backend integrity)
         ▼
[ Normalization & Sanitization ]
         │ (Trims whitespace, lowercases email)
         ▼
[ Mutation in Server Repository: serverContactRepository.save(data) ]
         │ (Stores record safely on the server)
         ▼
[ Strongly Typed Response Contract: ContactActionResult ]
         │ (Returns success, message, and sanitized projection)
         ▼
[ Client UI Feedback ]
         │ (Displays Sonner toast or maps errors back to fields)
```

---

## 3. The Dual Validation Principle
Validation must occur on both client and server:
- **Client Validation (UX):** React Hook Form validates with `@hookform/resolvers/zod` to provide instantaneous feedback and avoid unnecessary network requests.
- **Server Validation (Security):** The Server Action re-validates incoming payloads using `schema.safeParse()`. Because client validation can be bypassed (e.g. via curl, Postman, or script attacks), server validation serves as the authoritative security barrier.

---

## 4. Contract Typing & Secret Isolation
- Both client form inputs and server handlers infer types from a single canonical schema:
  ```ts
  export type ContactFormData = z.infer<typeof contactFormSchema>;
  ```
- The action returns a structured contract:
  ```ts
  export interface ContactActionResult {
    success: boolean;
    message: string;
    data?: { id: string; createdAt: string; fullName: string; subject: string };
    errors?: Record<string, string[]>;
  }
  ```
- Server environment variables and internal stack traces are never exposed to the client.
