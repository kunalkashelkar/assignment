"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Laptop, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // During SSR and initial hydration before mounting, render a placeholder button
  // with identical geometry to prevent layout shift and avoid hydration mismatch.
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-9"
        aria-label="Toggle theme"
        disabled
      >
        <span className="size-4 rounded-full bg-muted-foreground/20 animate-pulse" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 relative focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`Current theme: ${theme}. Click to change theme.`}
          title="Change theme"
        >
          {theme === "dark" ? (
            <Moon className="size-4 text-primary transition-transform duration-200" />
          ) : theme === "light" ? (
            <Sun className="size-4 text-amber-500 transition-transform duration-200" />
          ) : (
            <Laptop className="size-4 text-primary transition-transform duration-200" />
          )}
          <span className="sr-only">Toggle theme (Light, Dark, System)</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuLabel className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Theme Mode
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Sun className="size-3.5 text-amber-500" />
            <span>Light</span>
          </span>
          {theme === "light" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Moon className="size-3.5 text-blue-400" />
            <span>Dark</span>
          </span>
          {theme === "dark" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Laptop className="size-3.5 text-muted-foreground" />
            <span>System</span>
          </span>
          {theme === "system" && <Check className="size-3.5 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
