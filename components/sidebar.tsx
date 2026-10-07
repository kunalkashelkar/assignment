"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Database,
  SendHorizontal,
  Home,
  ShieldCheck,
  Code2,
  FolderTree,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/ui-store";

interface NavItemDef {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

const navItems: NavItemDef[] = [
  {
    label: "Architecture Overview",
    href: "/",
    icon: Home,
  },
  {
    label: "1. Accessible Primitives",
    href: "#primitives",
    icon: Boxes,
    tag: "Radix + CVA",
  },
  {
    label: "2. Client State Store",
    href: "#zustand",
    icon: Database,
    tag: "Zustand",
  },
  {
    label: "3. Form Mutations",
    href: "#server-action",
    icon: SendHorizontal,
    tag: "Server Action",
  },
  {
    label: "Hydration & Themes",
    href: "/theme",
    icon: ShieldCheck,
    tag: "next-themes",
  },
];

const referenceLinks = [
  {
    label: "Strict TypeScript",
    href: "#typescript-spec",
    icon: ShieldCheck,
  },
  {
    label: "Server Components (RSC)",
    href: "/architecture",
    icon: Code2,
  },
  {
    label: "Folder Structure",
    href: "#folder-structure",
    icon: FolderTree,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-40 w-64 border-r bg-card/60 backdrop-blur transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:bg-transparent",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div className="space-y-6">
            <div>
              <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Assignment Areas
              </p>
              <nav className="mt-2 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors hover:bg-muted hover:text-foreground",
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground"
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="size-4" />
                        {item.label}
                      </span>
                      {item.tag && (
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
                          {item.tag}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                System Pillars
              </p>
              <nav className="mt-2 space-y-1">
                {referenceLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/40 p-3 text-xs">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              Runtime Architecture
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
              Default Server Components with isolated client interaction islands.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
