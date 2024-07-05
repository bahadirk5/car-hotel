import {
  FUEL_TYPES,
  SEAT_COUNTS,
  TRANSMISSION_TYPES,
  PRICE_FILTERS,
  SEGMENTS,
} from "./filters";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Filter } from "./filter";

export function SideFilters() {
  return (
    <div
      className="hidden border-r p-2 lg:block lg:w-1/4 lg:flex-col"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="flex items-center justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold">Filter</h3>
        <Button variant="ghost" size="sm" className="text-xs">
          CLEAR ALL FILTERS
        </Button>
      </div>
      <Separator className="mt-2" />
      <Accordion type="multiple">
        <Filter
          id={FUEL_TYPES.id}
          name={FUEL_TYPES.name}
          options={FUEL_TYPES.options}
        />
        <Filter
          id={SEAT_COUNTS.id}
          name={SEAT_COUNTS.name}
          options={SEAT_COUNTS.options}
        />
        <Filter
          id={TRANSMISSION_TYPES.id}
          name={TRANSMISSION_TYPES.name}
          options={TRANSMISSION_TYPES.options}
        />
      </Accordion>
    </div>
  );
}
