import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { PlusCircle, ListFilter, LayoutGrid } from "lucide-react";
import TaskList from "./TaskList";
import TaskCreator from "./TaskCreator";

interface Task {
  id: string;
  name: string;
  description: string;
  schedule: string;
  status: "idle" | "running" | "completed" | "failed";
  lastRun?: string;
  nextRun?: string;
}

interface TaskAutomationProps {
  defaultView?: "list" | "create";
  tasks?: Task[];
}

const TaskAutomation = ({
  defaultView = "list",
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
}: TaskAutomationProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultView);
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleRunTask = (taskId: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "running" } : task,
      ),
    );
  };

  const handlePauseTask = (taskId: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "idle" } : task,
      ),
    );
  };

  const handleEditTask = (taskId: string) => {
    // Set active tab to create and populate form with task data
    setActiveTab("create");
    // In a real app, you would populate the form with the task data
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleTaskCreate = (taskData: any) => {
    // Create a new task with the form data
    const newTask: Task = {
      id: `task-${Date.now()}`,
      name: taskData.taskName,
      description: taskData.description || "",
      schedule: `${taskData.repeatInterval} starting ${taskData.schedule.toLocaleDateString()}`,
      status: "idle",
      nextRun: taskData.schedule.toLocaleDateString(),
    };

    setTaskList((prevTasks) => [...prevTasks, newTask]);
    setActiveTab("list"); // Switch back to list view after creating
  };

  const filteredTasks =
    filterStatus === "all"
      ? taskList
      : taskList.filter((task) => task.status === filterStatus);

  return (
    <div className="w-full h-full flex flex-col bg-background text-foreground p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Task Automation</h1>
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={viewMode === "grid" ? "bg-accent" : ""}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={viewMode === "list" ? "bg-accent" : ""}
              onClick={() => setViewMode("list")}
            >
              <ListFilter className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
          <Button
            onClick={() => setActiveTab("create")}
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="list" className="flex-1">
            Task List
          </TabsTrigger>
          <TabsTrigger value="create" className="flex-1">
            Create Task
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              {filteredTasks.length} tasks found
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={filterStatus === "all" ? "bg-accent" : ""}
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={filterStatus === "running" ? "bg-accent" : ""}
                onClick={() => setFilterStatus("running")}
              >
                Running
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={filterStatus === "completed" ? "bg-accent" : ""}
                onClick={() => setFilterStatus("completed")}
              >
                Completed
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={filterStatus === "failed" ? "bg-accent" : ""}
                onClick={() => setFilterStatus("failed")}
              >
                Failed
              </Button>
            </div>
          </div>

          <TaskList
            tasks={filteredTasks}
            onRunTask={handleRunTask}
            onPauseTask={handlePauseTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </TabsContent>

        <TabsContent value="create">
          <TaskCreator onTaskCreate={handleTaskCreate} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskAutomation;
