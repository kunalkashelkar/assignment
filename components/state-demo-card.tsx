"use client";

import { useUiStore } from "@/stores/ui-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sparkles, SlidersHorizontal, Search } from "lucide-react";

export function StateDemoCard() {
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    sidebarOpen,
    toggleSidebar,
  } = useUiStore();

  const filters = ["all", "primitives", "state", "forms"] as const;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Active Filter Store:
          </span>
          <Badge variant="secondary" className="font-mono text-xs capitalize">
            {activeFilter}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Sidebar synced:</span>
          <Badge
            variant={sidebarOpen ? "default" : "outline"}
            className="text-[10px] cursor-pointer"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? "Open (click to toggle)" : "Closed (click to toggle)"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            size="sm"
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => setActiveFilter(filter)}
            className="capitalize text-xs h-8"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Type to test live reactive Zustand store state..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 text-xs"
        />
      </div>

      <div className="rounded-lg border bg-muted/30 p-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-primary font-medium mb-1">
          <Sparkles className="size-3.5" />
          <span>Live Store State Snapshot:</span>
        </div>
        <pre className="text-[11px] text-muted-foreground overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(
            {
              activeFilter,
              searchQuery: searchQuery || "(empty)",
              sidebarOpen,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
