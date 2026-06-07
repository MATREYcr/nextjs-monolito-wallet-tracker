"use client";

import { useWalletBalance } from "@/features/wallets/hooks/use-wallet-balance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TOKENS = ["USDC", "USDT"] as const;

interface WalletBalanceCardsProps {
  address: string;
}

export function WalletBalanceCards({ address }: WalletBalanceCardsProps) {
  const { data, isLoading, isError } = useWalletBalance(address);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TOKENS.map((token) => (
          <Card key={token}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-9 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TOKENS.map((token) => (
          <Card key={token}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{token} Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-destructive">Failed to load</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {TOKENS.map((token) => (
        <Card key={token}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{token} Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data?.[token.toLowerCase() as "usdc" | "usdt"] ?? "—"}</p>
            <p className="text-xs text-muted-foreground mt-1">Sepolia testnet</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
