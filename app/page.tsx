import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StateDemoCard } from "@/components/state-demo-card";
import { FormMutationDemo } from "@/components/form-mutation-demo";
import {
  Boxes,
  Database,
  SendHorizontal,
  CheckCircle2,
  FolderTree,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-10 py-2">
      {/* Hero section (Server Component) */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-card via-card to-background p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          <Layers className="size-3.5" />
          <span>Academic Assignment Architecture Specification</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground max-w-3xl">
          Responsive Accessible Component Architecture, Client State Management & End-to-End Type-Safe Form Mutations
        </h1>

        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
          A production-grade foundation built with Next.js App Router, React Server Components as the default, strict TypeScript compilation, Radix UI primitives, Zustand store, and Zod-validated Server Actions.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="sm">
            <a href="#primitives">
              Explore Primitives <ArrowRight className="size-3.5 ml-1" />
            </a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="#server-action">View Server Action Mutation</a>
          </Button>
        </div>

        {/* Feature quick badges */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/60">
          <div>
            <p className="text-xs text-muted-foreground">Framework</p>
            <p className="text-xs font-semibold mt-0.5">Next.js App Router</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Type Safety</p>
            <p className="text-xs font-semibold mt-0.5">Strict TypeScript</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Client State</p>
            <p className="text-xs font-semibold mt-0.5">Zustand Store</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Form Mutations</p>
            <p className="text-xs font-semibold mt-0.5">Zod + Server Action</p>
          </div>
        </div>
      </section>

      {/* Area 1: Accessible UI Primitives */}
      <section id="primitives" className="scroll-mt-20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                1
              </span>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                Accessible UI Primitives & Design Tokens
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Constructed using Radix UI headless primitives and Class Variance Authority (CVA) with WAI-ARIA compliance.
            </p>
          </div>
          <Badge variant="outline" className="w-fit text-xs font-mono">
            shadcn/ui + Radix UI
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Boxes className="size-4 text-primary" />
                Component Variants & Token Hierarchy
              </CardTitle>
              <CardDescription className="text-xs">
                Variants powered by CVA with full keyboard navigation and focus-visible rings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Button Primitive Variants:</p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Default</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="outline">Outline</Button>
                  <Button size="sm" variant="destructive">Destructive</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Badge Primitives:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default Badge</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Critical Error</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Cpu className="size-4 text-primary" />
                Radix WAI-ARIA Tabs Component
              </CardTitle>
              <CardDescription className="text-xs">
                Keyboard accessible (Left/Right arrows, Home/End) with proper aria-selected states.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="a11y" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="a11y" className="text-xs">Accessibility</TabsTrigger>
                  <TabsTrigger value="tokens" className="text-xs">Tokens</TabsTrigger>
                  <TabsTrigger value="rsc" className="text-xs">RSC Boundaries</TabsTrigger>
                </TabsList>
                <TabsContent value="a11y" className="pt-2 text-xs text-muted-foreground space-y-1.5">
                  <p className="text-foreground font-medium">Built-in Screen Reader Attributes</p>
                  <p>All interactive primitives pass automated audits, have explicit labels, keyboard focus styling, and aria attributes.</p>
                </TabsContent>
                <TabsContent value="tokens" className="pt-2 text-xs text-muted-foreground space-y-1.5">
                  <p className="text-foreground font-medium">Tailwind CSS Variable Mapping</p>
                  <p>Design tokens adapt fluidly across dark/light modes using standard HSL values mapped in globals.css.</p>
                </TabsContent>
                <TabsContent value="rsc" className="pt-2 text-xs text-muted-foreground space-y-1.5">
                  <p className="text-foreground font-medium">Server Components First</p>
                  <p>Presentational wrappers render entirely on the server. Interactive Radix roots isolate `"use client"` solely to the edge island.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Area 2: Zustand Client State */}
      <section id="zustand" className="scroll-mt-20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                2
              </span>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                Zustand Client State Management
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Predictable, decoupled client state slice handling UI layout, filters, and global interactions without prop-drilling.
            </p>
          </div>
          <Badge variant="outline" className="w-fit text-xs font-mono">
            stores/ui-store.ts
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="size-4 text-primary" />
              Reactive UI Store Playground
            </CardTitle>
            <CardDescription className="text-xs">
              Interact with the controls below to trigger instantaneous state updates across components.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StateDemoCard />
          </CardContent>
        </Card>
      </section>

      {/* Area 3: End-to-End Type-Safe Form Mutations */}
      <section id="server-action" className="scroll-mt-20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                3
              </span>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                End-to-End Type-Safe Form Mutations
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              React Hook Form with `@hookform/resolvers/zod` validating against a shared Zod schema, executing a zero-API-boilerplate Next.js Server Action.
            </p>
          </div>
          <Badge variant="outline" className="w-fit text-xs font-mono">
            actions/assignment-actions.ts
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <SendHorizontal className="size-4 text-primary" />
              Validated Submission Flow (No External Dummy APIs)
            </CardTitle>
            <CardDescription className="text-xs">
              Guarantees single source of truth validation on both client form feedback and server execution boundary.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormMutationDemo />
          </CardContent>
        </Card>
      </section>

      {/* Architectural Specifications Section */}
      <section id="typescript-spec" className="scroll-mt-20 pt-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
          <FolderTree className="size-4 text-primary" />
          Production Engineering Architecture & Compliance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-card p-4 space-y-2">
            <div className="flex items-center gap-2 font-medium text-xs text-foreground">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Strict TypeScript Config
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Configured with <code className="text-foreground">strict: true</code>, <code className="text-foreground">noUncheckedIndexedAccess: true</code>, and <code className="text-foreground">noImplicitOverride: true</code> for compile-time safety.
            </p>
          </div>

          <div id="rsc-boundary" className="rounded-lg border bg-card p-4 space-y-2">
            <div className="flex items-center gap-2 font-medium text-xs text-foreground">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Server Components as Default
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Root layouts, application shells, headers, footers, and page sections run on the server. <code className="text-foreground">&quot;use client&quot;</code> is strictly confined to interactive islands.
            </p>
          </div>

          <div id="folder-structure" className="rounded-lg border bg-card p-4 space-y-2">
            <div className="flex items-center gap-2 font-medium text-xs text-foreground">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Domain-Driven Folder Design
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Modular separation of concerns with <code className="text-foreground">actions/</code>, <code className="text-foreground">schemas/</code>, <code className="text-foreground">stores/</code>, <code className="text-foreground">types/</code>, and <code className="text-foreground">components/ui/</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
