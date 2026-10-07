import { Suspense } from "react";
import type { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/contact/contact-form";
import {
  FileCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Async Mutation UX & Server Actions | Next.js App Router",
  description:
    "Production-grade async mutation UX demonstrating React Suspense, loading UI, optimistic in-flight feedback, Sonner toast notifications, and server error handling.",
};

function FormLoadingFallback() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4 animate-pulse" aria-busy="true">
      <div className="h-5 w-44 rounded bg-muted" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-10 rounded-md bg-muted" />
        <div className="h-10 rounded-md bg-muted" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-10 rounded-md bg-muted" />
        <div className="h-10 rounded-md bg-muted" />
      </div>
      <div className="h-28 rounded-md bg-muted" />
      <div className="h-9 w-36 rounded-md bg-muted" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="space-y-8 py-2">
      {/* Header section (Server Component) */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-card via-card to-background p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
          <FileCheck className="size-3.5" />
          <span>Async Mutation UX &bull; Suspense + Optimistic Patterns</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Async Mutation UX &amp; End-to-End Type Safety
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Demonstrating non-blocking transitions via <code className="text-foreground font-mono">useTransition()</code>,
          instant in-flight feedback, Sonner toast notifications, duplicate submission blocking,
          and safe server validation rollbacks.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary">React Suspense</Badge>
          <Badge variant="outline">Optimistic In-Flight</Badge>
          <Badge variant="outline">Sonner Toasts</Badge>
          <Badge variant="outline">Zero False Positives</Badge>
        </div>
      </section>

      {/* Main Form & Architecture Spec Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: The Interactive Form Island wrapped in Suspense */}
        <div className="lg:col-span-2 space-y-4">
          <Suspense fallback={<FormLoadingFallback />}>
            <ContactForm />
          </Suspense>
        </div>

        {/* Right Column: Architectural Highlights */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="p-4 pb-2 border-b">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2 font-semibold">
                <Sparkles className="size-4 text-primary" />
                Optimistic UX Without Falsehoods
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5 text-xs text-muted-foreground leading-relaxed">
              <p>
                Naive optimistic UI marks operations as &ldquo;complete&rdquo; before the server responds. For critical forms, this creates high user confusion if the network or validation fails.
              </p>
              <div className="rounded border bg-muted/40 p-2.5 text-[11px] text-foreground space-y-1 font-mono">
                <p className="text-primary font-bold">Safe Pattern:</p>
                <p>1. In-flight optimistic banner renders.</p>
                <p>2. Button disables; spinner activates.</p>
                <p>3. Toast changes: Loading &rarr; Success.</p>
                <p className="text-emerald-500 font-semibold">4. Success confirmed ONLY after 200 OK.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2 border-b">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2 font-semibold">
                <ShieldCheck className="size-4 text-emerald-500" />
                Duplicate Submission Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-xs text-muted-foreground">
              <p>
                Inputs and action buttons are locked while <code className="text-foreground font-mono">isPending</code> is true.
              </p>
              <ul className="list-disc pl-4 space-y-1 text-foreground text-[11px]">
                <li>Prevents repeated network dispatches.</li>
                <li>Announces loading state via <code className="font-mono text-primary">aria-busy</code>.</li>
                <li>Preserves draft inputs if the server returns validation errors.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
