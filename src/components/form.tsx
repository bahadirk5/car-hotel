"use client";

import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, PlusCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type FormValues = {
  [key: string]: any;
};

export function FormBuild({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
}: {
  title: string;
  description: string;
  helpText: string;
  inputAttrs: {
    name: string;
    type: string;
    defaultValue: string | string[] | null | undefined;
    placeholder?: string;
    maxLength?: number;
  };
  handleSubmit: any;
}) {
  const form = useForm<FormValues>({
    defaultValues: {
      [inputAttrs.name]: inputAttrs.defaultValue,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: inputAttrs.name,
  });

  const { mutate: updateCarRental, isPending } = useMutation({
    mutationFn: ({ formData, key }: { formData: any; key: string }) =>
      handleSubmit(formData, key),
    onSuccess: () => {
      toast.success("Car rental updated successfully");
    },
    onError: (error: any) => {
      console.error("Error updating car rental:", error);
      toast.error(error.message || "Error updating car rental");
    },
  });

  const onSubmit = (data: FormValues) => {
    updateCarRental({ formData: data, key: inputAttrs.name });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            {inputAttrs.type === "text" ? (
              <FormField
                control={form.control}
                name={inputAttrs.name}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={inputAttrs.placeholder}
                        maxLength={inputAttrs.maxLength}
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : inputAttrs.type === "textArray" ? (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  {fields.map((field, index) => (
                    <div className="grid grid-cols-4 gap-2" key={index}>
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`${inputAttrs.name}.${index}`}
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormControl>
                              <Input
                                placeholder={inputAttrs.placeholder}
                                maxLength={inputAttrs.maxLength}
                                disabled={isPending}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        variant="outline"
                        onClick={() => remove(index)}
                        type="button"
                        disabled={isPending}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append("")}
                    disabled={isPending}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add area
                  </Button>
                </div>
              </>
            ) : null}
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t px-6 py-4">
            <FormDescription>{helpText}</FormDescription>
            <div className="mt-3">
              <Button type="submit">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
