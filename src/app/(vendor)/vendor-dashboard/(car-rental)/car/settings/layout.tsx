import { Separator } from "@/components/ui/separator"
import { Header } from "./components/header"
import { Nav } from "./components/nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    {
      title: "General",
      path: "/vendor-dashboard/car/settings",
      disabled: false,
    },
    {
      title: "Address",
      path: "/vendor-dashboard/settings/address",
      disabled: true,
    },
    {
      title: "Resume",
      path: "/vendor-dashboard/settings/resume",
      disabled: true,
    },
    {
      title: "Services",
      path: "/vendor-dashboard/settings/services",
      disabled: true,
    },
  ]
  return (
    <div className="flex mx-auto flex-col">
      <div className="flex flex-col space-y-6">
        <Header
          heading="Settings"
          text="Configure user preferences and account details."
        ></Header>
        <div className="space-y-4">
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            {navItems.map((item) => (
              <Nav
                key={item.path}
                path={item.path}
                title={item.title}
                disabled={item.disabled}
              />
            ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
