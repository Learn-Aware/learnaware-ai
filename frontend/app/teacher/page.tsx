import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, BookOpen, MessageSquare } from "lucide-react";

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Teacher!</h1>
        <p className="text-muted-foreground">Here&apos;s an overview of your teaching activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Students</p>
              <h3 className="text-2xl font-bold mt-2">24</h3>
            </div>
            <Users className="w-4 h-4 text-[hsl(var(--laai-blue))]" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Teaching Hours</p>
              <h3 className="text-2xl font-bold mt-2">32.5</h3>
            </div>
            <Clock className="w-4 h-4 text-[hsl(var(--laai-blue))]" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
              <h3 className="text-2xl font-bold mt-2">6</h3>
            </div>
            <BookOpen className="w-4 h-4 text-[hsl(var(--laai-blue))]" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Messages</p>
              <h3 className="text-2xl font-bold mt-2">12</h3>
            </div>
            <MessageSquare className="w-4 h-4 text-[hsl(var(--laai-blue))]" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Students</h3>
          <div className="space-y-4">
            {["John Doe", "Jane Smith", "Alex Johnson"].map((student) => (
              <div key={student} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{student}</p>
                  <p className="text-sm text-muted-foreground">Last session: 2 days ago</p>
                </div>
                <Button variant="outline" size="sm">View Profile</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            {["Advanced Math", "Physics 101", "Chemistry Lab"].map((session) => (
              <div key={session} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{session}</p>
                  <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
                </div>
                <Button variant="outline" size="sm">Prepare</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 