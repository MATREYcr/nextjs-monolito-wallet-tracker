"use client";

import { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteWallet } from "@/features/wallets/actions";
import { toast } from "sonner";
import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

interface WalletCardProps {
  id: string;
  label: string;
  shortAddress: string;
  network: string;
}

export function WalletCard({ id, label, shortAddress, network }: WalletCardProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteWallet(id);
      toast.success("Wallet removed successfully");
    });
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base">{label}</CardTitle>
        <Badge variant="secondary">{network}</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm font-mono text-muted-foreground">{shortAddress}</p>
        <div className="flex gap-2">
          <Link href={ROUTES.dashboard.wallets.detail(id)} className="flex-1">
            <Button variant="outline" size="sm" className="w-full" disabled={isPending}>
              View details
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
