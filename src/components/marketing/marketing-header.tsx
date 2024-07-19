import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { CarFront } from "lucide-react";
import { auth } from "@/server/auth";
import { UserAccountNav } from "./user-account-nav";
import { db } from "@/server/db";
import { users, vendors } from "@/server/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export async function MarketingHeader() {
  const session = await auth();

  return (
    <div className="container py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex flex-row items-center font-bold">
            <div className="mr-1 flex items-center gap-1">
              <CarFront className="h-9 w-9" />
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
                RentEase
              </h2>
            </div>
          </Link>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {session?.user ? (
            <>
              {session.user.role !== "vendor" ? (
                <form
                  action={async () => {
                    "use server";

                    if (!session || !session.user || !session.user.id) {
                      throw new Error("User not authenticated");
                    }

                    try {
                      await db.insert(vendors).values({
                        user_id: session.user.id,
                      });

                      await db
                        .update(users)
                        .set({ role: "vendor" })
                        .where(eq(users.id, session.user.id));
                    } catch (error) {
                      console.error("Error inserting vendor:", error);
                    }
                    redirect("/vendor-dashboard");
                  }}
                >
                  <Button type="submit" variant="secondary">
                    Become Vendor
                  </Button>
                </form>
              ) : null}
              <UserAccountNav
                name={session?.user?.name || ""}
                email={session?.user?.email || ""}
                role={session?.user?.role}
              />
            </>
          ) : (
            <Link
              href="/auth/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
