import type { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard, type Product } from "@/components/cart/product-card";
import { CartItems } from "@/components/cart/cart-items";
import { CartSummary } from "@/components/cart/cart-summary";
import {
  ShoppingBag,
  Database,
  Layers,
  Sparkles,
  ShieldAlert,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Persistent Zustand Cart Store | Next.js App Router",
  description:
    "Production-grade demonstration of Zustand client state with persistence middleware, granular selectors, and decoupled Server Component layout.",
};

// Static catalog computed on the server (RSC)
const sampleCatalog: Product[] = [
  {
    id: "prod-1",
    name: "Accessible Component System Kit",
    price: 49.99,
    category: "Architecture",
    description: "Production Radix UI primitives bundled with Tailwind CSS design tokens and WAI-ARIA authoring patterns.",
  },
  {
    id: "prod-2",
    name: "Zustand State Engine Module",
    price: 29.5,
    category: "Client State",
    description: "Lightweight in-memory state store with localStorage persistence middleware and selector memoization.",
  },
  {
    id: "prod-3",
    name: "End-to-End Type-Safe Form Suite",
    price: 39.0,
    category: "Form Mutations",
    description: "React Hook Form integration with Zod schemas and Next.js App Router Server Action mutations.",
  },
];

export default function CartPage() {
  return (
    <div className="space-y-8 py-2">
      {/* Header section (Server Component) */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-card via-card to-background p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
          <Database className="size-3.5" />
          <span>Client State Architecture &bull; Zustand Store</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Centralized Persistent Zustand Cart Store
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Demonstrating high-performance client state with localStorage persistence,
          granular selector subscriptions preventing redundant re-renders, and clear boundaries
          between client interaction state and canonical server state.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary">persist middleware</Badge>
          <Badge variant="outline">Granular Selectors</Badge>
          <Badge variant="outline">Partialized Storage</Badge>
          <Badge variant="outline">Server Layout Wrappers</Badge>
        </div>
      </section>

      {/* Main Cart & Catalog Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Catalog & Active Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Catalog Section (Server-rendered layout containing ProductCard client leaves) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold tracking-tight flex items-center gap-2">
                <ShoppingBag className="size-4 text-primary" />
                Product Catalog (Server-Delivered Props)
              </h2>
              <span className="text-xs text-muted-foreground">
                3 Engineering Modules Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {sampleCatalog.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Cart Items Section */}
          <div className="space-y-3">
            <h2 className="text-base font-bold tracking-tight flex items-center gap-2">
              <Layers className="size-4 text-primary" />
              Cart Items Subsystem
            </h2>
            <CartItems />
          </div>
        </div>

        {/* Right Column: Cart Summary */}
        <div className="space-y-6">
          <CartSummary />
        </div>
      </section>

      {/* Architecture Deep Dive: Selectors & Server vs Client State */}
      <section className="space-y-4 pt-4 border-t">
        <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          Technical Analysis: Granular Selectors &amp; State Ownership
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="size-4 text-amber-500" />
                Why Granular Selectors Eliminate Re-renders
              </CardTitle>
              <CardDescription className="text-xs">
                Subscribing to state slices rather than the entire store object
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-muted-foreground space-y-2 leading-relaxed">
              <p>
                In naïve Zustand implementations, components frequently use:
              </p>
              <div className="rounded bg-destructive/10 text-destructive p-2 font-mono text-[11px]">
                const &#123; items, addItem &#125; = useCartStore(); // ❌ Subscribes to EVERYTHING
              </div>
              <p>
                This causes components to re-render whenever <em>any</em> property in the store changes.
              </p>
              <p>
                In our architecture, components consume dedicated selectors:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-foreground">
                <li><code className="text-primary font-mono text-[11px]">ProductCard:</code> Subscribes exclusively to <code className="font-mono text-[11px]">state.addItem</code>. Adding items does not re-render other cards.</li>
                <li><code className="text-primary font-mono text-[11px]">CartSummary:</code> Subscribes exclusively to <code className="font-mono text-[11px]">selectTotalItemCount</code> and <code className="font-mono text-[11px]">selectCartSubtotal</code>.</li>
                <li><code className="text-primary font-mono text-[11px]">CartItems:</code> Subscribes to <code className="font-mono text-[11px]">selectCartItems</code> and mutation actions.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <ShieldAlert className="size-4 text-destructive" />
                Why Zustand Does NOT Replace Server State
              </CardTitle>
              <CardDescription className="text-xs">
                Clear distinction between client-owned vs. server-owned persistence
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 text-xs text-muted-foreground space-y-2 leading-relaxed">
              <p>
                Zustand is ideal for <strong>ephemeral, client-owned UI state</strong> (such as uncommitted cart items, filter toggles, and modal states) because of its zero-boilerplate, in-memory speed.
              </p>
              <p>
                However, Zustand must never substitute for <strong>server-side database state</strong>:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-foreground">
                <li><strong>No Tamper Protection:</strong> <code className="font-mono text-[11px]">localStorage</code> can be modified directly by the client browser console. Product prices must be validated on the server.</li>
                <li><strong>No Concurrency Guarantees:</strong> Multiple browser tabs or devices do not automatically synchronize inventory or transactional integrity.</li>
                <li><strong>Final Checkout Boundary:</strong> Checkout mutations must dispatch to Server Actions where canonical database transactions and payment authorizations take place.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
