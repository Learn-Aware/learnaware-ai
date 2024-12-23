import { Sidebar } from "@/components/guest/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
