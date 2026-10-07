"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sun, Moon, Laptop, Sparkles, CheckCircle2 } from "lucide-react";

export function ThemeInteractiveSandbox() {
  const { theme, resolvedTheme, setTheme, systemTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-6 text-center text-xs text-muted-foreground">
          Mounting client theme controller island...
        </CardContent>
      </Card>
    );
  }

  const modes: Array<{
    value: "light" | "dark" | "system";
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    desc: string;
  }> = [
    {
      value: "light",
      label: "Light Mode",
      icon: Sun,
      desc: "Forces daylight color tokens (#ffffff baseline) regardless of OS preference.",
    },
    {
      value: "dark",
      label: "Dark Mode",
      icon: Moon,
      desc: "Forces dark color tokens (#09090b baseline) for reduced eye strain and high contrast.",
    },
    {
      value: "system",
      label: "System Preference",
      icon: Laptop,
      desc: "Synchronizes automatically with the client's OS media query (prefers-color-scheme).",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = theme === mode.value;

          return (
            <Card
              key={mode.value}
              className={`cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/40 shadow-sm"
                  : "bg-card"
              }`}
              onClick={() => setTheme(mode.value)}
            >
              <CardHeader className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-md ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <CardTitle className="text-sm font-semibold">
                      {mode.label}
                    </CardTitle>
                  </div>
                  {isSelected && (
                    <Badge variant="default" className="text-[10px] gap-1 px-1.5 py-0">
                      <CheckCircle2 className="size-3" /> Active
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {mode.desc}
                </p>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Live Client State Inspector */}
      <Card className="border bg-card/50">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              Live Theme Context State Inspector (Client Runtime)
            </span>
            <Badge variant="outline" className="font-mono text-[10px]">
              next-themes Provider Hook
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="rounded-md border bg-muted/40 p-2.5">
              <p className="text-[10px] text-muted-foreground uppercase font-sans">
                theme Setting
              </p>
              <p className="text-sm font-bold text-primary mt-0.5">{theme}</p>
            </div>
            <div className="rounded-md border bg-muted/40 p-2.5">
              <p className="text-[10px] text-muted-foreground uppercase font-sans">
                resolvedTheme
              </p>
              <p className="text-sm font-bold text-foreground mt-0.5">
                {resolvedTheme}
              </p>
            </div>
            <div className="rounded-md border bg-muted/40 p-2.5">
              <p className="text-[10px] text-muted-foreground uppercase font-sans">
                systemTheme
              </p>
              <p className="text-sm font-bold text-muted-foreground mt-0.5">
                {systemTheme ?? "detecting..."}
              </p>
            </div>
            <div className="rounded-md border bg-muted/40 p-2.5">
              <p className="text-[10px] text-muted-foreground uppercase font-sans">
                DOM Class Attribute
              </p>
              <p className="text-sm font-bold text-emerald-500 mt-0.5">
                .{resolvedTheme}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => setTheme("light")}
              className="text-xs h-8"
            >
              Set Light
            </Button>
            <Button
              size="sm"
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => setTheme("dark")}
              className="text-xs h-8"
            >
              Set Dark
            </Button>
            <Button
              size="sm"
              variant={theme === "system" ? "default" : "outline"}
              onClick={() => setTheme("system")}
              className="text-xs h-8"
            >
              Set System
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
