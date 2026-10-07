# React Server Components (RSC) vs. Client Component Boundaries

## 1. Executive Overview
Next.js App Router utilizes a dual-tier component model consisting of React Server Components (RSC) and Client Components. This model segregates data fetching, templating, and static rendering from interactive client-side state handling and browser API access.

---

## 2. Server Component Default Paradigm
In the App Router (`app/` directory), all components default to React Server Components unless annotated with `"use client"`.

### What Runs on the Server
- **Root Layout (`app/layout.tsx`):** Renders the initial document structure (`<html>`, `<head>`, `<body>`), theme wrapper, and shell structure.
- **Structural Wrappers (`components/app-shell.tsx`, `components/header.tsx`, `components/footer.tsx`):** Static headers, landmark navigation wrappers, and footers render to static HTML chunks.
- **Route Handlers and Pages (`app/page.tsx`, `app/dashboard/page.tsx`, `app/architecture/page.tsx`, `app/cart/page.tsx`, `app/contact/page.tsx`, `app/theme/page.tsx`):** Content, documentation, and data-fetching views evaluate on the server.
- **Nested Server Panels (`components/server-telemetry-panel.tsx`):** Formats server runtime telemetry without emitting dependencies to the client.

### Bundle Implications
Server Component dependencies (e.g., date libraries, markdown parsers, Node file-system utilities) are stripped by Turbopack before delivering assets to the browser. Only the lightweight Virtual DOM structure (the RSC Payload) is sent over the wire.

---

## 3. Client Component Leaf Isolation
The directive `"use client"` does not declare that a component only executes on the client. It establishes a **serialization boundary** in the module graph.

### Where Client Boundaries Exist
1. `components/theme-toggle.tsx`: Accesses `localStorage` and toggles CSS classes on `document.documentElement`.
2. `components/theme-interactive-sandbox.tsx`: Reads `useTheme()` hook context in browser memory.
3. `components/mobile-nav-toggle.tsx`: Toggles mobile drawer state via Zustand store.
4. `components/sidebar.tsx`: Reads responsive drawer state from Zustand and listens to route pathname updates.
5. `components/interactive-telemetry-island.tsx`: Localized interactive filtering of serialized server props.
6. `components/cart/product-card.tsx`: Subscribes strictly to `addItem` action.
7. `components/cart/cart-items.tsx`: Subscribes to items array and mutation actions.
8. `components/cart/cart-summary.tsx`: Subscribes to derived totals.
9. `components/contact/contact-form.tsx`: Manages React Hook Form input state, client validation, and toast feedback.
10. `components/dashboard/dashboard-client-metrics.tsx`: Real-time reactive telemetry island.

---

## 4. Serialization Boundary & Prop Constraints
Data passed from a Server Component to a Client Component must be serializable across the network:
- **Allowed:** Strings, numbers, booleans, null, arrays, plain object literals (`{}`), Date objects, and Server Actions.
- **Forbidden:** Arbitrary JavaScript functions, class instances (e.g. `new DatabaseConnection()`), DOM elements, and server secrets (private keys, database credentials).

---

## 5. Hydration Optimization & Zero-FOIT
- `suppressHydrationWarning` is restricted solely to `<html lang="en">` in `app/layout.tsx` to accommodate `next-themes` head class injection.
- Components detecting client-side mounting use `React.useSyncExternalStore` rather than `useEffect(..., [setState])` to prevent cascading double-renders and layout shifts.
