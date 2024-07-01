import { CarList } from "./components/car-list";
import { SideFilters } from "./components/side-filters";
import { Sort } from "./components/sort";
import { TopFilters } from "./components/top-filters";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CarListingPage() {
  return (
    <div className="min-h-screen">
      <TopFilters />
      <div className="flex flex-1">
        <SideFilters />
        <ScrollArea
          className="w-full p-4"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <div className="flex items-center justify-between">
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
    </div>
  );
}
