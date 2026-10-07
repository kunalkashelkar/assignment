export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  description?: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  compactMode: boolean;
  notificationsEnabled: boolean;
}

export type ActionStatus = "idle" | "pending" | "success" | "error";

export interface ActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}
