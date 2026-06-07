import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  user: {
    additionalFields: {
      businessName: { type: "string", required: true },
      country: { type: "string", required: true },
      currency: {
        type: "string",
        required: false,
        defaultValue: "USD",
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
