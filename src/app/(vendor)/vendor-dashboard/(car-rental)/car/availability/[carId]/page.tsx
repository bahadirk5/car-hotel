import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { getCarWithAvailability } from "../../actions";
import { AvailabilityForm } from "../components/availability-form";

export default async function CarEditPage({
  params,
}: {
  params: { carId: string };
}) {
  const carWithAvailability = await getCarWithAvailability(
    Number(params.carId),
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end">
        <AvailabilityForm
          availability={carWithAvailability.availability}
          carId={Number(params.carId)}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{carWithAvailability.car.license_plate}</CardTitle>
          <CardDescription>
            Here you can manage the availability dates and pricing for the
            selected car.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={carWithAvailability.availability}
          />
        </CardContent>
      </Card>
    </div>
  );
}
