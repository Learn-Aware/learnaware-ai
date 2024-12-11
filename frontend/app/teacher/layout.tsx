import { Sidebar } from "@/components/teacher/sidebar";

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] p-8">
        {children}
      </main>
    </div>
  );
} 