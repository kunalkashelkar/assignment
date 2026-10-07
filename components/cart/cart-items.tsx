"use client";

import * as React from "react";
import { useCartStore, selectCartItems } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

/**
 * CartItems: Subscribes ONLY to items, increment, decrement, and remove actions.
 * It does NOT subscribe to subtotal calculations or external filters.
 */
export function CartItems() {
  const items = useCartStore(selectCartItems);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-8 text-center text-xs text-muted-foreground">
          Loading persisted cart items...
        </CardContent>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="border-dashed bg-muted/20">
        <CardContent className="py-12 flex flex-col items-center justify-center text-center space-y-2">
          <ShoppingBag className="size-8 text-muted-foreground/60" />
          <p className="text-sm font-semibold">Your Cart is Currently Empty</p>
          <p className="text-xs text-muted-foreground max-w-sm">
            Add products from the catalog to test granular Zustand store reactivity and localStorage persistence.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <span>Active Cart Items</span>
          <span className="text-xs font-normal text-muted-foreground">
            ({items.length} unique {items.length === 1 ? "product" : "products"})
          </span>
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-xs text-destructive hover:text-destructive h-7 px-2"
        >
          Clear All
        </Button>
      </CardHeader>
      <CardContent className="p-0 divide-y">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 text-xs gap-3"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{item.name}</p>
              <p className="text-muted-foreground text-[11px] mt-0.5">
                ${item.price.toFixed(2)} each
              </p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-1.5 border rounded-lg p-1 bg-muted/40">
              <Button
                variant="ghost"
                size="icon"
                className="size-6 text-muted-foreground hover:text-foreground"
                onClick={() => decrementQuantity(item.id)}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus className="size-3" />
              </Button>
              <span className="w-6 text-center font-mono font-semibold text-xs">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 text-muted-foreground hover:text-foreground"
                onClick={() => incrementQuantity(item.id)}
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus className="size-3" />
              </Button>
            </div>

            <div className="w-16 text-right font-mono font-semibold text-xs">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="size-7 text-muted-foreground hover:text-destructive"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
