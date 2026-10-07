import type { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeInteractiveSandbox } from "@/components/theme-interactive-sandbox";
import {
  Server,
  MonitorSmartphone,
  ShieldCheck,
  Zap,
  Sparkles,
  AlertTriangle,
  Code2,
  FileCode,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hydration-Safe Theme Architecture | Next.js App Router",
  description:
    "Comprehensive analysis and live demonstration of next-themes integration, Server vs Client boundary segregation, and hydration mismatch prevention in Next.js App Router.",
};

// This page is a React Server Component (RSC).
// All architectural documentation, tables, and markup render strictly on the server.
// Only the ThemeInteractiveSandbox component mounts a client-side interaction island.
export default function ThemePage() {
  return (
    <div className="space-y-8 py-2">
      {/* Header section (Server Component) */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-card via-card to-background p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
          <Sparkles className="size-3.5" />
          <span>Hydration-Safe Theme Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Complete Theme Switching Architecture (Light • Dark • System)
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Technical analysis and implementation of the theme switching subsystem
          using <code className="text-foreground font-mono">next-themes</code>,
          App Router RootLayout configuration, and zero-flash DOM injection.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary">Light / Dark / System</Badge>
          <Badge variant="outline">Server Component Default</Badge>
          <Badge variant="outline">suppressHydrationWarning on &lt;html&gt;</Badge>
          <Badge variant="outline">Isolated Client Leaf Island</Badge>
        </div>
      </section>

      {/* Interactive Client Island */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
            <Zap className="size-4 text-primary" />
            Live Interactive Theme Switcher
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Switch between Light, Dark, and System modes below or via the dropdown
            in the top navigation bar.
          </p>
        </div>

        <ThemeInteractiveSandbox />
      </section>

      {/* Technical Analysis 1: Server vs Client Execution */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
          <Code2 className="size-4 text-primary" />
          Server vs. Client Execution Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                <Server className="size-4 text-primary" />
                What Executes on the Server
              </CardTitle>
              <CardDescription className="text-xs">
                Rendered statically or dynamically at request time in Node.js / Turbopack
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-muted-foreground space-y-2 leading-relaxed">
              <p>
                • <strong className="text-foreground">RootLayout (<code className="text-[11px]">app/layout.tsx</code>):</strong> Evaluates the initial HTML document shell, sets standard font classes, and wraps children with <code className="text-[11px]">ThemeProvider</code>.
              </p>
              <p>
                • <strong className="text-foreground">AppShell, Header, &amp; Footer:</strong> Entire layout structure, navigation labels, and architectural text are pre-rendered into static HTML without bundling client execution logic.
              </p>
              <p>
                • <strong className="text-foreground">Theme Documentation Page (<code className="text-[11px]">app/theme/page.tsx</code>):</strong> This entire analytical page is a pure Server Component. Its explanations, code references, and layout cards transmit zero component JavaScript.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                <MonitorSmartphone className="size-4 text-primary" />
                What Executes on the Client
              </CardTitle>
              <CardDescription className="text-xs">
                Hydrated in browser memory with client-side JavaScript execution
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-muted-foreground space-y-2 leading-relaxed">
              <p>
                • <strong className="text-foreground">Theme State Synchronization:</strong> Listening to the browser&apos;s OS preference media query (<code className="text-[11px]">prefers-color-scheme: dark</code>) and reading the saved user selection from <code className="text-[11px]">localStorage</code>.
              </p>
              <p>
                • <strong className="text-foreground">ThemeToggle Dropdown:</strong> Responding to user click events, updating <code className="text-[11px]">localStorage</code>, and toggling the active CSS class on the root <code className="text-[11px]">&lt;html&gt;</code> element.
              </p>
              <p>
                • <strong className="text-foreground">ThemeInteractiveSandbox:</strong> Dynamically displaying the live runtime theme context state.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technical Analysis 2: Why Theme Switcher Requires Client-Side JS */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
          <FileCode className="size-4 text-primary" />
          Why the Theme Switcher Requires Client-Side JavaScript
        </h2>

        <Card>
          <CardContent className="p-5 text-xs text-muted-foreground space-y-3 leading-relaxed">
            <p>
              Theme switching is inherently dependent on browser-only client state that does not exist on the web server during build time or standard HTTP rendering:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-foreground">
              <li>
                <strong>Client-Side Storage Access:</strong> The user&apos;s chosen theme preference is stored in <code className="font-mono text-primary text-[11px]">window.localStorage</code>. The server has no access to <code className="font-mono text-[11px]">localStorage</code> during HTTP page delivery.
              </li>
              <li>
                <strong>OS Media Query Listeners:</strong> In <code className="font-mono text-primary text-[11px]">system</code> mode, the application must monitor <code className="font-mono text-[11px]">window.matchMedia(&quot;(prefers-color-scheme: dark)&quot;)</code> and react instantaneously when the user switches their OS appearance.
              </li>
              <li>
                <strong>Dynamic DOM Mutation:</strong> Switching themes requires adding or removing the <code className="font-mono text-primary text-[11px]">dark</code> class on <code className="font-mono text-[11px]">document.documentElement</code> in real time without triggering a full page reload or network roundtrip.
              </li>
            </ol>
            <p>
              Consequently, declaring <code className="font-mono text-primary text-[11px]">&quot;use client&quot;</code> exclusively on the theme toggle component is architecturally required, while the rest of the application remains pure Server Components.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Technical Analysis 3: How Hydration Mismatch & Flash are Prevented */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
          <ShieldCheck className="size-4 text-primary" />
          Hydration Safety &amp; Flash of Incorrect Theme (FOIT) Prevention
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                <AlertTriangle className="size-4 text-amber-500" />
                Precise suppressHydrationWarning Placement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-muted-foreground space-y-2 leading-relaxed">
              <p>
                In standard React hydration, if an HTML attribute rendered by the server does not match the client DOM during hydration, React emits a console warning.
              </p>
              <p>
                Because <code className="text-foreground">next-themes</code> executes a micro-script in the document head to synchronously set <code className="text-foreground">class=&quot;dark&quot;</code> before React hydrates, the <code className="text-foreground">&lt;html&gt;</code> element class differs from the server template.
              </p>
              <p className="rounded border bg-muted/30 p-2 font-mono text-[11px] text-foreground">
                &lt;html lang=&quot;en&quot; suppressHydrationWarning&gt;
              </p>
              <p>
                By adding <code className="text-foreground font-mono">suppressHydrationWarning</code> <strong>only</strong> to the root <code className="text-foreground">&lt;html&gt;</code> tag (one level deep), React ignores mismatches on that single node without suppressing warnings in the rest of the application.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                <Zap className="size-4 text-emerald-500" />
                Preventing Flash of Incorrect Theme (FOIT)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-muted-foreground space-y-2 leading-relaxed">
              <p>
                If theme application waited for React to download, parse, and hydrate JavaScript, users with a dark theme preference would experience a blinding white flash.
              </p>
              <p>
                <code className="text-foreground">next-themes</code> solves this by injecting an inline script directly into the HTML stream before any CSS or body elements render:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-foreground">
                <li>Reads stored key from <code className="font-mono text-[11px]">localStorage</code>.</li>
                <li>Evaluates <code className="font-mono text-[11px]">matchMedia</code> for system mode.</li>
                <li>Immediately updates <code className="font-mono text-[11px]">document.documentElement.classList</code>.</li>
              </ul>
              <p>
                This ensures stylesheets evaluate with the correct color tokens on the first frame of paint.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
