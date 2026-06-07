import { requireAuth } from "@/lib/auth/require-auth";
import { getWalletCount, getTotalBalances } from "@/features/wallets/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await requireAuth();
  const [walletCount, totals] = await Promise.all([
    getWalletCount(session.user.id),
    getTotalBalances(session.user.id),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground mt-1">Welcome back, {session.user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Registered Wallets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{walletCount}</p>
            <Link href={ROUTES.dashboard.wallets.list} className="text-sm text-primary hover:underline mt-1 block">
              Manage wallets →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total USDC</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totals.usdc.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Across all wallets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total USDT</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totals.usdt.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Across all wallets</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
