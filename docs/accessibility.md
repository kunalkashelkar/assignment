# Accessibility Architecture & Compliance Report

## 1. Compliance Standard
This application is engineered in conformance with the **W3C Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** and the **WAI-ARIA 1.2 Authoring Practices Guide**.

---

## 2. Headless Primitives & Radix UI
The interface primitives located in `components/ui/` are built on `@radix-ui/react-*`:
- **`Tabs` (`components/ui/tabs.tsx`):** Implements `role="tablist"`, `role="tab"`, and `role="tabpanel"`. Supports keyboard navigation (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
- **`DropdownMenu` (`components/ui/dropdown-menu.tsx`):** Implements `role="menu"` with focus trapping, `Escape` key dismissal, and arrow key traversal.
- **`Label` (`components/ui/label.tsx`):** Programmatically associated with form controls via `htmlFor`.
- **`Separator` (`components/ui/separator.tsx`):** Exposes `decorative={true}` to screen readers to prevent redundant announcements.

---

## 3. Semantic Landmarks & Skip Links
- Semantic HTML5 landmarks are used throughout: `<header>`, `<nav>`, `<aside>`, `<main>`, and `<footer>`.
- The main content area exposes an explicit skip target:
  ```tsx
  <main id="main-content" tabIndex={-1}>
  ```
- Headings follow a strict hierarchical structure (`h1` for page titles, `h2` for major sections, `h3` for card modules).

---

## 4. Keyboard Navigation & Focus Management
- Interactive elements feature visible focus rings via Tailwind utility classes:
  ```css
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
  ```
- Form controls link errors programmatically:
  - `aria-invalid={Boolean(errors[field])}`
  - `aria-describedby="{field}-error"`
- The mobile drawer button tracks `aria-expanded` and explicit `aria-label` states.
- During Server Action dispatches, the form declares `aria-busy={isPending}`.

---

## 5. Color Contrast & Theme Safety
- High-contrast color tokens in `app/globals.css` provide greater than 4.5:1 contrast ratios across both light and dark modes.
- Screen readers receive explicit text equivalents for icons via `<span className="sr-only">`.
