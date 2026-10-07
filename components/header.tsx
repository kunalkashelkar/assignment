import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNavToggle } from "@/components/mobile-nav-toggle";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <MobileNavToggle />
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-sm">
              <Layers className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-tight tracking-tight">
                Next.js Architecture
              </span>
              <span className="text-[11px] text-muted-foreground leading-tight">
                Academic Assignment Platform
              </span>
            </div>
          </Link>
          <Badge variant="outline" className="hidden sm:inline-flex text-[11px] font-normal">
            App Router • RSC
          </Badge>
        </div>

        <nav aria-label="Quick links" className="flex items-center gap-2">
          <Link
            href="#primitives"
            className="hidden text-xs font-medium text-muted-foreground hover:text-foreground md:inline-block px-2.5 py-1.5 rounded-md hover:bg-muted transition-colors"
          >
            UI Primitives
          </Link>
          <Link
            href="#zustand"
            className="hidden text-xs font-medium text-muted-foreground hover:text-foreground md:inline-block px-2.5 py-1.5 rounded-md hover:bg-muted transition-colors"
          >
            Zustand Store
          </Link>
          <Link
            href="#server-action"
            className="hidden text-xs font-medium text-muted-foreground hover:text-foreground md:inline-block px-2.5 py-1.5 rounded-md hover:bg-muted transition-colors"
          >
            Server Action
          </Link>
          <div className="h-4 w-px bg-border mx-1 hidden sm:block" />
          <ThemeToggle />
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-md border hover:bg-muted transition-colors"
          >
            <BookOpen className="size-3.5" />
            <span className="hidden sm:inline">Next.js Docs</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
