"use client";

import * as React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function DynamicList({
  title,
  name,
  fieldNames,
  fieldDescriptions,
}: {
  title: string;
  name: string;
  fieldNames: string[];
  fieldDescriptions: string[];
}) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="grid gap-3">
      {fields.map((item, index) => (
        <div key={item.id} className="grid grid-cols-12 items-center gap-2">
          {fieldNames.map((fieldName, fieldIndex) => (
            <div key={fieldIndex} className="col-span-5">
              <Label>{fieldName}</Label>
              <Input
                type="text"
                {...register(`${name}[${index}].${fieldName}`)}
                className="w-full"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {fieldDescriptions?.[fieldIndex]}
              </p>
            </div>
          ))}
          <div className="col-span-2 flex items-end justify-end">
            <Button
              variant="outline"
              onClick={() => remove(index)}
              type="button"
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button onClick={() => append({})} type="button">
        Add {title}
      </Button>
    </div>
  );
}
