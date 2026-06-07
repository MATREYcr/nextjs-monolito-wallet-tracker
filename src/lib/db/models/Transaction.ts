import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type TransactionCurrency = "USDC" | "USDT";

export interface ITransaction extends Document {
  businessId: Types.ObjectId;
  fromWalletId: Types.ObjectId;
  toWalletId: Types.ObjectId;
  amount: string; // stored as string to avoid float precision issues
  currency: TransactionCurrency;
  note?: string;
  txHash?: string; // optional: if it was an on-chain transaction
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    fromWalletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
    toWalletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
    amount: { type: String, required: true },
    currency: { type: String, enum: ["USDC", "USDT"], required: true },
    note: { type: String, trim: true },
    // Sparse: only indexed when present (on-chain txs have it, internal ones don't)
    txHash: { type: String, sparse: true, index: true },
  },
  { timestamps: true }
);

// Pre-save hook: validate amount is a positive number
TransactionSchema.pre("save", function () {
  if (parseFloat(this.amount) <= 0) {
    throw new Error("Amount must be greater than 0");
  }
});

const Transaction: Model<ITransaction> =
  mongoose.models.Transaction ??
  mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
