"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { addDays, format, parse } from "date-fns";

const places = [
  { label: "İstanbul", value: "istanbul" },
  { label: "Ankara", value: "ankara" },
  { label: "İzmir", value: "izmir" },
  { label: "Antalya", value: "antalya" },
  { label: "Adana", value: "adana" },
];

export function TopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openPickUp, setOpenPickUp] = React.useState(false);
  const [openDropOff, setOpenDropOff] = React.useState(false);
  const [pickUpValue, setPickUpValue] = React.useState(
    searchParams.get("pickUp") || "",
  );
  const [dropOffValue, setDropOffValue] = React.useState(
    searchParams.get("dropOff") || "",
  );
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: searchParams.get("from")
      ? parse(searchParams.get("from")!, "yyyy-MM-dd", new Date())
      : new Date(),
    to: searchParams.get("to")
      ? parse(searchParams.get("to")!, "yyyy-MM-dd", new Date())
      : addDays(new Date(), 7),
  });

  const createQueryString = React.useCallback(
    (params: Record<string, string | undefined>) => {
      const searchParams = new URLSearchParams();

      Object.keys(params).forEach((key) => {
        if (params[key]) {
          searchParams.set(key, params[key]!);
        }
      });

      return searchParams.toString();
    },
    [],
  );

  const handleSearch = React.useCallback(() => {
    const queryString = createQueryString({
      pickUp: pickUpValue,
      dropOff: dropOffValue,
      from: date?.from ? format(date.from, "yyyy-MM-dd") : "",
      to: date?.to ? format(date.to, "yyyy-MM-dd") : "",
    });
    router.push(`/car-listing?${queryString}`);
  }, [pickUpValue, dropOffValue, date, createQueryString, router]);

  return (
    <div className="grid grid-cols-4 divide-x border">
      {/* Pick up place */}
      <div>
        <Popover open={openPickUp} onOpenChange={setOpenPickUp}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPickUp}
              className="h-16 w-full justify-between border-none p-2"
            >
              {pickUpValue ? (
                <div className="flex flex-col items-start">
                  <span className="text-muted-foreground">Pick up place</span>
                  <span className="text-lg">
                    {places.find((place) => place.value === pickUpValue)?.label}
                  </span>
                </div>
              ) : (
                "Pick up place"
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search place..." />
              <CommandList>
                <CommandEmpty>No place found.</CommandEmpty>
                <CommandGroup>
                  {places.map((place) => (
                    <CommandItem
                      key={place.value}
                      value={place.value}
                      onSelect={(currentValue) => {
                        setPickUpValue(
                          currentValue === pickUpValue ? "" : currentValue,
                        );
                        setOpenPickUp(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          pickUpValue === place.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {place.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {/* Drop off place */}
      <div>
        <Popover open={openDropOff} onOpenChange={setOpenDropOff}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openDropOff}
              className="h-16 w-full justify-between border-none p-2"
            >
              {dropOffValue ? (
                <div className="flex flex-col items-start">
                  <span className="text-muted-foreground">Drop off place</span>
                  <span className="text-lg">
                    {
                      places.find((place) => place.value === dropOffValue)
                        ?.label
                    }
                  </span>
                </div>
              ) : (
                "Drop off place"
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search place..." />
              <CommandList>
                <CommandEmpty>No place found.</CommandEmpty>
                <CommandGroup>
                  {places.map((place) => (
                    <CommandItem
                      key={place.value}
                      value={place.value}
                      onSelect={(currentValue) => {
                        setDropOffValue(
                          currentValue === dropOffValue ? "" : currentValue,
                        );
                        setOpenDropOff(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          dropOffValue === place.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {place.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {/* Date */}
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "h-16 w-full justify-start border-none text-left p-2",
                !date && "text-muted-foreground",
              )}
            >
              {date?.from ? (
                date.to ? (
                  <div className="flex flex-col items-start">
                    <span className="text-muted-foreground">Date</span>
                    <span className="flex items-center text-lg">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-start">
                    <span className="text-muted-foreground">Date</span>
                    <span className="flex items-center text-lg">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(date.from, "LLL dd, y")}
                    </span>
                  </div>
                )
              ) : (
                <>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>Pick a date</span>
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* Search */}
      <div>
        <Button
          variant="ghost"
          className="h-16 w-full border-none"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
