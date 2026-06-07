import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type Network = "sepolia" | "mainnet" | "polygon";

interface BalanceSnapshot {
  usdc: string;
  usdt: string;
  fetchedAt: Date;
}

export interface IWallet extends Document {
  businessId: Types.ObjectId;
  label: string;
  address: string;
  network: Network;
  lastBalanceSnapshot?: BalanceSnapshot;
  shortAddress: string; // virtual
  createdAt: Date;
}

const WalletSchema = new Schema<IWallet>(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true, index: true },
    label: { type: String, required: true, trim: true },
    address: { type: String, required: true, index: true },
    network: { type: String, enum: ["sepolia", "mainnet", "polygon"], default: "sepolia" },
    lastBalanceSnapshot: {
      usdc: String,
      usdt: String,
      fetchedAt: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: truncates address to 0x1234...abcd
WalletSchema.virtual("shortAddress").get(function () {
  return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
});

// Compound unique: same address can't be registered twice per business
WalletSchema.index({ businessId: 1, address: 1 }, { unique: true });

const Wallet: Model<IWallet> =
  mongoose.models.Wallet ?? mongoose.model<IWallet>("Wallet", WalletSchema);

export default Wallet;
