"use client";

import * as React from "react";
import { useCartStore, selectTotalItemCount, selectCartSubtotal } from "@/stores/cart-store";
import { useTheme } from "next-themes";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sun,
  Moon,
  Laptop,
  Sparkles,
  ArrowRight,
  Database,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Isolated client island for real-time reactive state metrics.
 * Subscribes to fine-grained selectors for the cart and next-themes hook.
 * Surrounding dashboard cards remain pure Server Components.
 */
export function DashboardClientMetrics() {
  const totalCartUnits = useCartStore(selectTotalItemCount);
  const cartSubtotal = useCartStore(selectCartSubtotal);
  const { theme, resolvedTheme } = useTheme();

  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-32 rounded-xl border bg-muted/20 animate-pulse p-4" />
        <div className="h-32 rounded-xl border bg-muted/20 animate-pulse p-4" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* 1. Live Zustand Cart State */}
      <Card className="border transition-all hover:border-primary/40">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
              <Database className="size-3.5 text-primary" />
              Zustand Cart Store
            </span>
            <Badge variant="outline" className="font-mono text-[10px]">
              localStorage Persisted
            </Badge>
          </div>
          <CardTitle className="text-lg font-bold flex items-center justify-between mt-1">
            <span>{totalCartUnits} {totalCartUnits === 1 ? "Item" : "Items"}</span>
            <span className="font-mono text-primary text-base">
              ${cartSubtotal.toFixed(2)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-1 space-y-2.5 text-xs text-muted-foreground">
          <p className="text-[11px] leading-relaxed">
            Derived in real time via granular Zustand selectors. No page refresh needed.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-border/50">
            <span className="text-[11px] text-muted-foreground">Store reactivity: Active</span>
            <Button asChild variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-primary">
              <Link href="/cart">
                <span>Open Cart</span>
                <ArrowRight className="size-3" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 2. Live Theme State */}
      <Card className="border transition-all hover:border-primary/40">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-amber-500" />
              Theme Engine State
            </span>
            <Badge variant="secondary" className="font-mono text-[10px] capitalize">
              .{resolvedTheme} class
            </Badge>
          </div>
          <CardTitle className="text-lg font-bold flex items-center gap-2 mt-1">
            {theme === "dark" ? (
              <Moon className="size-5 text-blue-400" />
            ) : theme === "light" ? (
              <Sun className="size-5 text-amber-500" />
            ) : (
              <Laptop className="size-5 text-primary" />
            )}
            <span className="capitalize">{theme} Preference</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-1 space-y-2.5 text-xs text-muted-foreground">
          <p className="text-[11px] leading-relaxed">
            Resolved to <strong className="text-foreground capitalize">{resolvedTheme}</strong> mode. Zero hydration mismatch warning.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-border/50">
            <span className="text-[11px] text-muted-foreground">FOIT prevention: Active</span>
            <Button asChild variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-primary">
              <Link href="/theme">
                <span>Theme Lab</span>
                <ArrowRight className="size-3" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
