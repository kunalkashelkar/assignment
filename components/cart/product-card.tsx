"use client";

import * as React from "react";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Check } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard: Subscribes ONLY to the addItem action.
 * Notice: It does NOT subscribe to the cart items array or totals!
 * When items in the cart change or increment, this card will NOT re-render.
 */
export function ProductCard({ product }: ProductCardProps) {
  // Selector: subscribes strictly to the addItem action reference
  const addItem = useCartStore((state) => state.addItem);
  const [addedRecently, setAddedRecently] = React.useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    });
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1200);
  };

  return (
    <Card className="flex flex-col justify-between transition-all hover:border-primary/40">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-[10px] font-mono">
            {product.category}
          </Badge>
          <span className="font-bold text-sm text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <CardTitle className="text-sm font-semibold mt-1">
          {product.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          size="sm"
          onClick={handleAdd}
          className="w-full text-xs h-8 gap-1.5"
          variant={addedRecently ? "secondary" : "default"}
        >
          {addedRecently ? (
            <>
              <Check className="size-3.5 text-emerald-500" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart className="size-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
