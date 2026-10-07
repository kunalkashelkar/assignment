"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RotateCcw, Filter, CheckCircle2 } from "lucide-react";

/**
 * ============================================================================
 * HYDRATION BOUNDARY: Client Component Leaf
 * ============================================================================
 * This component is imported into the Server Component tree.
 * The directive "use client" marks THIS file and its sub-tree as an island
 * of interactivity that will be hydrated by React in the browser.
 *
 * It receives ONLY plain, JSON-serializable props from its parent Server Component.
 */
export interface SerializedAuditTelemetry {
  readonly serverTimestamp: string;
  readonly environment: string;
  readonly nodeVersion: string;
  readonly totalServerRecords: number;
  readonly activeModules: readonly string[];
}

interface TelemetryFilterProps {
  // Serializable props crossed over the RSC Boundary
  initialTelemetry: SerializedAuditTelemetry;
}

export function InteractiveTelemetryIsland({
  initialTelemetry,
}: TelemetryFilterProps) {
  // Client-side interactive state isolated within this leaf
  const [selectedTag, setSelectedTag] = React.useState<string>("all");
  const [clientInteractionCount, setClientInteractionCount] = React.useState<number>(0);

  const filterOptions = ["all", ...initialTelemetry.activeModules];

  const handleSelect = (tag: string) => {
    setSelectedTag(tag);
    setClientInteractionCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setSelectedTag("all");
    setClientInteractionCount(0);
  };

  return (
    <div className="space-y-4 rounded-xl border border-primary/30 bg-primary/5 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Client Interactive Leaf Island (&quot;use client&quot;)
          </span>
        </div>
        <Badge variant="outline" className="text-[10px] font-mono w-fit">
          Boundary: Serialized Props Ingested
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        This island received serializable data computed on the server (timestamp:{" "}
        <code className="text-foreground font-mono">{initialTelemetry.serverTimestamp}</code>).
        Client-side state below handles real-time filtering without requiring any parent Server Component re-renders.
      </p>

      {/* Filter controls */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Filter className="size-3.5" />
          <span>Filter Active Modules:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => handleSelect(tag)}
              className="text-xs h-7 px-2.5 capitalize"
            >
              {tag}
            </Button>
          ))}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
            title="Reset client state"
          >
            <RotateCcw className="size-3 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Reactive Client Output */}
      <div className="rounded-lg border bg-background/80 p-3 text-xs font-mono space-y-2">
        <div className="flex items-center justify-between text-muted-foreground text-[11px]">
          <span className="flex items-center gap-1.5 text-primary font-medium">
            <Sparkles className="size-3" />
            Client State Snapshot:
          </span>
          <span>Interactions: {clientInteractionCount}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div className="rounded bg-muted/50 p-2">
            <span className="text-muted-foreground">Active Filter: </span>
            <span className="text-foreground font-semibold uppercase">{selectedTag}</span>
          </div>
          <div className="rounded bg-muted/50 p-2">
            <span className="text-muted-foreground">Server Record Count: </span>
            <span className="text-foreground font-semibold">{initialTelemetry.totalServerRecords}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-sans mt-1">
          <CheckCircle2 className="size-3 shrink-0" />
          <span>Only this component re-rendered upon clicking. Parent RSC remained untouched.</span>
        </div>
      </div>
    </div>
  );
}
