import { signOut } from "next-auth/react";

import { LogOut, User as UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CaretSortIcon } from "@radix-ui/react-icons";

interface VendorAccountNavProps {
  vendor: {
    id: number;
    user_id: string;
  };
  user: {
    role: "vendor" | "customer" | "admin";
  } & User;
}

export function VendorAccountNav({ vendor, user }: VendorAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-full w-full border-none">
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${user.id}.png`}
              alt={user.name ?? "adana"}
            />
            <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-base">{user.name}</span>
          <CaretSortIcon className="ml-auto h-5 w-5 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div>
            {user.name}{" "}
            <span className="text-sm font-normal text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Button
            className="h-6 w-full justify-start p-0"
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="text-sm">Log out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
