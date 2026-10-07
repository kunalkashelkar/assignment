import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, HardDrive, Cpu, Terminal } from "lucide-react";

/**
 * ============================================================================
 * SERVER COMPONENT LEAF: Nested Server Component
 * ============================================================================
 * This component runs exclusively on the server (Node.js/Turbopack runtime).
 * It never ships to the browser bundle. It accesses server runtime metrics,
 * formats them, and renders pure semantic HTML.
 */
interface ServerTelemetryPanelProps {
  serverTimestamp: string;
  serverNodeVersion: string;
  moduleCount: number;
}

export function ServerTelemetryPanel({
  serverTimestamp,
  serverNodeVersion,
  moduleCount,
}: ServerTelemetryPanelProps) {
  return (
    <Card className="border bg-card/60 backdrop-blur">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md bg-primary/10 text-primary">
              <Server className="size-4" />
            </div>
            <CardTitle className="text-sm font-semibold">
              Nested Server Component: Runtime Engine Inspector
            </CardTitle>
          </div>
          <Badge variant="secondary" className="text-[10px] font-mono">
            Pure RSC • Zero Client JS
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3 text-xs">
        <p className="text-muted-foreground leading-relaxed">
          This panel is a nested Server Component rendered alongside sibling components.
          Its code, imports, and execution dependencies are completely removed from the client bundle.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-[11px]">
          <div className="rounded-lg border bg-muted/30 p-2.5 space-y-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <Terminal className="size-3 text-primary" /> Node Runtime
            </span>
            <p className="font-semibold text-foreground">{serverNodeVersion}</p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-2.5 space-y-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <Cpu className="size-3 text-primary" /> Server Timestamp
            </span>
            <p className="font-semibold text-foreground truncate" title={serverTimestamp}>
              {serverTimestamp}
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-2.5 space-y-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <HardDrive className="size-3 text-primary" /> Verified Modules
            </span>
            <p className="font-semibold text-foreground">{moduleCount} Modules Active</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
