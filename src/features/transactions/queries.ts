import { connectDB } from "@/lib/db/mongoose";
import { Transaction } from "@/lib/db/models";
import { TransactionItem } from "./types";

export async function getTransactions(businessId: string): Promise<TransactionItem[]> {
  await connectDB();

  const transactions = await Transaction.find({ businessId })
    .sort({ createdAt: -1 })
    .populate("fromWalletId", "label")
    .populate("toWalletId", "label")
    .lean();

  return transactions.map((t) => {
    const from = t.fromWalletId as unknown as { label: string } | null;
    const to = t.toWalletId as unknown as { label: string } | null;

    return {
      id: t._id.toString(),
      fromWalletLabel: from?.label ?? "Deleted wallet",
      toWalletLabel: to?.label ?? "Deleted wallet",
      amount: t.amount,
      currency: t.currency,
      note: t.note,
      createdAt: t.createdAt.toISOString(),
    };
  });
}
