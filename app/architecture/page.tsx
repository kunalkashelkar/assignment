import type { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServerTelemetryPanel } from "@/components/server-telemetry-panel";
import {
  InteractiveTelemetryIsland,
  type SerializedAuditTelemetry,
} from "@/components/interactive-telemetry-island";
import {
  Layers,
  Server,
  MonitorSmartphone,
  ShieldAlert,
  ArrowDown,
  Lock,
  Code2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "RSC vs Client Component Architecture | Next.js App Router",
  description:
    "Technical demonstration and architectural breakdown of React Server Components, Client Component boundaries, prop serialization, and bundle isolation.",
};

/**
 * ============================================================================
 * HYDRATION BOUNDARY DEMONSTRATION: ROOT SERVER COMPONENT
 * ============================================================================
 * This entire page (ArchitecturePage) executes exclusively on the server.
 *
 * 1. It gathers data (e.g. from server environment, databases, or file system).
 * 2. It holds server-only secrets that MUST NEVER cross the boundary.
 * 3. It creates plain serializable objects for Client Component leaves.
 * 4. It renders nested Server Components (ServerTelemetryPanel).
 * 5. It nests an isolated Client Component (InteractiveTelemetryIsland).
 */

// Simulated server-only secret and class instance (CANNOT cross the boundary)
const SERVER_ONLY_SECRET_DATABASE_KEY = "db_sk_live_9941a87b32c";

class ServerDatabaseConnection {
  constructor(public readonly host: string, private readonly secretToken: string) {}
  public executeQuery(query: string): string {
    return `Executed ${query} with token ${this.secretToken.slice(0, 4)}***`;
  }
}

async function getServerTelemetryData() {
  "use cache";
  return {
    serverTime: new Date().toISOString(),
  };
}

export default async function ArchitecturePage() {
  // Server-side evaluation within RSC
  const { serverTime } = await getServerTelemetryData();
  const nodeVersion = process.version;
  const dbConnection = new ServerDatabaseConnection(
    "postgres://primary-cluster.internal:5432",
    SERVER_ONLY_SECRET_DATABASE_KEY
  );

  // This internal execution happens safely on the server:
  const querySummary = dbConnection.executeQuery("SELECT count(*) FROM modules");

  // SERIALIZATION TRANSFORMATION:
  // We explicitly sanitize and project ONLY plain serializable data to cross
  // the RSC serialization boundary into the Client Component:
  const serializablePayload: SerializedAuditTelemetry = {
    serverTimestamp: serverTime,
    environment: "production-edge",
    nodeVersion,
    totalServerRecords: 42,
    activeModules: ["accessibility", "state-management", "form-mutations"],
  };

  return (
    <div className="space-y-10 py-2">
      {/* Hero / Header Section (Server Component) */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-card via-card to-background p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
          <Layers className="size-3.5" />
          <span>React Server Components &bull; Architectural Boundary</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          RSC vs. Client Components: Execution Trees &amp; Serialization
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Demonstrating how <code className="text-foreground font-mono">&quot;use client&quot;</code>{" "}
          creates an explicit boundary rather than making the whole application client-side,
          and how server state is serialized across the network boundary.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary">RSC by Default</Badge>
          <Badge variant="outline">Strict Serialization Boundary</Badge>
          <Badge variant="outline">Zero Secret Leakage</Badge>
          <Badge variant="outline">Isolated Client Leaf Hydration</Badge>
        </div>
      </section>

      {/* Visual Component Tree Architecture Diagram */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
            <Layers className="size-4 text-primary" />
            Component Tree Architecture &amp; Boundary Visualization
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Rendered using semantic HTML/CSS to show exact execution contexts.
          </p>
        </div>

        <div className="rounded-xl border bg-card/60 p-4 sm:p-6 space-y-4 font-mono text-xs">
          {/* Tree Root */}
          <div className="rounded-lg border-2 border-emerald-500/50 bg-emerald-500/10 p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 flex items-center gap-2">
                <Server className="size-4" /> Root Page: ArchitecturePage (React Server Component)
              </span>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
                Executes in Node / Turbopack • 0 KB Client Bundle
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground font-sans">
              Accesses environment variables, internal system metrics, and server-only class instances.
            </p>
          </div>

          <div className="flex justify-center text-muted-foreground">
            <ArrowDown className="size-5" />
          </div>

          {/* Children Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Server Branch */}
            <div className="rounded-lg border-2 border-dashed border-emerald-500/40 bg-emerald-500/5 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Server className="size-3.5" /> Nested Server Component
                </span>
                <span className="text-[10px] text-muted-foreground">Server Only</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans">
                <strong>ServerTelemetryPanel:</strong> Renders directly to static virtual DOM chunks.
                Contains no event handlers. Dependencies never download to the browser.
              </p>
            </div>

            {/* Boundary Crossing to Client Branch */}
            <div className="rounded-lg border-2 border-primary/60 bg-primary/10 p-3.5 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-primary flex items-center gap-1.5">
                  <MonitorSmartphone className="size-3.5" /> Client Boundary: &quot;use client&quot;
                </span>
                <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] text-primary">
                  Hydrated Leaf
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans">
                <strong>InteractiveTelemetryIsland:</strong> Ingests serialized JSON props.
                React attaches event handlers in the browser for local interactive filtering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demonstrations: Nested RSC + Client Leaf */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
          <Code2 className="size-4 text-primary" />
          Live Executed Component Showcase
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nested Server Component */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground px-1">
              <span>1. Nested Server Component (RSC)</span>
              <Badge variant="outline" className="text-[10px]">Zero Hydration</Badge>
            </div>
            <ServerTelemetryPanel
              serverTimestamp={serverTime}
              serverNodeVersion={nodeVersion}
              moduleCount={serializablePayload.activeModules.length}
            />
          </div>

          {/* Interactive Client Leaf with Serialized Props */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground px-1">
              <span>2. Interactive Client Component (Leaf Island)</span>
              <Badge variant="default" className="text-[10px]">Client Hydrated</Badge>
            </div>
            {/*
              HYDRATION BOUNDARY CROSSING:
              We pass ONLY serializablePayload (strings, numbers, arrays).
              Never passing dbConnection or raw functions!
            */}
            <InteractiveTelemetryIsland initialTelemetry={serializablePayload} />
          </div>
        </div>
      </section>

      {/* Boundary Violation Analysis: What CANNOT Cross the Boundary */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="size-5 text-destructive" />
          <h2 className="text-lg font-bold tracking-tight">
            Serialization Security: What CANNOT Safely Cross the RSC Boundary
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold text-destructive flex items-center gap-2">
                <Code2 className="size-4" /> 1. Arbitrary Functions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-1.5 text-muted-foreground">
              <p>
                Standard JavaScript functions and closures cannot be serialized across the network to the client.
              </p>
              <div className="rounded bg-background/60 p-2 font-mono text-[11px] text-destructive">
                &lt;ClientIsland onClick=&#123;() =&gt; ...&#125; /&gt; ❌ Error
              </div>
              <p className="text-[11px]">
                <strong>Exception:</strong> Server Actions declared with <code className="text-foreground font-mono">&quot;use server&quot;</code> cross as secure remote procedure call references.
              </p>
            </CardContent>
          </Card>

          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold text-destructive flex items-center gap-2">
                <Layers className="size-4" /> 2. Class Instances
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-1.5 text-muted-foreground">
              <p>
                Complex prototypes and class instances (such as database connection pools or socket handles) lose prototype methods when serialized.
              </p>
              <div className="rounded bg-background/60 p-2 font-mono text-[11px] text-destructive">
                &lt;ClientIsland conn=&#123;dbConnection&#125; /&gt; ❌ Error
              </div>
              <p className="text-[11px]">
                Prototypes cannot safely reconstruct in browser memory; only plain objects are allowed.
              </p>
            </CardContent>
          </Card>

          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold text-destructive flex items-center gap-2">
                <Lock className="size-4" /> 3. Server Secrets
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-1.5 text-muted-foreground">
              <p>
                Private database API keys, JWT signing keys, and server environment tokens must never be passed as props.
              </p>
              <div className="rounded bg-background/60 p-2 font-mono text-[11px] text-destructive">
                &lt;ClientIsland apiKey=&#123;SECRET_KEY&#125; /&gt; ❌ Leak
              </div>
              <p className="text-[11px]">
                Passing secrets to Client Components embeds them into public client browser scripts.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Server Query Safe Demonstration */}
        <Card className="border bg-card/60">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Lock className="size-3.5 text-emerald-500" />
              Verified Server-Side Isolation Guarantee
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1 text-xs text-muted-foreground space-y-2">
            <p>
              In this page, <code className="text-foreground font-mono">SERVER_ONLY_SECRET_DATABASE_KEY</code> was used by the internal class instance to generate:
            </p>
            <div className="rounded bg-muted/40 p-2.5 font-mono text-[11px] text-foreground">
              Internal Server Execution: {querySummary}
            </div>
            <p className="text-[11px]">
              The secret itself never entered <code className="text-foreground font-mono">serializablePayload</code>, verifying zero leakage across the network boundary into the client browser.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
