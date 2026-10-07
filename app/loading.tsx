export default function Loading() {
  return (
    <div className="space-y-8 py-2 animate-pulse" aria-busy="true" aria-label="Loading page content">
      {/* Header Skeleton */}
      <div className="h-44 rounded-2xl border bg-muted/40 p-6 sm:p-8 space-y-4">
        <div className="h-6 w-48 rounded-full bg-muted" />
        <div className="h-8 w-3/4 rounded-lg bg-muted" />
        <div className="h-4 w-1/2 rounded-md bg-muted" />
      </div>

      {/* Content Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="h-64 rounded-xl border bg-muted/30 p-5 space-y-3">
          <div className="h-5 w-32 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
          <div className="h-10 w-full rounded-md bg-muted mt-8" />
        </div>
        <div className="h-64 rounded-xl border bg-muted/30 p-5 space-y-3">
          <div className="h-5 w-32 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
          <div className="h-10 w-full rounded-md bg-muted mt-8" />
        </div>
        <div className="h-64 rounded-xl border bg-muted/30 p-5 space-y-3">
          <div className="h-5 w-32 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
          <div className="h-10 w-full rounded-md bg-muted mt-8" />
        </div>
      </div>
    </div>
  );
}
