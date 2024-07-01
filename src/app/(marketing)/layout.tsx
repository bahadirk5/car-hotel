import { MarketingHeader } from "@/components/marketing/marketing-header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <MarketingHeader />
      {children}
    </>
  );
}
