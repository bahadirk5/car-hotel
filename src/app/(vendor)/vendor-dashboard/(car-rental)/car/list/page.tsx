import { cn } from "@/lib/utils";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { getCars } from "./actions";

export default async function CarListPage() {
  const cars = await getCars();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-end">
        <Link
          href="/car/create"
          className={cn(buttonVariants({ size: "sm" }), "h-8 gap-1")}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Car
          </span>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Car List</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={cars} />
        </CardContent>
      </Card>
    </div>
  );
}
