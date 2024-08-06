import { auth } from "@/server/auth";
import { notFound } from "next/navigation";

import { DesktopSidebar } from "./components/desktop-sidebar";
import { MobileMenu } from "./components/mobile-menu";
import { getBusinessByVendorID, getVendorByUserID } from "./actions";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function VendorLayout({ children }: LayoutProps) {
  const session = await auth();
  if (!session?.user || session.user.role !== "vendor" || !session.user.id) {
    return notFound();
  }
  const vendor = await getVendorByUserID(session.user.id);
  if (!vendor) {
    return notFound();
  }
  const businesses = (await getBusinessByVendorID(vendor.id)) || [];

  return (
    <div className="grid min-h-screen w-full bg-muted/40">
      <DesktopSidebar user={session.user} vendor={vendor} businesses={businesses} />
      <div className="flex flex-col">
        <MobileMenu />
        <main className="flex flex-1 flex-col gap-4 p-4 sm:ml-64 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
