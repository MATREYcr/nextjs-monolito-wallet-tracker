import { z } from "zod";

export const registerSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  country: z.string().min(1, "Country is required"),
  currency: z.enum(["USD", "COP", "MXN", "BRL"]).default("USD"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const walletSchema = z.object({
  label: z.string().min(1, "Label is required").max(50),
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid EVM wallet address"),
  network: z.enum(["sepolia", "mainnet", "polygon"]).default("sepolia"),
});

export const transactionSchema = z.object({
  fromWalletId: z.string().min(1, "Source wallet is required"),
  toWalletId: z.string().min(1, "Destination wallet is required"),
  amount: z.string().refine((val) => parseFloat(val) > 0, "Amount must be greater than 0"),
  currency: z.enum(["USDC", "USDT"]),
  note: z.string().max(200).optional(),
});

export type RegisterInput = z.input<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type WalletInput = z.input<typeof walletSchema>;
export type TransactionInput = z.infer<typeof transactionSchema>;
