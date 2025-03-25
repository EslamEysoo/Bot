import React, { useState } from "react";
import ToolSelector from "./ToolSelector";
import ToolConfiguration from "./ToolConfiguration";
import ResultsDisplay from "./ResultsDisplay";
import { Shield } from "lucide-react";

type SecurityToolType =
  | "network-scanner"
  | "vulnerability-assessment"
  | "security-recommendations"
  | "malware-scanner"
  | "password-audit"
  | "port-scanner";

interface ScanResult {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  details: string;
}

interface SecurityToolsProps {
  initialToolId?: SecurityToolType;
  isScanning?: boolean;
}

const SecurityTools = ({
  initialToolId = "network-scanner",
  isScanning = false,
}: SecurityToolsProps) => {
  const [selectedToolId, setSelectedToolId] =
    useState<SecurityToolType>(initialToolId);
  const [scanning, setScanning] = useState<boolean>(isScanning);
  const [scanConfig, setScanConfig] = useState<any>({});
  const [scanResults, setScanResults] = useState<ScanResult[] | null>(null);
  const [scanInfo, setScanInfo] = useState({
    scanType: "",
    scanDate: "",
    scanDuration: "",
    totalIssues: 0,
  });

  const handleToolSelect = (toolId: string) => {
    setSelectedToolId(toolId as SecurityToolType);
    setScanResults(null);
  };

  const handleConfigChange = (config: any) => {
    setScanConfig(config);
  };

  const handleExecuteScan = () => {
    setScanning(true);

    // Simulate scan process with timeout
    setTimeout(() => {
      // Generate mock results based on the selected tool
      const mockResults = generateMockResults(selectedToolId);
      setScanResults(mockResults);

      // Set scan information
      setScanInfo({
        scanType: getToolName(selectedToolId),
        scanDate: new Date().toLocaleString(),
        scanDuration: `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`,
        totalIssues: mockResults.length,
      });

      setScanning(false);
    }, 3000);
  };

  const getToolName = (toolId: SecurityToolType): string => {
    const toolNames: Record<SecurityToolType, string> = {
      "network-scanner": "Network Scan",
      "vulnerability-assessment": "Vulnerability Assessment",
      "security-recommendations": "Security Recommendations",
      "malware-scanner": "Malware Scan",
      "password-audit": "Password Audit",
      "port-scanner": "Port Scan",
    };
    return toolNames[toolId] || "Security Scan";
  };

  const generateMockResults = (toolId: SecurityToolType): ScanResult[] => {
    // Different mock results based on tool type
    switch (toolId) {
      case "network-scanner":
        return [
          {
            id: "1",
            title: "Unprotected Wi-Fi Network",
            description: "Your Wi-Fi network is using outdated WEP encryption.",
            severity: "high",
            details:
              "WEP encryption can be easily cracked. Recommend upgrading to WPA3 encryption for better security.",
          },
          {
            id: "2",
            title: "Unauthorized Device",
            description: "Unknown device detected on your network.",
            severity: "medium",
            details:
              "MAC Address: 00:1A:2B:3C:4D:5E, IP: 192.168.1.45. This device is not in your recognized devices list.",
          },
          {
            id: "3",
            title: "Router Firmware Outdated",
            description: "Your router is running outdated firmware.",
            severity: "medium",
            details:
              "Current version: 1.2.3, Latest available: 2.0.1. Update to patch known security vulnerabilities.",
          },
        ];

      case "vulnerability-assessment":
        return [
          {
            id: "1",
            title: "Critical OS Vulnerability",
            description:
              "Your operating system has an unpatched critical vulnerability.",
            severity: "critical",
            details:
              "CVE-2023-1234: Remote code execution vulnerability in system component. Update your system immediately.",
          },
          {
            id: "2",
            title: "Outdated Browser",
            description:
              "Your web browser is outdated and contains security vulnerabilities.",
            severity: "high",
            details:
              "Current version is 6 months old with 12 known security issues. Update to the latest version.",
          },
          {
            id: "3",
            title: "Insecure Application",
            description: "An installed application has known security issues.",
            severity: "medium",
            details:
              'Application "MediaPlayer Pro" version 2.1.5 has 3 known vulnerabilities. Update to version 2.2.0 or higher.',
          },
          {
            id: "4",
            title: "Missing Security Patches",
            description: "Several security patches have not been applied.",
            severity: "high",
            details:
              "7 security patches released in the last 30 days have not been applied to your system.",
          },
        ];

      case "security-recommendations":
        return [
          {
            id: "1",
            title: "Enable Two-Factor Authentication",
            description:
              "Two-factor authentication is not enabled for critical accounts.",
            severity: "high",
            details:
              "Enable 2FA on your email, banking, and social media accounts to significantly improve security.",
          },
          {
            id: "2",
            title: "Create Data Backup",
            description: "No recent data backup detected.",
            severity: "medium",
            details:
              "Implement a regular backup strategy with both local and cloud backups to protect against data loss.",
          },
          {
            id: "3",
            title: "Use a Password Manager",
            description: "Password reuse detected across multiple services.",
            severity: "medium",
            details:
              "Utilize a password manager to generate and store unique, strong passwords for each service.",
          },
          {
            id: "4",
            title: "Update Privacy Settings",
            description:
              "Default privacy settings detected on social media accounts.",
            severity: "low",
            details:
              "Review and restrict privacy settings on your social media profiles to limit data exposure.",
          },
          {
            id: "5",
            title: "Install Antivirus Software",
            description: "No active antivirus protection detected.",
            severity: "high",
            details:
              "Install reputable antivirus software to protect against malware and other threats.",
          },
        ];

      default:
        return [
          {
            id: "1",
            title: "Security Issue Detected",
            description:
              "A potential security issue was found during the scan.",
            severity: "medium",
            details:
              "Review the details and take appropriate action to address this security concern.",
          },
        ];
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 p-4 space-y-4">
      <div className="flex items-center space-x-2 mb-2">
        <Shield className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold">Security Tools</h1>
      </div>

      <ToolSelector
        onSelectTool={handleToolSelect}
        selectedToolId={selectedToolId}
      />

      <div className="flex-1 flex flex-col space-y-4">
        {!scanResults && (
          <ToolConfiguration
            toolType={selectedToolId as any}
            onConfigChange={handleConfigChange}
            onExecute={handleExecuteScan}
          />
        )}

        {scanning && (
          <div className="flex-1 flex items-center justify-center bg-white rounded-lg shadow p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-medium mb-2">
                Scanning in progress...
              </h3>
              <p className="text-gray-500">
                Running {getToolName(selectedToolId)}
              </p>
              <p className="text-sm text-gray-400 mt-4">
                This may take a few moments
              </p>
            </div>
          </div>
        )}

        {!scanning && scanResults && (
          <ResultsDisplay
            results={scanResults}
            scanType={scanInfo.scanType}
            scanDate={scanInfo.scanDate}
            scanDuration={scanInfo.scanDuration}
            totalIssues={scanInfo.totalIssues}
            onSave={() => console.log("Saving results...")}
            onShare={() => console.log("Sharing results...")}
          />
        )}
      </div>
    </div>
  );
};

export default SecurityTools;
