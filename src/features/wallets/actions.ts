"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/require-auth";
import { connectDB } from "@/lib/db/mongoose";
import { Wallet } from "@/lib/db/models";
import { walletSchema, WalletInput } from "@/lib/validations/schemas";
import { safeParse } from "@/lib/validations/parse";
import { ROUTES } from "@/lib/constants/routes";


export async function createWallet(data: WalletInput) {
  const session = await requireAuth();

  const result = safeParse(walletSchema, data);
  if (!result.success) return { error: result.error };

  await connectDB();

  try {
    await Wallet.create({
      businessId: session.user.id,
      label: result.data.label,
      address: result.data.address.toLowerCase(),
      network: result.data.network,
    });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 11000) {
      return { error: "This wallet address is already registered" };
    }
    return { error: "Failed to create wallet" };
  }

  revalidatePath(ROUTES.dashboard.wallets.list);
  redirect(ROUTES.dashboard.wallets.list);
}

export async function deleteWallet(walletId: string) {
  const session = await requireAuth();

  await connectDB();
  await Wallet.deleteOne({ _id: walletId, businessId: session.user.id });

  revalidatePath(ROUTES.dashboard.wallets.list);
}
