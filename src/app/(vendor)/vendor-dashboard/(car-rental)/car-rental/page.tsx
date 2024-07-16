import Link from "next/link";

import { updateCarRental } from "./actions";
import { FormBuild } from "@/components/form";


export default function CarRentalPage() {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
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
              defaultValue: "",
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
              defaultValue: "",
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
              defaultValue: [""],
              maxLength: 32,
            }}
            handleSubmit={updateCarRental}
          />
        </div>
      </div>
    </main>
  );
}
