"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionInput } from "@/lib/validations/schemas";
import { createTransaction } from "@/features/transactions/actions";
import { TRANSACTION_CURRENCIES } from "@/features/transactions/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface WalletOption {
  id: string;
  label: string;
}

interface CreateTransactionFormProps {
  wallets: WalletOption[];
}

export function CreateTransactionForm({ wallets }: CreateTransactionFormProps) {
  const form = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: { currency: "USDC", note: "" },
  });

  async function onSubmit(data: TransactionInput) {
    const result = await createTransaction(data);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Transaction recorded");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <FormField
          control={form.control}
          name="fromWalletId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From wallet</FormLabel>
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source wallet" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {wallets.map((w) => (
                    <SelectItem key={w.id} value={w.id}>{w.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="toWalletId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To wallet</FormLabel>
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination wallet" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {wallets.map((w) => (
                    <SelectItem key={w.id} value={w.id}>{w.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="100.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="w-28">
                <FormLabel>Currency</FormLabel>
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TRANSACTION_CURRENCIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note <span className="text-muted-foreground">(optional)</span></FormLabel>
              <FormControl>
                <Input placeholder="Payment for services..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Recording..." : "Record transaction"}
        </Button>
      </form>
    </Form>
  );
}
