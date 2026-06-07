import { Badge } from "@/components/ui/badge";
import { TransactionItem } from "@/features/transactions/types";

interface TransactionListProps {
  transactions: TransactionItem[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg font-medium">No transactions yet</p>
        <p className="text-sm mt-1">Record your first internal transfer above</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {tx.fromWalletLabel} → {tx.toWalletLabel}
            </p>
            {tx.note && <p className="text-xs text-muted-foreground">{tx.note}</p>}
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">{tx.currency}</Badge>
            <span className="font-mono font-medium">{tx.amount}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(tx.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
