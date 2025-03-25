import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Code, FileCode, Info, Terminal } from "lucide-react";

interface CodeExplanationProps {
  code?: string;
  explanation?: string;
  language?: string;
  complexity?: "Low" | "Medium" | "High";
  sections?: {
    title: string;
    content: string;
    type: "explanation" | "example" | "warning" | "tip";
  }[];
}

const CodeExplanation = ({
  code = "function example() {\n  // This is a sample function\n  console.log('Hello, world!');\n  return true;\n}",
  explanation = "This is a simple JavaScript function that logs 'Hello, world!' to the console and returns true.",
  language = "JavaScript",
  complexity = "Low",
  sections = [
    {
      title: "Function Declaration",
      content:
        "The function is declared using the 'function' keyword followed by the name 'example'.",
      type: "explanation",
    },
    {
      title: "Console Output",
      content:
        "The function uses console.log() to output a string to the console.",
      type: "explanation",
    },
    {
      title: "Example Usage",
      content: "const result = example(); // result will be true",
      type: "example",
    },
    {
      title: "Best Practice",
      content:
        "Consider adding JSDoc comments to document the function's purpose and return value.",
      type: "tip",
    },
  ],
}: CodeExplanationProps) => {
  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-900 p-4">
      <Card className="w-full h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            Code Explanation
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
            >
              {language}
            </Badge>
            <Badge
              variant="outline"
              className={`
                ${complexity === "Low" ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100" : ""}
                ${complexity === "Medium" ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100" : ""}
                ${complexity === "High" ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100" : ""}
              `}
            >
              {complexity} Complexity
            </Badge>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4 pb-0">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-6">
              {/* Main explanation */}
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5" />
                  Overview
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  {explanation}
                </p>
              </div>

              {/* Code preview */}
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                  <Code className="h-5 w-5" />
                  Code Sample
                </h3>
                <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto">
                  <code>{code}</code>
                </pre>
              </div>

              {/* Detailed sections */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Detailed Analysis
                </h3>

                {sections.map((section, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getBackgroundColorByType(section.type)}`}
                  >
                    <h4 className="font-medium mb-2">{section.title}</h4>
                    <p className="text-slate-700 dark:text-slate-300">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

const getBackgroundColorByType = (type: string) => {
  switch (type) {
    case "explanation":
      return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800";
    case "example":
      return "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800";
    case "warning":
      return "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800";
    case "tip":
      return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
    default:
      return "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800";
  }
};

export default CodeExplanation;
