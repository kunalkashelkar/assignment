import { create } from "zustand";

interface UiState {
  sidebarOpen: boolean;
  activeFilter: string;
  searchQuery: string;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveFilter: (filter: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  activeFilter: "all",
  searchQuery: "",
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
