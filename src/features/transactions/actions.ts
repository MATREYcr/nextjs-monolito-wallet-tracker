"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/require-auth";
import { connectDB } from "@/lib/db/mongoose";
import { Transaction, Wallet } from "@/lib/db/models";
import { transactionSchema, TransactionInput } from "@/lib/validations/schemas";
import { safeParse } from "@/lib/validations/parse";
import { ROUTES } from "@/lib/constants/routes";

export async function createTransaction(data: TransactionInput) {
  const session = await requireAuth();

  const result = safeParse(transactionSchema, data);
  if (!result.success) return { error: result.error };

  await connectDB();

  const [fromWallet, toWallet] = await Promise.all([
    Wallet.findOne({ _id: result.data.fromWalletId, businessId: session.user.id }),
    Wallet.findOne({ _id: result.data.toWalletId, businessId: session.user.id }),
  ]);

  if (!fromWallet || !toWallet) {
    return { error: "Invalid wallets" };
  }

  if (result.data.fromWalletId === result.data.toWalletId) {
    return { error: "Source and destination wallets must be different" };
  }

  try {
    await Transaction.create({
      businessId: session.user.id,
      fromWalletId: result.data.fromWalletId,
      toWalletId: result.data.toWalletId,
      amount: result.data.amount,
      currency: result.data.currency,
      note: result.data.note,
    });
  } catch {
    return { error: "Failed to create transaction" };
  }

  revalidatePath(ROUTES.dashboard.ledger);
}
