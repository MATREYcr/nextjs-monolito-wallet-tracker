import { requireAuth } from "@/lib/auth/require-auth";
import { getWalletById } from "@/features/wallets/queries";
import { WalletBalanceCards } from "@/features/wallets/components";
import { notFound } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  params: Promise<{ walletId: string }>;
}

export default async function WalletDetailPage({ params }: Props) {
  const { walletId } = await params;
  const session = await requireAuth();
  const wallet = await getWalletById(walletId, session!.user.id);

  if (!wallet) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href={ROUTES.dashboard.wallets.list} className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to wallets
        </Link>
        <div className="flex items-center gap-3 mt-2">
          <h2 className="text-2xl font-bold tracking-tight">{wallet.label}</h2>
          <Badge variant="secondary">{wallet.network}</Badge>
        </div>
        <p className="text-muted-foreground font-mono text-sm mt-1">{wallet.address}</p>
      </div>

      <WalletBalanceCards address={wallet.address} />
    </div>
  );
}
