# React Server Components (RSC) vs. Client Component Boundaries

## 1. Executive Overview

Next.js App Router utilizes a dual-tier component architecture comprising **React Server Components (RSC)** and **Client Components**. This architectural paradigm separates the execution lifecycle of data fetching, templating, and static content generation from client-side interactivity, state handling, and browser API integration.

---

## 2. React Server Component (RSC) Rendering Lifecycle

### Execution Runtime
By default, all components located inside the `app/` directory are React Server Components. They execute exclusively on the server (Node.js runtime or edge worker) during:
1. **Compilation/Build Time:** Generating static HTML and pre-computed RSC payloads for cacheable routes (`Route (app): ○ (Static)`).
2. **On-Demand Request Time:** Executing dynamically per HTTP request when reading search parameters, cookies, or database states.

### Wire Format (RSC Payload)
RSC does not render directly into traditional client JavaScript ASTs. Instead, React serializes the component hierarchy into a streamable binary/JSON wire protocol known as the **RSC Payload**. This format contains:
- The rendered virtual DOM tree representation.
- Placeholder references for Client Component islands.
- Serialized props passed from Server Components into Client Components.
- Pointers to client JavaScript bundle chunks required to hydrate the client leaves.

RSC code and dependencies (e.g., Markdown parsers, Node filesystem libraries, SQL query builders) are **never emitted into the client JavaScript bundle**.

---

## 3. Client Components and the `"use client"` Boundary

### What `"use client"` Actually Means
A widespread architectural misconception is that `"use client"` forces the entire file and its ancestors to render solely in the browser. In reality:
- `"use client"` defines a **module boundary** in the import tree.
- It instructs the bundler (Turbopack/Webpack) to carve out the imported module and its dependencies into a client JavaScript chunk.
- Client Components **still execute on the server during the initial render** to emit initial HTML markup for Fast First Paint (SSR).
- Subsequently, React hydrates the HTML markup in the browser, attaching DOM listeners and initializing local React state (`useState`, `useEffect`, `useRef`).

### The Golden Architecture Rule
> **Keep Client Component boundaries as deep and small as possible in the component tree.**
> Wrapping top-level layouts in `"use client"` converts all nested children into client modules, destroying the benefits of RSC.

---

## 4. Serialization Boundary & Prop Constraints

When passing data from a Server Component to a Client Component, that data must traverse the network serialized as part of the RSC payload.

### Permitted Data Types (Serializable)
- Primitive values: `string`, `number`, `boolean`, `null`, `undefined`
- Plain Objects (plain object literals `{}`)
- Arrays containing serializable elements
- `BigInt`, `Uint8Array`, `Date` (converted across standard protocol boundaries)
- Promises (for React Suspense streaming)
- Server Actions (functions annotated with `"use server"`, serialized as secure remote procedure call references)

### Forbidden Data Types (Non-Serializable)
| Data Type | Reason for Failure | Recommended Remedy |
| :--- | :--- | :--- |
| **Arbitrary Functions** | Closures and execution contexts cannot be transmitted across HTTP boundaries. | Move function inside Client Component or convert to a Server Action. |
| **Class Instances** | Class prototypes and instance methods (`new MyService()`) are stripped during serialization. | Project instance state into a plain Data Transfer Object (DTO). |
| **Event Listeners** | `onClick`, `onChange` handlers cannot originate in Server Components. | Define handlers directly within the Client Component. |
| **Server Secrets** | Private API keys, JWT secrets, database connection tokens. | Never pass to Client Components; consume strictly within RSC or Server Actions. |

---

## 5. JavaScript Bundle Implications

Consider the following architectural comparison:

```
Scenario A: Traditional SPA / Client Component Root
┌────────────────────────────────────────────────────────┐
│ App (Client Component)                                 │
│ ├── Date-fns / Luxon (35 KB)                            │
│ ├── Markdown parser (50 KB)                            │
│ ├── Icons Library (40 KB)                              │
│ └── UI Markup (10 KB)                                  │
│ TOTAL CLIENT BUNDLE = 135 KB                           │
└────────────────────────────────────────────────────────┘

Scenario B: Server Component Default (This Project)
┌────────────────────────────────────────────────────────┐
│ App (React Server Component - 0 KB Client Bundle)       │
│ ├── Date-fns executed on server (0 KB shipped)         │
│ ├── Markdown parsed on server (0 KB shipped)           │
│ └── Leaf Client Island ("use client") (3 KB shipped)   │
│ TOTAL CLIENT BUNDLE = 3 KB                             │
└────────────────────────────────────────────────────────┘
```

By keeping layout scaffolding, analytical cards, headers, and documentation pages as Server Components, client bundles are reduced by **80% to 95%**, directly improving Interaction to Next Paint (INP) and Time to Interactive (TTI).

---

## 6. Hydration Mismatches & Risk Mitigation

A hydration mismatch occurs when the HTML generated on the server diverges from the initial DOM tree created during client reconciliation.

### Primary Causes & Solutions in this Project
1. **Dynamic Theme Classes:**
   - *Problem:* Server cannot predict user's local `localStorage` theme preference.
   - *Remedy:* Added `suppressHydrationWarning` strictly to `<html lang="en">` in `app/layout.tsx`.
2. **Date / Timestamp Formatting:**
   - *Problem:* Formatted strings generated via `new Date().toLocaleString()` can differ between the server's UTC timezone and the client's local timezone.
   - *Remedy:* Convert dates to standardized ISO strings on the server (`toISOString()`) and pass them as serializable props.
3. **Mounting Timing:**
   - *Problem:* Modifying DOM elements immediately in `useEffect` can cause cascading renders.
   - *Remedy:* Use `useSyncExternalStore` for synchronous mounting detection.

---

## 7. Systematic Architecture Checklist

1. **Default to RSC:** Never add `"use client"` unless the file needs browser APIs (`window`, `localStorage`), event handlers (`onClick`, `onSubmit`), or React hooks (`useState`, `useReducer`, `useEffect`).
2. **Pass DTOs Across Boundaries:** Ensure all props sent to Client Components are plain JSON-compatible objects.
3. **Protect Secrets:** Never import private environment variables (`process.env.DB_PASSWORD`) into client-reachable modules.
4. **Isolate Interactivity:** Push `"use client"` to the leaf components (buttons, search inputs, modal triggers) while keeping containers as Server Components.
