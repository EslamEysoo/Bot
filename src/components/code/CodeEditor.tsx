import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Play, Upload } from "lucide-react";

interface CodeEditorProps {
  code?: string;
  language?: string;
  readOnly?: boolean;
  onCodeChange?: (code: string) => void;
  onRun?: () => void;
}

const CodeEditor = ({
  code = "// Enter your code here or generate code\n\nfunction example() {\n  console.log('Hello, cybersecurity world!');\n}\n\nexample();",
  language = "javascript",
  readOnly = false,
  onCodeChange = () => {},
  onRun = () => {},
}: CodeEditorProps) => {
  const [currentCode, setCurrentCode] = useState(code);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentCode(e.target.value);
    onCodeChange(e.target.value);
  };

  const handleLanguageChange = (value: string) => {
    setCurrentLanguage(value);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    // In a real app, you would show a toast notification here
  };

  const handleDownloadCode = () => {
    const blob = new Blob([currentCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${currentLanguage}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUploadCode = () => {
    // In a real app, this would open a file picker
    // For now, we'll just simulate it with a placeholder
    const sampleCode =
      "// Uploaded code would appear here\n\nfunction uploadedExample() {\n  console.log('This is uploaded code');\n}";
    setCurrentCode(sampleCode);
    onCodeChange(sampleCode);
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-900 rounded-md overflow-hidden border border-slate-700">
      <div className="flex items-center justify-between p-2 bg-slate-800 border-b border-slate-700">
        <Tabs
          defaultValue="javascript"
          onValueChange={handleLanguageChange}
          className="w-auto"
        >
          <TabsList className="bg-slate-700">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="bash">Bash</TabsTrigger>
            <TabsTrigger value="sql">SQL</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyCode}
            title="Copy code"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownloadCode}
            title="Download code"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleUploadCode}
            title="Upload code"
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onRun}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play className="h-4 w-4 mr-1" /> Run
          </Button>
        </div>
      </div>

      <div className="relative flex-grow">
        <Textarea
          value={currentCode}
          onChange={handleCodeChange}
          className={cn(
            "font-mono text-sm w-full h-full min-h-[350px] p-4 resize-none bg-slate-900 text-slate-50",
            "border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            "scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900",
          )}
          placeholder="Enter your code here..."
          readOnly={readOnly}
          spellCheck={false}
        />
        <div className="absolute top-0 left-0 w-10 h-full bg-slate-800 border-r border-slate-700 hidden md:block">
          {/* Line numbers would go here in a real code editor */}
          {currentCode.split("\n").map((_, i) => (
            <div key={i} className="text-xs text-slate-500 text-right pr-2">
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 bg-slate-800 border-t border-slate-700 text-xs text-slate-400">
        {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)} •{" "}
        {currentCode.split("\n").length} lines
      </div>
    </div>
  );
};

export default CodeEditor;
