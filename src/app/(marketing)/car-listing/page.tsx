import { ScrollArea } from "@/components/ui/scroll-area";
import { TopFilters } from "./components/top-filters";
import { Sort } from "./components/sort";
import { CarList } from "./components/car-list";
import { SideFilters } from "./components/side-filters";

export const dynamic = "force-dynamic";

export default async function CarListingPage() {
  return (
    <>
      <TopFilters />
      <div className="flex">
        <SideFilters />
        <ScrollArea
          className="w-full lg:w-3/4"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-end gap-1">
              <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                Choose your vehicle
              </h1>
              <p className="text-sm leading-7 text-muted-foreground">
                32 available
              </p>
            </div>
            <Sort />
          </div>
          <CarList />
        </ScrollArea>
      </div>
    </>
  );
}
