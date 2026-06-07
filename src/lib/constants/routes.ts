export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: {
    overview: "/dashboard",
    wallets: {
      list: "/dashboard/wallets",
      new: "/dashboard/wallets/new",
      detail: (id: string) => `/dashboard/wallets/${id}`,
    },
    ledger: "/dashboard/ledger",
  },
} as const;
