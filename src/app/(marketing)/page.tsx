import { DotPattern } from "@/components/ui/dot-pattern";
import { SearchForm } from "./components/search-form";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  return (
    <main className="-mt-28 flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl [@media(max-width:480px)]:text-[2rem]">
            Simplify Your Car Rental Experience!
          </h1>
          <p className="font-semibold tracking-tighter text-muted-foreground [@media(max-width:480px)]:text-[1rem]">
            Explore, Compare, and Secure Your Ideal Car at the Best Rates Around
            the World.
          </p>
        </div>
        <SearchForm />
      </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
        )}
        width={30}
        height={30}
      />
    </main>
  );
}
