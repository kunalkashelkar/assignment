"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // In production, log error to an error reporting service
  }, [error]);

  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 sm:p-8 space-y-4 my-6 text-center">
      <div className="flex justify-center text-destructive">
        <AlertCircle className="size-10" />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-destructive">
          Something went wrong in this view
        </h2>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          An unexpected runtime error occurred. You can attempt to re-render the section using the retry trigger below.
        </p>
      </div>

      <div className="pt-2">
        <Button
          onClick={() => reset()}
          variant="outline"
          size="sm"
          className="text-xs gap-1.5"
        >
          <RotateCcw className="size-3.5" />
          <span>Try again</span>
        </Button>
      </div>
    </div>
  );
}
