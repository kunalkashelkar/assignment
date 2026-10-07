# Server Actions & Secure Form Mutations

## 1. Executive Summary

Next.js Server Actions establish an integrated, type-safe Remote Procedure Call (RPC) architecture. Rather than designing ad-hoc REST controllers or API endpoints (`/api/contact`), Server Actions allow client components to invoke asynchronous functions that execute strictly within the server runtime.

This document details the mutation pipeline implemented in `actions/contact-actions.ts`, explaining the dual-validation paradigm, security protections, and server repository abstraction.

---

## 2. End-to-End Architectural Pipeline

```
[ User Interaction ]
         │
         ▼
[ Client Validation: React Hook Form + zodResolver ]
         │ (Intercepts malformed input before network trip)
         ▼
[ Next.js Server Action Invocation: submitContactFormAction ]
         │ (HTTP POST with Next.js Action RPC protocol)
         ▼
[ Server-Side Zod Validation: contactFormSchema.safeParse ]
         │ (Guarantees zero-trust security boundary)
         ▼
[ Data Sanitization & Normalization ]
         │ (Trims whitespace, lowercases emails)
         ▼
[ Server Repository Mutation: serverContactRepository.save ]
         │ (Saves to server-only data store)
         ▼
[ Strongly Typed Response Contract: ContactActionResult ]
         │ (Returns status, message, and sanitized projection)
         ▼
[ UI Feedback & Re-render ]
         │ (Displays success banner or maps errors back to fields)
```

---

## 3. Why Validation Must Be Performed Twice

A central security and architectural question in full-stack engineering is:
> *If the client already validates the form with Zod, why must the Server Action re-validate with Zod?*

The two validation stages serve entirely different purposes:

| Criteria | Client Validation (React Hook Form) | Server Validation (Server Action) |
| :--- | :--- | :--- |
| **Primary Purpose** | **User Experience (UX):** Instant interactive feedback, reducing latency and unnecessary network requests. | **System Security & Integrity:** Absolute enforcement of domain constraints and data protection. |
| **Execution Context** | Client browser JavaScript engine. | Server environment (Node.js runtime). |
| **Bypass Vulnerability** | **Extremely High:** Can be bypassed via curl, Postman, custom HTTP scripts, or by disabling JavaScript in the browser. | **Zero:** Direct gatekeeper to the database; cannot be skipped by an external actor. |
| **Trust Model** | Untrusted environment. | Trusted environment. |
| **Sanitization Role** | Alerts user of format errors. | Strips dangerous payload fields and normalizes inputs. |

### The Golden Rule of Full-Stack Mutations
> **Client-side validation is a UX feature, NEVER a security barrier.**
> The server must treat every incoming payload as potentially malicious, requiring exhaustive re-validation via `schema.safeParse()`.

---

## 4. Security Considerations & Protections

1. **Zero Secret Leakage:**
   - Server-side database keys, tokens, and internal errors are never included in the action's return object.
2. **Sanitized Projections:**
   - Instead of echoing raw objects, the Server Action returns an explicit projection (`id`, `createdAt`, `fullName`, `subject`).
3. **No Sensitive PII Logging:**
   - User phone numbers and message bodies are excluded from console logging to maintain privacy compliance (GDPR/FERPA).
4. **Strongly Typed Action Contracts:**
   - The action returns `ContactActionResult`:
     ```ts
     export interface ContactActionResult {
       success: boolean;
       message: string;
       data?: { id: string; createdAt: string; fullName: string; subject: string };
       errors?: Record<string, string[]>;
     }
     ```
   - If server validation fails, field errors are mapped back to React Hook Form inputs via `setError(field, { message })`.

---

## 5. Server-Side Repository Abstraction

To simulate persistent storage without third-party dependencies, a server repository was established in `lib/contact-repository.server.ts`:
- Encapsulates mutations within an isolated in-memory singleton.
- Prevents coupling the Server Action to a specific database provider.
- In production, this repository interface is swapped with Prisma, Drizzle, or raw SQL queries without modifying the Server Action or Client Component contracts.
