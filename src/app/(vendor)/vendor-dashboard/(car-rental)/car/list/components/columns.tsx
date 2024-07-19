"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DataTableColumnHeader } from "./data-table-column-header";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { carStatuses, CarStatus } from "../types";
import { deleteCar, setStatus } from "../../actions";

export type CarType = {
  id: number;
  brand: string;
  model: string;
  license_plate: string;
  segment: string;
  created_at: Date;
  updated_at: Date;
  status: CarStatus;
};

export const columns: ColumnDef<CarType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "license_plate",
    header: "License Plate",
  },
  {
    accessorKey: "segment",
    header: "Segment",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const variant =
        status === "available"
          ? "default"
          : status === "rented"
            ? "secondary"
            : status === "maintenance"
              ? "outline"
              : status === "reserved"
                ? "destructive"
                : "secondary";

      return <Badge variant={variant}>{row.getValue("status")}</Badge>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),

    cell: ({ row }) => {
      const created_at = format(row.getValue("created_at"), "PPP");

      return <div className="font-medium">{created_at}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const car = row.original;

      const { mutate: set_status } = useMutation({
        mutationFn: setStatus,
        onSuccess: () => {
          toast.success("Car status updated successfully");
        },
        onError: (error) => {
          console.error("Error updating car status:", error);
          toast.error(error.message || "Error updating car status");
        },
      });

      const { mutate: delete_car } = useMutation({
        mutationFn: deleteCar,
        onSuccess: () => {
          toast.success("Car is deleted successfully");
        },
        onError: (error) => {
          console.error("Error deleting car:", error);
          toast.error(error.message || "Error deleting car");
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(car.license_plate)}
            >
              Copy lisance plate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={car.status}
                  onValueChange={(value) =>
                    set_status({
                      id: car.id,
                      status: value as CarType["status"],
                    })
                  }
                >
                  {carStatuses.map((status) => (
                    <DropdownMenuRadioItem key={status} value={status}>
                      {status}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <Link href={`/vendor-dashboard/car/edit/${car.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-sm flex w-full justify-start pl-2 font-normal"
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => delete_car(car.id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
