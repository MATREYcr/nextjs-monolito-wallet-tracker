"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { walletSchema, WalletInput } from "@/lib/validations/schemas";
import { createWallet } from "@/features/wallets/actions";
import { NETWORKS } from "@/features/wallets/constants";
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

export function AddWalletForm() {
  const form = useForm<WalletInput>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      label: "",
      address: "",
      network: "sepolia",
    },
  });

  async function onSubmit(data: WalletInput) {
    const result = await createWallet(data);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Wallet added successfully");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet label</FormLabel>
              <FormControl>
                <Input placeholder="Operations Wallet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet address</FormLabel>
              <FormControl>
                <Input placeholder="0x..." className="font-mono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="network"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Network</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a network" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {NETWORKS.map((n) => (
                    <SelectItem key={n.value} value={n.value}>
                      {n.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Adding wallet..." : "Add wallet"}
        </Button>
      </form>
    </Form>
  );
}
