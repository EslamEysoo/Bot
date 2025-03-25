import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code, FileCode, Terminal, Zap } from "lucide-react";
import CodeToolSelector from "./CodeToolSelector";
import CodeEditor from "./CodeEditor";
import CodeExplanation from "./CodeExplanation";

interface CodeToolsProps {
  defaultTool?: "generate" | "analyze";
}

const CodeTools = ({ defaultTool = "generate" }: CodeToolsProps) => {
  const [activeTool, setActiveTool] = useState<"generate" | "analyze">(
    defaultTool,
  );
  const [code, setCode] = useState<string>(
    "// Enter your code here or generate code\n\nfunction example() {\n  console.log('Hello, cybersecurity world!');\n}\n\nexample();",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [generationPrompt, setGenerationPrompt] = useState(
    "Write a function that scans a network for open ports",
  );

  const handleToolChange = (tool: "generate" | "analyze") => {
    setActiveTool(tool);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleGenerationPromptChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setGenerationPrompt(e.target.value);
  };

  const handleGenerateCode = () => {
    setIsProcessing(true);
    // Simulate API call with timeout
    setTimeout(() => {
      const generatedCode = `// Generated code based on prompt: ${generationPrompt}\n\nfunction scanNetwork(ipRange, portRange) {\n  console.log(\`Scanning network range ${ipRange} for ports ${portRange}\`);\n  \n  // Simulated scan results\n  const results = {\n    '192.168.1.1': [22, 80, 443],\n    '192.168.1.5': [21, 22, 3389],\n    '192.168.1.10': [80, 443, 8080]\n  };\n  \n  return results;\n}\n\n// Example usage\nconst openPorts = scanNetwork('192.168.1.0/24', '1-65535');\nconsole.log('Scan complete. Open ports:', openPorts);`;

      setCode(generatedCode);
      setIsProcessing(false);
    }, 2000);
  };

  const handleRunCode = () => {
    setIsProcessing(true);
    // Simulate code execution
    setTimeout(() => {
      // In a real app, this would execute the code and show results
      setIsProcessing(false);
      // Show execution results in a toast or console output area
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-white dark:bg-slate-950 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">Code Tools</h1>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Zap className="h-4 w-4" />
          AI Assistant
        </Button>
      </div>

      <Separator className="my-2" />

      <CodeToolSelector
        onToolChange={handleToolChange}
        defaultTool={defaultTool}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow">
        <div className="flex flex-col gap-4">
          {activeTool === "generate" && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Code Generation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <textarea
                    value={generationPrompt}
                    onChange={handleGenerationPromptChange}
                    className="w-full min-h-[100px] p-3 border rounded-md resize-none"
                    placeholder="Describe the code you want to generate..."
                  />
                  <Button
                    onClick={handleGenerateCode}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isProcessing ? "Generating..." : "Generate Code"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex-grow">
            <CodeEditor
              code={code}
              onCodeChange={handleCodeChange}
              onRun={handleRunCode}
            />
          </div>
        </div>

        <div className="flex-grow">
          <CodeExplanation
            code={code}
            explanation={
              activeTool === "generate"
                ? "This code demonstrates a network scanning function that checks for open ports within a specified IP range."
                : "Analysis of the provided code shows a basic function structure with console output."
            }
            language="JavaScript"
            complexity={activeTool === "generate" ? "Medium" : "Low"}
            sections={[
              {
                title: "Function Purpose",
                content:
                  activeTool === "generate"
                    ? "The scanNetwork function is designed to scan a network range for open ports, returning a mapping of IP addresses to their open ports."
                    : "The example function demonstrates basic console logging functionality.",
                type: "explanation",
              },
              {
                title: "Security Implications",
                content:
                  activeTool === "generate"
                    ? "Port scanning may be regulated or prohibited on networks you don't own. Always ensure you have proper authorization before scanning."
                    : "This code has minimal security implications as it only outputs to the console.",
                type: "warning",
              },
              {
                title: "Example Usage",
                content:
                  activeTool === "generate"
                    ? "const results = scanNetwork('10.0.0.0/24', '1-1024');"
                    : "example(); // Outputs 'Hello, cybersecurity world!' to console",
                type: "example",
              },
              {
                title: "Optimization Tip",
                content:
                  activeTool === "generate"
                    ? "For production use, consider implementing parallel scanning to improve performance on large networks."
                    : "Consider adding error handling for more robust code.",
                type: "tip",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeTools;
