import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Play,
  Pause,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

interface Task {
  id: string;
  name: string;
  description: string;
  schedule: string;
  status: "idle" | "running" | "completed" | "failed";
  lastRun?: string;
  nextRun?: string;
}

interface TaskListProps {
  tasks?: Task[];
  onRunTask?: (taskId: string) => void;
  onPauseTask?: (taskId: string) => void;
  onEditTask?: (taskId: string) => void;
  onDeleteTask?: (taskId: string) => void;
}

const TaskList = ({
  tasks = [
    {
      id: "task-1",
      name: "Network Security Scan",
      description: "Automated scan of network vulnerabilities on local devices",
      schedule: "Daily at 2:00 AM",
      status: "idle",
      lastRun: "2023-06-15 02:00 AM",
      nextRun: "2023-06-16 02:00 AM",
    },
    {
      id: "task-2",
      name: "Code Repository Backup",
      description: "Backup all code repositories to secure cloud storage",
      schedule: "Weekly on Sunday",
      status: "completed",
      lastRun: "2023-06-11 01:00 AM",
      nextRun: "2023-06-18 01:00 AM",
    },
    {
      id: "task-3",
      name: "Security Log Analysis",
      description: "Analyze system logs for suspicious activities",
      schedule: "Every 6 hours",
      status: "running",
      lastRun: "2023-06-15 12:00 PM",
      nextRun: "2023-06-15 06:00 PM",
    },
    {
      id: "task-4",
      name: "Malware Scan",
      description: "Deep scan for malware and suspicious files",
      schedule: "Every 3 days",
      status: "failed",
      lastRun: "2023-06-14 10:00 AM",
      nextRun: "2023-06-17 10:00 AM",
    },
  ],
  onRunTask = () => {},
  onPauseTask = () => {},
  onEditTask = () => {},
  onDeleteTask = () => {},
}: TaskListProps) => {
  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "idle":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Idle
          </Badge>
        );
      case "running":
        return (
          <Badge
            variant="default"
            className="bg-blue-500 flex items-center gap-1"
          >
            <Play className="h-3 w-3" /> Running
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="default"
            className="bg-green-500 flex items-center gap-1"
          >
            <CheckCircle className="h-3 w-3" /> Completed
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4 bg-background p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Automated Tasks</h2>

      {tasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No automated tasks found. Create a new task to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className="overflow-hidden border-l-4 transition-all hover:shadow-md"
              style={{
                borderLeftColor:
                  task.status === "running"
                    ? "#3b82f6"
                    : task.status === "completed"
                      ? "#22c55e"
                      : task.status === "failed"
                        ? "#ef4444"
                        : "#9ca3af",
              }}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{task.name}</CardTitle>
                  {getStatusBadge(task.status)}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {task.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="font-semibold">Schedule:</p>
                    <p>{task.schedule}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Last Run:</p>
                    <p>{task.lastRun || "Never"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold">Next Run:</p>
                    <p>{task.nextRun || "Not scheduled"}</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between pt-2 border-t">
                <div className="flex gap-2">
                  {task.status === "running" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPauseTask(task.id)}
                      className="flex items-center gap-1"
                    >
                      <Pause className="h-4 w-4" /> Pause
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRunTask(task.id)}
                      className="flex items-center gap-1"
                    >
                      <Play className="h-4 w-4" /> Run Now
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditTask(task.id)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTask(task.id)}
                    className="flex items-center gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
