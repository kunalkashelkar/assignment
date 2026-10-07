"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/ui-store";

export function MobileNavToggle() {
  const { sidebarOpen, toggleSidebar } = useUiStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={toggleSidebar}
      aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={sidebarOpen}
    >
      {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </Button>
  );
}
