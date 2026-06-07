export const TOKEN_ADDRESSES = {
  sepolia: {
    // Circle's official USDC on Sepolia
    USDC: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" as `0x${string}`,
    // Aave's USDT on Sepolia (no official Tether testnet deployment)
    USDT: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0" as `0x${string}`,
  },
} as const;

export const DECIMALS = {
  USDC: 6,
  USDT: 6,
} as const;
