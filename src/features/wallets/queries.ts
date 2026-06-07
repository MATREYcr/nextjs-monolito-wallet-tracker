import { connectDB } from "@/lib/db/mongoose";
import { Wallet } from "@/lib/db/models";
import { IWallet } from "@/lib/db/models/Wallet";

export async function getWallets(businessId: string): Promise<IWallet[]> {
  await connectDB();
  const wallets = await Wallet.find({ businessId }).sort({ createdAt: -1 }).lean();
  return wallets as IWallet[];
}

export async function getWalletCount(businessId: string): Promise<number> {
  await connectDB();
  return Wallet.countDocuments({ businessId });
}

export async function getTotalBalances(businessId: string): Promise<{ usdc: number; usdt: number }> {
  await connectDB();
  const wallets = await Wallet.find({ businessId, "lastBalanceSnapshot.fetchedAt": { $exists: true } }).lean();
  return wallets.reduce(
    (acc, w) => ({
      usdc: acc.usdc + parseFloat(w.lastBalanceSnapshot?.usdc ?? "0"),
      usdt: acc.usdt + parseFloat(w.lastBalanceSnapshot?.usdt ?? "0"),
    }),
    { usdc: 0, usdt: 0 }
  );
}

export async function saveBalanceSnapshot(
  address: string,
  businessId: string,
  balances: { usdc: string; usdt: string }
): Promise<void> {
  await connectDB();
  await Wallet.findOneAndUpdate(
    { address: address.toLowerCase(), businessId },
    { lastBalanceSnapshot: { ...balances, fetchedAt: new Date() } }
  );
}

export async function getWalletOptions(businessId: string): Promise<{ id: string; label: string }[]> {
  await connectDB();
  const wallets = await Wallet.find({ businessId }).select("label").lean();
  return wallets.map((w) => ({ id: w._id.toString(), label: w.label }));
}

export async function getWalletById(
  walletId: string,
  businessId: string
): Promise<IWallet | null> {
  await connectDB();
  const wallet = await Wallet.findOne({ _id: walletId, businessId }).lean();
  return wallet as IWallet | null;
}
