import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Code, FileCode, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeToolSelectorProps {
  onToolChange?: (tool: "generate" | "analyze") => void;
  defaultTool?: "generate" | "analyze";
}

const CodeToolSelector = ({
  onToolChange = () => {},
  defaultTool = "generate",
}: CodeToolSelectorProps) => {
  const [activeTool, setActiveTool] = useState<"generate" | "analyze">(
    defaultTool,
  );

  const handleToolChange = (value: string) => {
    const tool = value as "generate" | "analyze";
    setActiveTool(tool);
    onToolChange(tool);
  };

  return (
    <div className="w-full bg-slate-100 p-4 rounded-lg">
      <Tabs
        defaultValue={defaultTool}
        onValueChange={handleToolChange}
        className="w-full"
      >
        <div className="flex items-center justify-center mb-4">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Code size={18} />
              <span>Code Generation</span>
            </TabsTrigger>
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <FileCode size={18} />
              <span>Code Analysis</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="generate" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3 text-center text-muted-foreground">
                <Terminal size={24} />
                <p>Generate code based on your requirements</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyze" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3 text-center text-muted-foreground">
                <FileCode size={24} />
                <p>Upload or input code for analysis</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeToolSelector;
