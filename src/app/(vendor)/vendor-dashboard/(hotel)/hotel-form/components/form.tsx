"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { hotelFormData } from "./data";
import { DynamicList } from "./dynamic-list";
import { FileUploader } from "@/components/file-upload";

const hotelFormSchema = z.object({
  hotelName: z.string().min(1, "Hotel name is required"),
  rating: z.coerce.number().min(1).max(5, "Rating must be between 1 and 5"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.string().optional(),
  checkinTime: z.string().min(1, "Check-in time is required"),
  checkoutTime: z.string().min(1, "Check-out time is required"),
  checkinPolicy: z.string().min(1, "Check-in policy is required"),
  checkoutPolicy: z.string().min(1, "Check-out policy is required"),
  amenities: z.array(z.string()).optional(),
  nearbyAttractions: z
    .array(
      z.object({
        Place: z.string().min(1, "Place is required"),
        Distance: z.string().min(1, "Distance is required"),
      }),
    )
    .optional(),
  specialFeatures: z.string().optional(),
  diningOptions: z
    .array(
      z.object({
        Cuisine: z.string().min(1, "Cuisine is required"),
        Hours: z.string().min(1, "Hours are required"),
      }),
    )
    .optional(),
  wellnessServices: z.string().optional(),
  businessServices: z.string().optional(),
  roomImages: z.array(z.string()).optional(),
  restaurantImages: z.array(z.string()).optional(),
  exteriorImages: z.array(z.string()).optional(),
  recreationalImages: z.array(z.string()).optional(),
  eventImages: z.array(z.string()).optional(),
  serviceImages: z.array(z.string()).optional(),
});

const defaultValues = {
  hotelName: "",
  rating: 1,
  description: "",
  address: "",
  latitude: "",
  checkinTime: "",
  checkoutTime: "",
  checkinPolicy: "",
  checkoutPolicy: "",
  amenities: [],
  nearbyAttractions: [],
  specialFeatures: "",
  diningOptions: [],
  wellnessServices: "",
  businessServices: "",
  roomImages: [],
  restaurantImages: [],
  exteriorImages: [],
  recreationalImages: [],
  eventImages: [],
  serviceImages: [],
};

export function HotelForm() {
  const form = useForm({
    resolver: zodResolver(hotelFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: z.infer<typeof hotelFormSchema>) {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>,
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="sticky top-0 z-20 flex items-center gap-4 py-2 backdrop-blur">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Hotel Name
                  </h1>
                  <Badge variant="outline" className="ml-auto sm:ml-0">
                    Active
                  </Badge>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button type="button" variant="outline" size="sm">
                      Discard
                    </Button>
                    <Button size="sm" type="submit">
                      Save Hotel
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    {hotelFormData.map((section) => (
                      <Card key={section.title} x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                          <CardTitle>{section.title}</CardTitle>
                          <CardDescription>
                            {section.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            {section.data.map((fieldData) => (
                              <FormField
                                key={fieldData.name}
                                control={form.control}
                                name={
                                  fieldData.name as keyof z.infer<
                                    typeof hotelFormSchema
                                  >
                                }
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{fieldData.title}</FormLabel>
                                    {fieldData.type === "text" && (
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                    )}
                                    {fieldData.type === "number" && (
                                      <FormControl>
                                        <Input
                                          {...field}
                                          type="number"
                                          min={
                                            "min" in fieldData
                                              ? fieldData.min
                                              : undefined
                                          }
                                          max={
                                            "max" in fieldData
                                              ? fieldData.max
                                              : undefined
                                          }
                                        />
                                      </FormControl>
                                    )}
                                    {fieldData.type === "textarea" && (
                                      <FormControl>
                                        <Textarea {...field} />
                                      </FormControl>
                                    )}
                                    {fieldData.type === "checkbox" &&
                                      "options" in fieldData &&
                                      fieldData.options && (
                                        <FormItem>
                                          {fieldData.options.map((option) => (
                                            <FormField
                                              key={option.id}
                                              control={form.control}
                                              name="amenities"
                                              render={({ field }) => (
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                  <FormControl>
                                                    <Checkbox
                                                      checked={
                                                        field.value
                                                          ? (
                                                              field.value as string[]
                                                            ).includes(
                                                              option.id,
                                                            )
                                                          : false
                                                      }
                                                      onCheckedChange={(
                                                        checked,
                                                      ) => {
                                                        const newValue = checked
                                                          ? [
                                                              ...(field.value ||
                                                                []),
                                                              option.id,
                                                            ]
                                                          : (
                                                              field.value || []
                                                            ).filter(
                                                              (value: string) =>
                                                                value !==
                                                                option.id,
                                                            );
                                                        field.onChange(
                                                          newValue,
                                                        );
                                                      }}
                                                      id={option.id}
                                                      value={option.id}
                                                    />
                                                  </FormControl>
                                                  <FormLabel
                                                    htmlFor={option.id}
                                                  >
                                                    {option.name}
                                                  </FormLabel>
                                                </FormItem>
                                              )}
                                            />
                                          ))}
                                        </FormItem>
                                      )}
                                    {fieldData.type === "time" && (
                                      <FormControl>
                                        <Input {...field} type="time" />
                                      </FormControl>
                                    )}
                                    {fieldData.type === "mapJson" && (
                                      <div className="h-64 w-full rounded bg-gray-50">
                                        {/* Your map component goes here */}
                                        <p className="pt-24 text-center">
                                          {fieldData.description}
                                        </p>
                                      </div>
                                    )}
                                    {fieldData.type === "dynamicList" &&
                                      "fieldNames" in fieldData &&
                                      "fieldDescriptions" in fieldData && (
                                        <DynamicList
                                          title={fieldData.title}
                                          name={fieldData.name}
                                          fieldNames={
                                            fieldData.fieldNames
                                              ? fieldData.fieldNames
                                              : []
                                          }
                                          fieldDescriptions={
                                            fieldData.fieldDescriptions
                                              ? fieldData.fieldDescriptions
                                              : []
                                          }
                                        />
                                      )}
                                    {fieldData.type === "file" && (
                                      <FileUploader
                                        name={fieldData.name}
                                        defaultValue={
                                          // @ts-ignore
                                          defaultValues[fieldData.name]
                                        }
                                      />
                                    )}
                                    <FormDescription>
                                      {fieldData.description}
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Product Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormLabel htmlFor="status">Status</FormLabel>
                            <FormControl>
                              <Select>
                                <SelectTrigger
                                  id="status"
                                  aria-label="Select status"
                                >
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="draft">Draft</SelectItem>
                                  <SelectItem value="published">
                                    Active
                                  </SelectItem>
                                  <SelectItem value="archived">
                                    Archived
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-5">
                      <CardHeader>
                        <CardTitle>Archive Hotel</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div></div>
                        <Button size="sm" variant="secondary">
                          Archive Hotel
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button variant="outline" size="sm" type="button">
                    Discard
                  </Button>
                  <Button size="sm" type="submit">
                    Save Hotel
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </form>
    </Form>
  );
}
