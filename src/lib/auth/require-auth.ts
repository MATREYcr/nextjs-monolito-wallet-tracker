import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

export async function requireAuth() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(ROUTES.login);
  return session;
}
