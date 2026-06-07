"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push(ROUTES.login);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="w-full text-muted-foreground hover:text-foreground"
    >
      Sign out
    </Button>
  );
}
