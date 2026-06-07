import { useQuery } from "@tanstack/react-query";

interface WalletBalance {
  usdc: string;
  usdt: string;
}

export function useWalletBalance(address: string) {
  return useQuery<WalletBalance>({
    queryKey: ["wallet-balance", address],
    queryFn: async () => {
      const res = await fetch(`/api/balances/${address}`);
      if (!res.ok) throw new Error("Failed to fetch balance");
      return res.json();
    },
    refetchInterval: 30_000, // poll every 30s
    staleTime: 20_000,
  });
}
