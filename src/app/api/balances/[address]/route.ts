import { getTokenBalances } from "@/lib/blockchain/erc20";
import { saveBalanceSnapshot } from "@/features/wallets/queries";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { isAddress } from "viem";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ address: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { address } = await params;

  if (!isAddress(address)) {
    return Response.json({ error: "Invalid wallet address" }, { status: 400 });
  }

  try {
    const balances = await getTokenBalances(address as `0x${string}`);
    await saveBalanceSnapshot(address, session.user.id, balances);
    return Response.json(balances);
  } catch {
    return Response.json({ error: "Failed to fetch balances" }, { status: 500 });
  }
}
