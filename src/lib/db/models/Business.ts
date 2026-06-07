import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  email: string;
  country: string;
  currency: "USD" | "COP" | "MXN" | "BRL";
  createdAt: Date;
}

const BusinessSchema = new Schema<IBusiness>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    country: { type: String, required: true },
    currency: { type: String, enum: ["USD", "COP", "MXN", "BRL"], default: "USD" },
  },
  { timestamps: true }
);

const Business: Model<IBusiness> =
  mongoose.models.Business ?? mongoose.model<IBusiness>("Business", BusinessSchema);

export default Business;
