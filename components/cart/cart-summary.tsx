"use client";

import * as React from "react";
import {
  useCartStore,
  selectTotalItemCount,
  selectCartSubtotal,
} from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

/**
 * CartSummary: Subscribes ONLY to derived totals (item count and subtotal).
 * It computes tax and total strictly based on these numerical slices.
 */
export function CartSummary() {
  const totalCount = useCartStore(selectTotalItemCount);
  const subtotal = useCartStore(selectCartSubtotal);

  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-6 text-center text-xs text-muted-foreground">
          Calculating order totals...
        </CardContent>
      </Card>
    );
  }

  const estimatedTax = subtotal * 0.08;
  const grandTotal = subtotal + estimatedTax;

  return (
    <Card className="sticky top-20">
      <CardHeader className="p-4 pb-2 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Order Summary</CardTitle>
          <Badge variant="secondary" className="font-mono text-xs">
            {totalCount} {totalCount === 1 ? "unit" : "units"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3 text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal ({totalCount} items)</span>
          <span className="font-mono font-medium text-foreground">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Estimated Sales Tax (8%)</span>
          <span className="font-mono font-medium text-foreground">
            ${estimatedTax.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="font-mono font-medium text-emerald-500">Free</span>
        </div>

        <div className="border-t pt-2.5 flex justify-between font-bold text-sm">
          <span>Grand Total</span>
          <span className="font-mono text-primary text-base">
            ${grandTotal.toFixed(2)}
          </span>
        </div>

        <div className="rounded-lg border bg-muted/40 p-2.5 text-[11px] text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            <Sparkles className="size-3 text-primary" />
            <span>Zustand Selector Efficiency</span>
          </div>
          <p>
            This card re-renders strictly when <code className="text-foreground">totalCount</code> or <code className="text-foreground">subtotal</code> change. Individual product name updates do not cause recalculation.
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          disabled={totalCount === 0}
          className="w-full text-xs h-9 gap-2"
          onClick={() => {
            alert(
              `Demo Checkout: Handing off client cart total ($${grandTotal.toFixed(
                2
              )}) to server-side order processing action.`
            );
          }}
        >
          <ShieldCheck className="size-4" />
          <span>Proceed to Checkout</span>
          <ArrowRight className="size-3.5 ml-auto" />
        </Button>
      </CardFooter>
    </Card>
  );
}
