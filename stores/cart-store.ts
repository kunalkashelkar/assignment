import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

export interface CartState {
  items: CartItem[];
  // Actions
  addItem: (product: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      incrementQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decrementQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "academic-app-cart-storage",
      storage: createJSONStorage(() => localStorage),
      // Partialize: Persist ONLY the cart items data slice, excluding volatile actions
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Granular selector hooks to guarantee minimal re-renders
export const selectCartItems = (state: CartState) => state.items;
export const selectTotalItemCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
