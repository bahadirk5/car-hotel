"use client";

import { Car, Home, LineChart, Settings } from "lucide-react";
import { BusinessSwitcher } from "./business-switcher";
import { NavItem } from "./nav-item";
import { Separator } from "@/components/ui/separator";
import { VendorAccountNav } from "./vendor-account-nav";
import { User } from "next-auth";
import { useBusinessStore } from "@/hooks/store";

interface CarRental {
  id: number;
  name: string;
  vendor_id: number;
  business_id: number;
  tax_no: string | null;
  service_area: string[];
  created_at: Date;
  updated_at: Date;
}

interface Business {
  id: number;
  vendor_id: number;
  type: "car_rental" | "hotel" | "villa_apart" | "transfer";
  car_rental?: CarRental | null;
}

interface Vendor {
  id: number;
  user_id: string;
}

interface DesktopSidebarProps {
  vendor: Vendor;
  businesses: Business[];
  user: {
    role: "vendor" | "customer" | "admin";
  } & User;
}

const CarRentalNavs = [
  {
    label: "Settings",
    href: "/vendor-dashboard/car/settings",
    icon: Settings,
  },
  {
    label: "Car List",
    href: "/vendor-dashboard/car/list",
    icon: Car,
  },
];

export function DesktopSidebar({
  user,
  vendor,
  businesses,
}: DesktopSidebarProps) {
  const { selected_business } = useBusinessStore();

  return (
    <div className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-2">
          <BusinessSwitcher businesses={businesses} />
        </div>
        <div className="flex-1">
          <nav className="grid items-start text-sm font-medium">
            <h4 className="px-3 py-2 text-sm tracking-tight text-muted-foreground">
              General
            </h4>
            <NavItem href="/vendor-dashboard" label="Dashboard" icon={Home} />
            <NavItem href="#" label="Analytics" icon={LineChart} />
            <Separator className="my-4" />
            {selected_business?.type === "car_rental" ? (
              <>
                <h4 className="px-3 py-2 text-sm tracking-tight text-muted-foreground">
                  Car Rental
                </h4>
                {CarRentalNavs.map((nav) => (
                  <NavItem
                    key={nav.href}
                    href={nav.href}
                    label={nav.label}
                    icon={nav.icon}
                  />
                ))}
              </>
            ) : null}
          </nav>
        </div>
        <div className="mt-auto h-16">
          <Separator className="" />
          <VendorAccountNav vendor={vendor} user={user} />
        </div>
      </div>
    </div>
  );
}
