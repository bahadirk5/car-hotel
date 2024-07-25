import { getCarRental, updateCarRental } from "./actions";
import { FormBuild } from "@/components/form";

export default async function CarRentalPage() {
  const carRental = await getCarRental();

  return (
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
  );
}
