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
  CheckCircle2,
  FileCheck,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Type-Safe Contact Form | React Hook Form & Zod",
  description:
    "Production type-safe form implementation using React Hook Form, zodResolver, accessible labels, autocomplete attributes, and schema-driven validation in Next.js App Router.",
};

export default function ContactPage() {
  return (
    <div className="space-y-8 py-2">
      {/* Header section (Server Component) */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-card via-card to-background p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
          <FileCheck className="size-3.5" />
          <span>Type-Safe Form Architecture &bull; Zod + React Hook Form</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Type-Safe Form Architecture &amp; Client Validation
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Demonstrating zero type duplication between schema definitions and TypeScript types
          using <code className="text-foreground font-mono">z.infer</code>, coupled with accessible
          ARIA error associations and instant validation feedback.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary">Canonical Zod Schema</Badge>
          <Badge variant="outline">z.infer&lt;typeof schema&gt;</Badge>
          <Badge variant="outline">@hookform/resolvers/zod</Badge>
          <Badge variant="outline">WAI-ARIA aria-describedby</Badge>
        </div>
      </section>

      {/* Main Form & Architecture Spec Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: The Interactive Form Island */}
        <div className="lg:col-span-2 space-y-4">
          <ContactForm />
        </div>

        {/* Right Column: Architectural Highlights */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="p-4 pb-2 border-b">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2 font-semibold">
                <ShieldCheck className="size-4 text-primary" />
                Zero Type Duplication
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs text-muted-foreground leading-relaxed">
              <p>
                In standard web applications, developers frequently define an interface in TypeScript and write separate manual validation checks in JavaScript.
              </p>
              <div className="rounded bg-muted/40 p-2.5 font-mono text-[11px] text-foreground space-y-1">
                <span className="text-primary font-bold">1 Source of Truth:</span>
                <p className="text-muted-foreground">const contactFormSchema = z.object(&#123; ... &#125;);</p>
                <p className="text-emerald-500 font-semibold">type ContactFormData = z.infer&lt;typeof contactFormSchema&gt;;</p>
              </div>
              <p>
                TypeScript types update automatically whenever validation constraints are modified in the schema.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2 border-b">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2 font-semibold">
                <CheckCircle2 className="size-4 text-emerald-500" />
                Accessibility &amp; UX Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2 text-xs text-muted-foreground">
              <ul className="list-disc pl-4 space-y-1.5 text-foreground text-[11px]">
                <li>
                  <strong>Associated Labels:</strong> Every input binds to a Radix/shadcn <code className="font-mono text-primary">&lt;Label htmlFor=&quot;...&quot;&gt;</code>.
                </li>
                <li>
                  <strong>Screen-Reader Links:</strong> Errors link via <code className="font-mono text-primary">aria-describedby</code> and <code className="font-mono text-primary">aria-invalid</code>.
                </li>
                <li>
                  <strong>Smart Autocomplete:</strong> Standard attributes (<code className="font-mono text-primary">name</code>, <code className="font-mono text-primary">email</code>, <code className="font-mono text-primary">tel</code>) accelerate user input.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
