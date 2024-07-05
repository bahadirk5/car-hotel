"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import debounce from "lodash.debounce";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export function Filter({
  id,
  name,
  options,
}: {
  id: string;
  name: string;
  options: {
    id: string;
    name: string;
  }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, values: Set<string>) => {
      const params = new URLSearchParams(searchParams.toString());
      if (values.size > 0) {
        params.set(name, Array.from(values).join(","));
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams],
  );

  const currentValues = useMemo(() => {
    return new Set(searchParams.get(id)?.split(",") || []);
  }, [searchParams, id]);

  const handleCheckboxChange = useCallback(
    debounce((optionName: string) => {
      const updatedValues = new Set(currentValues);
      if (updatedValues.has(optionName)) {
        updatedValues.delete(optionName);
      } else {
        updatedValues.add(optionName);
      }

      router.push(pathname + "?" + createQueryString(id, updatedValues));
    }, 100),
    [currentValues, createQueryString, pathname, router],
  );

  const isChecked = useCallback(
    (optionName: string) => {
      return currentValues.has(optionName);
    },
    [currentValues],
  );

  return (
    <AccordionItem value={id}>
      <AccordionTrigger>{name}</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <div className="flex items-center space-x-2" key={option.id}>
              <Checkbox
                id={option.id}
                checked={isChecked(option.name)}
                onCheckedChange={() => handleCheckboxChange(option.name)}
              />
              <label
                htmlFor={option.id}
                className="text-sm font-medium capitalize leading-none"
              >
                {option.name}
              </label>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
