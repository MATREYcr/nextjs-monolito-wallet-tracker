import { AddWalletForm } from "@/features/wallets/components";
import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

export default function NewWalletPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href={ROUTES.dashboard.wallets.list} className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to wallets
        </Link>
        <h2 className="text-2xl font-bold tracking-tight mt-2">Add wallet</h2>
        <p className="text-muted-foreground mt-1">Register an EVM wallet to track its stablecoin balances</p>
      </div>

      <AddWalletForm />
    </div>
  );
}
