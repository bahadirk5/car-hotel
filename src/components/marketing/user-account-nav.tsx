import {
  AlignJustify,
  Car,
  CircleUser,
  LineChart,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "@/server/auth";
import Link from "next/link";

export function UserAccountNav({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: "customer" | "vendor" | "admin";
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full gap-2 py-5" size="sm">
          <AlignJustify className="mr-1 h-5 w-5" />
          <CircleUser className="h-7 w-7" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuLabel className="pt-0 text-xs text-muted-foreground">
          {email}
        </DropdownMenuLabel>
        {role === "vendor" ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/vendor-dashboard">
                <DropdownMenuItem>
                  <LineChart className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/vendor-dashboard/car-list">
                <DropdownMenuItem>
                  <Car className="mr-2 h-4 w-4" />
                  <span>Car List</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </>
        ) : null}
        <DropdownMenuSeparator />
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <DropdownMenuItem>
            <Button className="p-0 h-6 w-full justify-start" variant="ghost" size="sm" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="text-sm">Log out</span>
            </Button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
