import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import {
  Share2,
  Download,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
  FileText,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ResultItem {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  details: string;
}

interface ResultsDisplayProps {
  results: ResultItem[];
  scanType: string;
  scanDate: string;
  scanDuration: string;
  totalIssues: number;
  onSave?: () => void;
  onShare?: () => void;
}

const ResultsDisplay = ({
  results = [
    {
      id: "1",
      title: "Outdated SSL Certificate",
      description:
        "The SSL certificate is using an outdated encryption algorithm.",
      severity: "high",
      details:
        "The server is using TLS 1.0 which has known vulnerabilities. Recommend upgrading to TLS 1.3.",
    },
    {
      id: "2",
      title: "Open Port 22 (SSH)",
      description: "SSH port is open and accessible from public networks.",
      severity: "medium",
      details:
        "SSH service is running on default port and accessible from any IP. Consider restricting access using firewall rules.",
    },
    {
      id: "3",
      title: "Missing HTTP Security Headers",
      description: "Several recommended security headers are not implemented.",
      severity: "medium",
      details:
        "The following headers are missing: X-Content-Type-Options, X-Frame-Options, Content-Security-Policy.",
    },
    {
      id: "4",
      title: "Default Admin Credentials",
      description: "Default administrator credentials were detected.",
      severity: "critical",
      details:
        "The system is using default administrator credentials which poses a significant security risk. Change these immediately.",
    },
    {
      id: "5",
      title: "Information Disclosure",
      description: "Server is revealing version information in HTTP headers.",
      severity: "low",
      details:
        "HTTP response headers contain detailed server version information which could aid attackers.",
    },
  ],
  scanType = "Network Vulnerability Scan",
  scanDate = "2023-06-15 14:30:22",
  scanDuration = "3m 45s",
  totalIssues = 5,
  onSave = () => console.log("Saving results..."),
  onShare = () => console.log("Sharing results..."),
}: ResultsDisplayProps) => {
  const [selectedResult, setSelectedResult] = useState<ResultItem | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600 text-white";
      case "high":
        return "bg-orange-500 text-white";
      case "medium":
        return "bg-yellow-500 text-black";
      case "low":
        return "bg-blue-500 text-white";
      case "info":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4" />;
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      case "medium":
        return <Info className="h-4 w-4" />;
      case "low":
        return <Info className="h-4 w-4" />;
      case "info":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full h-full bg-background p-4">
      <Card className="w-full h-full">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                {scanType} Results
              </CardTitle>
              <CardDescription>
                Scan completed on {scanDate} • Duration: {scanDuration}
              </CardDescription>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              {totalIssues} issues found
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="list" className="w-full">
            <div className="px-6 pt-2">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="list">Issues List</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="list" className="mt-0 p-0">
              <ScrollArea className="h-[280px] px-6">
                <div className="space-y-2 py-2">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className={`p-3 rounded-md border cursor-pointer hover:bg-accent/50 transition-colors ${selectedResult?.id === result.id ? "bg-accent" : ""}`}
                      onClick={() => setSelectedResult(result)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{result.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {result.description}
                          </p>
                        </div>
                        <Badge
                          className={`${getSeverityColor(result.severity)} ml-2`}
                        >
                          <span className="flex items-center gap-1">
                            {getSeverityIcon(result.severity)}
                            {result.severity.charAt(0).toUpperCase() +
                              result.severity.slice(1)}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="details" className="mt-0 p-0">
              <div className="px-6 py-4 h-[280px]">
                {selectedResult ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-lg font-semibold">
                        {selectedResult.title}
                      </h2>
                      <Badge
                        className={getSeverityColor(selectedResult.severity)}
                      >
                        <span className="flex items-center gap-1">
                          {getSeverityIcon(selectedResult.severity)}
                          {selectedResult.severity.charAt(0).toUpperCase() +
                            selectedResult.severity.slice(1)}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {selectedResult.description}
                    </p>
                    <div className="bg-accent/50 p-3 rounded-md">
                      <h3 className="text-sm font-medium mb-1">
                        Technical Details:
                      </h3>
                      <p className="text-sm">{selectedResult.details}</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center flex-col text-center text-muted-foreground">
                    <Info className="h-12 w-12 mb-2 opacity-20" />
                    <p>Select an issue from the list to view details</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Powered by AI Cybersecurity Assistant
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={onSave}>
                    <Download className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save results as PDF or JSON</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="default" size="sm" onClick={onShare}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share results with your team</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
