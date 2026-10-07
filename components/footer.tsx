import Link from "next/link";
import { BookMarked, Terminal, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/20 text-xs text-muted-foreground">
      <div className="flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-primary" />
          <span>
            Academic Assignment:{" "}
            <strong className="text-foreground font-medium">
              Component Architecture, Client State & Form Mutations
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <BookMarked className="size-3.5" />
            <span>Next.js App Router</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>TypeScript Strict Mode</span>
          </div>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Code2 className="size-3.5" />
            <span>Repository</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
