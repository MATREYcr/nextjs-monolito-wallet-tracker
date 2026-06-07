import { formatUnits } from "viem";
import { publicClient } from "./client";
import { TOKEN_ADDRESSES, DECIMALS } from "./constants";

const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

export async function getTokenBalances(address: `0x${string}`) {
  const [usdc, usdt] = await Promise.all([
    publicClient.readContract({
      address: TOKEN_ADDRESSES.sepolia.USDC,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [address],
    }),
    publicClient.readContract({
      address: TOKEN_ADDRESSES.sepolia.USDT,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [address],
    }),
  ]);

  return {
    usdc: formatUnits(usdc, DECIMALS.USDC),
    usdt: formatUnits(usdt, DECIMALS.USDT),
  };
}
