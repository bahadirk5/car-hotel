import Link from "next/link";

import { getCarRental, updateCarRental } from "./actions";
import { FormBuild } from "@/components/form";

export default async function CarRentalPage() {
  const carRental = await getCarRental();

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground">
          <Link href="#" className="font-semibold text-primary">
            General
          </Link>
          <Link href="#">Security</Link>
          <Link href="#">Integrations</Link>
          <Link href="#">Support</Link>
          <Link href="#">Organizations</Link>
          <Link href="#">Advanced</Link>
        </nav>
        <div className="grid gap-6">
          <FormBuild
            title="Brand Name"
            description="This is the name of your brand that will be visible to the public."
            helpText="Please limit your brand name to a maximum of 32 characters."
            inputAttrs={{
              name: "name",
              type: "text",
              defaultValue: carRental?.name,
              maxLength: 32,
            }}
            handleSubmit={updateCarRental}
          />
          <FormBuild
            title="Tax Number"
            description="Enter your tax number for identification purposes."
            helpText="Your tax number should not exceed 32 characters."
            inputAttrs={{
              name: "tax_no",
              type: "text",
              defaultValue: carRental?.tax_no,
              maxLength: 32,
            }}
            handleSubmit={updateCarRental}
          />
          <FormBuild
            title="Service Areas"
            description="List the areas where your service is available."
            helpText="You can add multiple service areas, each up to 32 characters long."
            inputAttrs={{
              name: "service_area",
              type: "textArray",
              defaultValue: carRental?.service_area,
              maxLength: 32,
            }}
            handleSubmit={updateCarRental}
          />
        </div>
      </div>
    </div>
  );
}
