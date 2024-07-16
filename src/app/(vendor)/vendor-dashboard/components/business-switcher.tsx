"use client";

import React, { useState, useEffect } from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createBusiness } from "../actions";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

interface Business {
  id: number;
  vendor_id: number;
  type: "car_rental" | "hotel" | "villa_apart" | "transfer";
  car_rental?: {
    name: string;
  } | null;
}

interface BusinessSwitcherProps {
  businesses: Business[];
  className?: string;
}

const businessCreateSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Business name must be at least 2 characters long.",
    })
    .max(30, {
      message: "Business name must not exceed 30 characters.",
    }),
  type: z.enum(["car_rental", "hotel", "villa_apart", "transfer"], {
    message:
      "Business type must be one of the following: car_rental, hotel, villa_apart, or transfer.",
  }),
});

export type businessCreateValues = z.infer<typeof businessCreateSchema>;

export function BusinessSwitcher({
  businesses,
  className,
}: BusinessSwitcherProps) {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null,
  );
  const [businessType, setBusinessType] = useState<
    "car_rental" | "hotel" | "villa_apart" | "transfer" | null
  >(null);

  const form = useForm<businessCreateValues>({
    resolver: zodResolver(businessCreateSchema),
    mode: "onChange",
  });

  const [open, setOpen] = useState(false);
  const [showNewBusinessDialog, setShowNewBusinessDialog] = useState(false);

  // Load state from local storage on mount
  useEffect(() => {
    const savedBusiness = localStorage.getItem("selectedBusiness");
    const savedBusinessType = localStorage.getItem("businessType");

    if (savedBusiness && savedBusinessType) {
      setSelectedBusiness(JSON.parse(savedBusiness));
      setBusinessType(
        savedBusinessType as
          | "car_rental"
          | "hotel"
          | "villa_apart"
          | "transfer",
      );
    } else if (businesses.length > 0) {
      const firstBusiness = businesses[0];
      if (firstBusiness) {
        setSelectedBusiness(firstBusiness);
        setBusinessType(firstBusiness.type);
      }
    }
  }, [businesses]);

  // Save state to local storage on change
  useEffect(() => {
    if (selectedBusiness && businessType) {
      localStorage.setItem(
        "selectedBusiness",
        JSON.stringify(selectedBusiness),
      );
      localStorage.setItem("businessType", businessType);
    }
  }, [selectedBusiness, businessType]);

  function onSubmit(data: businessCreateValues) {
    create_business(data);
  }

  const { isPending, mutate: create_business } = useMutation({
    mutationFn: createBusiness,
    onSuccess: () => {
      toast.success("Business created successfully");
      setShowNewBusinessDialog(false);
    },
    onError: (error) => {
      console.error("Error creating business:", error);
      if (error.message === "Vendor already has a car rental business") {
        form.setError("type", {
          type: "manual",
          message: "You can only create one car rental business.",
        });
      } else {
        toast.error(error.message || "Error creating business");
      }
    },
  });

  return (
    <Dialog
      open={showNewBusinessDialog}
      onOpenChange={setShowNewBusinessDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a business"
            className={cn(
              "h-full w-full justify-between border-none",
              className,
            )}
          >
            {selectedBusiness ? (
              <>
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${selectedBusiness.id}.png`}
                    alt={selectedBusiness.type}
                    className="grayscale"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <span className="text-base">
                  {selectedBusiness.car_rental?.name ?? "hotel"}
                </span>
                <CaretSortIcon className="ml-auto h-6 w-6 shrink-0 opacity-50" />
              </>
            ) : (
              "Select a business"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search business..." />
              <CommandEmpty>No business found.</CommandEmpty>
              {businesses.length > 0 &&
                businesses.map((business) => (
                  <CommandGroup key={business.type} heading={business.type}>
                    <CommandItem
                      key={business.id}
                      onSelect={() => {
                        setSelectedBusiness(business);
                        setBusinessType(business.type);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${business.id}.png`}
                          alt={business.type}
                          className="grayscale"
                        />
                        <AvatarFallback>
                          {business.type === "car_rental" ??
                            business.car_rental?.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {business.car_rental?.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedBusiness?.id === business.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  </CommandGroup>
                ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setShowNewBusinessDialog(true);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Business
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create business</DialogTitle>
          <DialogDescription>
            Add a new business to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your business name"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Public name, real or pseudonym, reflecting your brand.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={isPending}>
                        <SelectValue placeholder="Select the type of your business" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="car_rental">Car Rental</SelectItem>
                      <SelectItem value="hotel">Hotel</SelectItem>
                      <SelectItem value="villa_apart">
                        Villa/Apartment
                      </SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the category that fits your business best for better
                    organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowNewBusinessDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
