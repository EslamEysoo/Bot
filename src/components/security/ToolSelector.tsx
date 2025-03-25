import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Shield,
  Wifi,
  FileWarning,
  ShieldAlert,
  Lock,
  Search,
} from "lucide-react";

interface SecurityTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface ToolSelectorProps {
  onSelectTool?: (toolId: string) => void;
  selectedToolId?: string;
}

const ToolSelector = ({
  onSelectTool = () => {},
  selectedToolId = "network-scanner",
}: ToolSelectorProps) => {
  const securityTools: SecurityTool[] = [
    {
      id: "network-scanner",
      name: "Network Scanner",
      description:
        "Scan your network for connected devices and potential vulnerabilities",
      icon: <Wifi className="h-6 w-6" />,
    },
    {
      id: "vulnerability-assessment",
      name: "Vulnerability Assessment",
      description:
        "Identify security weaknesses in your systems and applications",
      icon: <ShieldAlert className="h-6 w-6" />,
    },
    {
      id: "security-recommendations",
      name: "Security Recommendations",
      description:
        "Get personalized security advice based on your current setup",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      id: "malware-scanner",
      name: "Malware Scanner",
      description: "Scan files and systems for potential malware and threats",
      icon: <FileWarning className="h-6 w-6" />,
    },
    {
      id: "password-audit",
      name: "Password Audit",
      description:
        "Check password strength and identify potential security risks",
      icon: <Lock className="h-6 w-6" />,
    },
    {
      id: "port-scanner",
      name: "Port Scanner",
      description: "Scan for open ports and services on your network",
      icon: <Search className="h-6 w-6" />,
    },
  ];

  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Security Tools</h2>
      <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-hide">
        <TooltipProvider>
          {securityTools.map((tool) => (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedToolId === tool.id ? "default" : "outline"}
                  className={`flex-shrink-0 flex flex-col items-center justify-center h-24 w-32 gap-2 ${selectedToolId === tool.id ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800 hover:bg-gray-700"}`}
                  onClick={() => onSelectTool(tool.id)}
                >
                  <div className="text-white">{tool.icon}</div>
                  <span className="text-xs text-white">{tool.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{tool.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ToolSelector;
