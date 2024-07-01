import * as React from "react";
import {
  FUEL_TYPES,
  SEAT_COUNTS,
  TRANSMISSION_TYPES,
  PRICE_FILTERS,
  SEGMENTS,
} from "./filters";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SideFilters() {
  return (
    <div
      className="hidden border-r p-2 lg:block lg:w-1/3 lg:flex-col"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="flex justify-between items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold">
          Filter
        </h3>
        <Button variant="ghost" size="sm" className="text-xs">CLEAR ALL FILTERS</Button>
      </div>
      <Separator className="mt-2"/>
      <Accordion type="multiple">
        <AccordionItem value={FUEL_TYPES.id}>
          <AccordionTrigger>{FUEL_TYPES.name}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {FUEL_TYPES.options.map((option) => (
                <div className="flex items-center space-x-2" key={option.id}>
                  <Checkbox id={option.id} />
                  <label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none"
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={SEAT_COUNTS.id}>
          <AccordionTrigger>{SEAT_COUNTS.name}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {SEAT_COUNTS.options.map((option) => (
                <div className="flex items-center space-x-2" key={option.id}>
                  <Checkbox id={option.id} />
                  <label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none"
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={TRANSMISSION_TYPES.id}>
          <AccordionTrigger>{TRANSMISSION_TYPES.name}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {TRANSMISSION_TYPES.options.map((option) => (
                <div className="flex items-center space-x-2" key={option.id}>
                  <Checkbox id={option.id} />
                  <label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none"
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={SEGMENTS.id}>
          <AccordionTrigger>{SEGMENTS.name}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {SEGMENTS.options.map((option) => (
                <div className="flex items-center space-x-2" key={option.id}>
                  <Checkbox id={option.id} />
                  <label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none"
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={PRICE_FILTERS.id}>
          <AccordionTrigger>{PRICE_FILTERS.name}</AccordionTrigger>
          <AccordionContent>
            <RadioGroup>
              {PRICE_FILTERS.options.map((option, optionIdx) => (
                <div className="flex items-center space-x-2" key={optionIdx}>
                  <RadioGroupItem
                    value={`price-${optionIdx}`}
                    id={`price-${optionIdx}`}
                  />
                  <Label htmlFor={`price-${optionIdx}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            <Slider defaultValue={[33]} max={100} step={1} className="mt-4" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
