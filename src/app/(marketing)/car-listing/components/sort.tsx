"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price (low to high)", value: "price_asc" },
];

export function Sort() {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState(null);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Sort by:</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <>
                {/* @ts-ignore */}
                {selectedStatus.label}
              </>
            ) : (
              <>price_asc</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {sortOptions.map((sort) => (
                  <CommandItem
                    key={sort.value}
                    value={sort.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        {/* @ts-ignore */},
                        sortOptions.find(
                          (priority) => priority.value === value,
                        ) || null,
                      );
                      setOpen(false);
                    }}
                  >
                    <span>{sort.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
