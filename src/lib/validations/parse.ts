import { ZodSchema } from "zod";

type ParseResult<T> = { success: true; data: T } | { success: false; error: string };

export function safeParse<T>(schema: ZodSchema<T>, data: unknown): ParseResult<T> {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  return { success: true, data: parsed.data };
}
