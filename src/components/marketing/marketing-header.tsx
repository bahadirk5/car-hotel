import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { CarFront } from "lucide-react";

export function MarketingHeader() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex flex-row items-center font-bold">
            <div className="mr-1 flex items-center gap-1">
              <CarFront className="h-9 w-9" />
            </div>
          </Link>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/vendor-dashboard"
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
