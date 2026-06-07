export type TransactionCurrency = "USDC" | "USDT";

export interface TransactionItem {
  id: string;
  fromWalletLabel: string;
  toWalletLabel: string;
  amount: string;
  currency: TransactionCurrency;
  note?: string;
  createdAt: string;
}
