import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Star, Trophy } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
        <p className="text-muted-foreground">Here&apos;s an overview of your learning progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Courses in Progress</p>
              <h3 className="text-2xl font-bold mt-2">4</h3>
            </div>
            <BookOpen className="w-4 h-4 text-[hsl(var(--laai-blue))]" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Study Hours</p>
              <h3 className="text-2xl font-bold mt-2">24.5</h3>
            </div>
            <Clock className="w-4 h-4 text-[hsl(var(--laai-blue))]" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Achievements</p>
              <h3 className="text-2xl font-bold mt-2">12</h3>
            </div>
            <Trophy className="w-4 h-4 text-[hsl(var(--laai-blue))]" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Score</p>
              <h3 className="text-2xl font-bold mt-2">92%</h3>
            </div>
            <Star className="w-4 h-4 text-[hsl(var(--laai-blue))]" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Courses</h3>
          <div className="space-y-4">
            {["Mathematics", "Physics", "Chemistry"].map((course) => (
              <div key={course} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{course}</p>
                  <p className="text-sm text-muted-foreground">Last accessed 2 days ago</p>
                </div>
                <Button variant="outline" size="sm">Continue</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            {["Physics Tutorial", "Math Review", "Chemistry Lab"].map((session) => (
              <div key={session} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{session}</p>
                  <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
                </div>
                <Button variant="outline" size="sm">Join</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 