"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Wallet, BookOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LogoutButton } from "@/features/auth/components";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ROUTES } from "@/lib/constants/routes";

const NAV_ITEMS = [
  { href: ROUTES.dashboard.overview, label: "Overview", icon: LayoutDashboard },
  { href: ROUTES.dashboard.wallets.list, label: "Wallets", icon: Wallet },
  { href: ROUTES.dashboard.ledger, label: "Ledger", icon: BookOpen },
];

interface AppSidebarProps {
  userName: string;
}

export function AppSidebar({ userName }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-3">
          <h1 className="text-lg font-bold text-green-500">zabio-track</h1>
          <p className="text-xs text-muted-foreground mt-1 truncate">{userName}</p>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarMenu>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton render={<Link href={href} />} isActive={pathname === href}>
                <Icon />
                <span>{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <div className="flex items-center justify-between px-2 py-2">
          <LogoutButton />
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
