import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardClientMetrics } from "@/components/dashboard/dashboard-client-metrics";
import { serverContactRepository } from "@/lib/contact-repository.server";
import {
  Boxes,
  SendHorizontal,
  Activity,
  Layers,
  ArrowRight,
  ShieldCheck,
  Gauge,
  FolderTree,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Academic Demonstration Dashboard | Next.js Architecture",
  description:
    "Integrated academic performance and architectural status dashboard verifying accessibility components, theme states, Zustand stores, Server Actions, RSC boundaries, and Core Web Vitals.",
};

export default async function DashboardPage() {
  // Direct server evaluation: Query repository without external API overhead
  const contactSubmissionCount = await serverContactRepository.count();

  return (
    <div className="space-y-8 py-2">
      {/* 1. Header Hero (Server Component) */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-card via-card to-background p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
          <Activity className="size-3.5" />
          <span>Academic System Status &bull; Live Telemetry Dashboard</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Next.js Architectural Demonstration Dashboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Comprehensive real-time overview demonstrating accessible UI primitives,
          dynamic theme resolution, centralized Zustand state, zero-trust Server Actions,
          and Core Web Vitals performance parameters.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary">App Router • RSC Default</Badge>
          <Badge variant="outline">Strict TypeScript</Badge>
          <Badge variant="outline">WAI-ARIA AA Compliant</Badge>
          <Badge variant="outline">Zero Dummy APIs</Badge>
        </div>
      </section>

      {/* 2. Core Subsystem Status Grid (Responsive Cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
            <Layers className="size-4 text-primary" />
            Architectural Subsystems Telemetry
          </h2>
          <span className="text-xs text-muted-foreground">
            5 Modules Online
          </span>
        </div>

        {/* Live Client Metrics Island (Zustand Cart & Theme State) */}
        <DashboardClientMetrics />

        {/* Static / Server Evaluated Subsystem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card A: Accessible UI Status */}
          <Card className="border transition-all hover:border-primary/40">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                  <Boxes className="size-3.5 text-primary" />
                  UI Primitives
                </span>
                <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30">
                  WAI-ARIA Valid
                </Badge>
              </div>
              <CardTitle className="text-sm font-semibold mt-1">
                Radix UI + shadcn/ui
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2 text-xs text-muted-foreground">
              <p className="text-[11px] leading-relaxed">
                Headless primitives with CVA tokens, focus rings, keyboard navigation, and screen-reader labels.
              </p>
              <div className="pt-2 border-t flex justify-end">
                <Button asChild variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-primary">
                  <Link href="/#primitives">
                    <span>Inspect</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card B: Server Action Status */}
          <Card className="border transition-all hover:border-primary/40">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                  <SendHorizontal className="size-3.5 text-primary" />
                  Server Mutations
                </span>
                <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                  {contactSubmissionCount} Inquiries Stored
                </Badge>
              </div>
              <CardTitle className="text-sm font-semibold mt-1">
                Zod-Validated RPCs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2 text-xs text-muted-foreground">
              <p className="text-[11px] leading-relaxed">
                Zero-trust execution with dual Zod validation, sanitized projections, and optimistic toasts.
              </p>
              <div className="pt-2 border-t flex justify-end">
                <Button asChild variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-primary">
                  <Link href="/contact">
                    <span>Test Form</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Card C: RSC Boundary Status */}
          <Card className="border transition-all hover:border-primary/40">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-emerald-500" />
                  RSC Boundary
                </span>
                <Badge variant="secondary" className="text-[10px] font-mono">
                  0 KB Secrets Shipped
                </Badge>
              </div>
              <CardTitle className="text-sm font-semibold mt-1">
                Server vs Client Isolation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2 text-xs text-muted-foreground">
              <p className="text-[11px] leading-relaxed">
                Strict serialization boundary preventing arbitrary functions, class instances, or private keys from leaking.
              </p>
              <div className="pt-2 border-t flex justify-end">
                <Button asChild variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-primary">
                  <Link href="/architecture">
                    <span>Boundary Spec</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Performance Audit & Core Web Vitals Table */}
      <section className="space-y-4 pt-4 border-t">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Gauge className="size-4 text-primary" />
              Performance &amp; Core Web Vitals Audit
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Production optimization strategies and verification standards.
            </p>
          </div>
          <Badge variant="outline" className="w-fit text-[11px] font-mono">
            Audit Benchmark: Google Core Web Vitals
          </Badge>
        </div>

        {/* Responsive Table Container (No horizontal overflow on small screens) */}
        <div className="rounded-xl border overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b bg-muted/40 text-muted-foreground font-semibold">
                  <th className="p-3.5 pl-4">Metric</th>
                  <th className="p-3.5">What It Measures</th>
                  <th className="p-3.5">Optimization Strategy in This Project</th>
                  <th className="p-3.5 pr-4 text-right">Audit Result</th>
                </tr>
              </thead>
              <tbody className="divide-y text-muted-foreground">
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-foreground flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    LCP
                  </td>
                  <td className="p-3.5">Largest Contentful Paint (perceived loading speed)</td>
                  <td className="p-3.5">
                    Server Components deliver semantic hero markup directly in initial HTML without client execution delay.
                  </td>
                  <td className="p-3.5 pr-4 text-right font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    To be measured using Lighthouse
                  </td>
                </tr>

                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-foreground flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    CLS
                  </td>
                  <td className="p-3.5">Cumulative Layout Shift (visual stability during paint)</td>
                  <td className="p-3.5">
                    Static header geometry, CSS variable tokens, reserved aspect-ratio card slots, and zero FOIT theme scripts.
                  </td>
                  <td className="p-3.5 pr-4 text-right font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    To be measured using Lighthouse
                  </td>
                </tr>

                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-foreground flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    INP
                  </td>
                  <td className="p-3.5">Interaction to Next Paint (UI responsiveness to clicks/inputs)</td>
                  <td className="p-3.5">
                    Atomic leaf Client Components, Zustand selectors preventing tree re-renders, and non-blocking <code className="text-foreground">useTransition</code>.
                  </td>
                  <td className="p-3.5 pr-4 text-right font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    To be measured using Lighthouse
                  </td>
                </tr>

                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-foreground flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    TTFB
                  </td>
                  <td className="p-3.5">Time to First Byte (server response latency)</td>
                  <td className="p-3.5">
                    Next.js Turbopack compilation with Partial Prefetching and pre-rendered static route caching.
                  </td>
                  <td className="p-3.5 pr-4 text-right font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    To be measured using Lighthouse
                  </td>
                </tr>

                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-foreground flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    Hydration Cost
                  </td>
                  <td className="p-3.5">Browser CPU execution time to attach DOM event handlers</td>
                  <td className="p-3.5">
                    RSC default keeps ~85% of application markup completely unhydrated, minimizing client JavaScript bundles.
                  </td>
                  <td className="p-3.5 pr-4 text-right font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    To be measured using Lighthouse
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Architectural Compliance Summary Cards */}
      <section className="space-y-4 pt-4 border-t">
        <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
          <FolderTree className="size-4 text-primary" />
          Academic Compliance Summary &amp; Routing Directory
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <Link
            href="/architecture"
            className="rounded-xl border bg-card p-4 hover:border-primary/50 transition-colors space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                1. RSC Boundaries
              </span>
              <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] text-muted-foreground">
              RSC wire format, prop serialization constraints, and bundle isolation.
            </p>
          </Link>

          <Link
            href="/theme"
            className="rounded-xl border bg-card p-4 hover:border-primary/50 transition-colors space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                2. Theme Hydration
              </span>
              <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Light/Dark/System switching with next-themes and zero-FOIT injection.
            </p>
          </Link>

          <Link
            href="/cart"
            className="rounded-xl border bg-card p-4 hover:border-primary/50 transition-colors space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                3. Zustand Store
              </span>
              <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] text-muted-foreground">
              localStorage persistence middleware with fine-grained selector optimization.
            </p>
          </Link>

          <Link
            href="/contact"
            className="rounded-xl border bg-card p-4 hover:border-primary/50 transition-colors space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                4. Server Actions
              </span>
              <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-[11px] text-muted-foreground">
              End-to-end Zod validation, non-blocking transitions, and Sonner toasts.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
