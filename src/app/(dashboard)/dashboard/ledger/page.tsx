import { requireAuth } from "@/lib/auth/require-auth";
import { getWalletOptions } from "@/features/wallets/queries";
import { getTransactions } from "@/features/transactions/queries";
import { CreateTransactionForm, TransactionList } from "@/features/transactions/components";
import { Separator } from "@/components/ui/separator";

export default async function LedgerPage() {
  const session = await requireAuth();
  const [wallets, transactions] = await Promise.all([
    getWalletOptions(session.user.id),
    getTransactions(session.user.id),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Ledger</h2>
        <p className="text-muted-foreground mt-1">Record internal transfers between your wallets</p>
      </div>

      <CreateTransactionForm wallets={wallets} />

      <Separator />

      <TransactionList transactions={transactions} />
    </div>
  );
}
