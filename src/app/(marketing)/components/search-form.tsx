"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { CalendarIcon, Check, ChevronsUpDown, MoveUpRight } from "lucide-react";
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
import { addDays, format } from "date-fns";
import { Separator } from "@/components/ui/separator";

const places = [
  { label: "İstanbul", value: "istanbul" },
  { label: "Ankara", value: "ankara" },
  { label: "İzmir", value: "izmir" },
  { label: "Antalya", value: "antalya" },
  { label: "Adana", value: "adana" },
];

export function SearchForm() {
  const router = useRouter();

  const [openPickUp, setOpenPickUp] = React.useState(false);
  const [openDropOff, setOpenDropOff] = React.useState(false);
  const [pickUpValue, setPickUpValue] = React.useState("");
  const [dropOffValue, setDropOffValue] = React.useState("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });

  const createQueryString = (params: Record<string, string | undefined>) => {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        searchParams.set(key, params[key]!);
      }
    });

    return searchParams.toString();
  };

  return (
    <div className="z-10 m-auto flex w-min flex-col md:pl-4">
      <div className="overflow-hidden rounded-xl bg-foreground px-6 py-4 shadow-lg shadow-foreground/40">
        <div className="grid gap-2 md:flex">
          <Popover open={openPickUp} onOpenChange={setOpenPickUp}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openPickUp}
                className="dark w-full justify-between text-foreground md:w-[200px]"
              >
                {pickUpValue
                  ? places.find((framework) => framework.value === pickUpValue)
                      ?.label
                  : "Pick up place"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search place..." />
                <CommandList>
                  <CommandEmpty>No place found.</CommandEmpty>
                  <CommandGroup>
                    {places.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
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
                            pickUpValue === framework.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover open={openDropOff} onOpenChange={setOpenDropOff}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openDropOff}
                className="dark w-full justify-between text-foreground md:w-[200px]"
              >
                {dropOffValue
                  ? places.find((framework) => framework.value === dropOffValue)
                      ?.label
                  : "Drop off place"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search place..." />
                <CommandList>
                  <CommandEmpty>No place found.</CommandEmpty>
                  <CommandGroup>
                    {places.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
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
                            dropOffValue === framework.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "dark w-[300px] justify-start text-left font-normal text-foreground",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
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
          <Button
            variant="secondary"
            onClick={() => {
              const queryString = createQueryString({
                pickUp: pickUpValue,
                dropOff: dropOffValue,
                from: date?.from ? format(date.from, "yyyy-MM-dd") : "",
                to: date?.to ? format(date.to, "yyyy-MM-dd") : "",
              });
              router.push(`/car-listing?${queryString}`);
            }}
          >
            Search
          </Button>
        </div>
        <Separator className="dark -mx-6 my-2 w-[calc(100%+3rem)]" />
        <p className="mt-1 text-xs text-muted">
          The driver's country of residence is Turkey and their age is between
          30-65.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-2 w-min rounded-full text-xs"
      >
        I want to drop it off at a different location.
        <MoveUpRight className="ml-2 h-3 w-3" />
      </Button>
    </div>
  );
}
