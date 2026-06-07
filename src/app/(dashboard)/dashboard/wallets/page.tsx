import { requireAuth } from "@/lib/auth/require-auth";
import { getWallets } from "@/features/wallets/queries";
import { WalletCard } from "@/features/wallets/components";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

export default async function WalletsPage() {
  const session = await requireAuth();
  const wallets = await getWallets(session!.user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Wallets</h2>
          <p className="text-muted-foreground mt-1">{wallets.length} registered</p>
        </div>
        <Link href={ROUTES.dashboard.wallets.new}>
          <Button>Add wallet</Button>
        </Link>
      </div>

      {wallets.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">No wallets yet</p>
          <p className="text-sm mt-1">Add your first wallet to start tracking balances</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallets.map((wallet) => (
            <WalletCard
              key={wallet._id.toString()}
              id={wallet._id.toString()}
              label={wallet.label}
              shortAddress={`${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`}
              network={wallet.network}
            />
          ))}
        </div>
      )}
    </div>
  );
}
