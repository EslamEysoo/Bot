import React, { useState } from "react";
import { Shield, Wifi, Server, AlertTriangle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ToolConfigurationProps {
  toolType?:
    | "network-scanner"
    | "vulnerability-assessment"
    | "security-recommendations";
  onConfigChange?: (config: any) => void;
  onExecute?: () => void;
}

const ToolConfiguration = ({
  toolType = "network-scanner",
  onConfigChange = () => {},
  onExecute = () => {},
}: ToolConfigurationProps) => {
  const [config, setConfig] = useState<any>(() => {
    // Default configurations based on tool type
    switch (toolType) {
      case "network-scanner":
        return {
          ipRange: "192.168.1.1/24",
          scanType: "quick",
          portRange: "1-1000",
        };
      case "vulnerability-assessment":
        return {
          target: "localhost",
          scanDepth: "standard",
          includePatches: true,
        };
      case "security-recommendations":
        return {
          systemType: "personal",
          threatLevel: "medium",
          includeRemediation: true,
        };
      default:
        return {};
    }
  });

  const handleChange = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const renderNetworkScannerConfig = () => (
    <div className="space-y-4 bg-slate-100 p-6 rounded-lg">
      <div className="flex items-center space-x-2 text-blue-600 mb-4">
        <Wifi className="h-6 w-6" />
        <h3 className="text-lg font-medium">Network Scanner Configuration</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ipRange">IP Range</Label>
        <Input
          id="ipRange"
          value={config.ipRange}
          onChange={(e) => handleChange("ipRange", e.target.value)}
          placeholder="e.g. 192.168.1.1/24"
        />
        <p className="text-xs text-gray-500">
          Specify the IP range to scan in CIDR notation
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="scanType">Scan Type</Label>
        <Select
          value={config.scanType}
          onValueChange={(value) => handleChange("scanType", value)}
        >
          <SelectTrigger id="scanType">
            <SelectValue placeholder="Select scan type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quick">Quick Scan</SelectItem>
            <SelectItem value="full">Full Scan</SelectItem>
            <SelectItem value="stealth">Stealth Scan</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          Quick scans are faster but less thorough
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="portRange">Port Range</Label>
        <Input
          id="portRange"
          value={config.portRange}
          onChange={(e) => handleChange("portRange", e.target.value)}
          placeholder="e.g. 1-1000"
        />
        <p className="text-xs text-gray-500">
          Specify port range to scan (e.g. 1-1000, 22,80,443)
        </p>
      </div>
    </div>
  );

  const renderVulnerabilityAssessmentConfig = () => (
    <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
      <div className="flex items-center space-x-2 text-amber-600 mb-4">
        <AlertTriangle className="h-6 w-6" />
        <h3 className="text-lg font-medium">
          Vulnerability Assessment Configuration
        </h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="target">Target System</Label>
        <Input
          id="target"
          value={config.target}
          onChange={(e) => handleChange("target", e.target.value)}
          placeholder="e.g. localhost, 192.168.1.5, example.com"
        />
        <p className="text-xs text-gray-500">
          IP address, hostname, or domain to assess
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="scanDepth">Scan Depth</Label>
        <Select
          value={config.scanDepth}
          onValueChange={(value) => handleChange("scanDepth", value)}
        >
          <SelectTrigger id="scanDepth">
            <SelectValue placeholder="Select scan depth" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="deep">Deep</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          Deeper scans take longer but find more vulnerabilities
        </p>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <input
          type="checkbox"
          id="includePatches"
          checked={config.includePatches}
          onChange={(e) => handleChange("includePatches", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <Label htmlFor="includePatches">Include patch recommendations</Label>
      </div>
    </div>
  );

  const renderSecurityRecommendationsConfig = () => (
    <div className="space-y-4 bg-green-50 p-6 rounded-lg">
      <div className="flex items-center space-x-2 text-green-600 mb-4">
        <Shield className="h-6 w-6" />
        <h3 className="text-lg font-medium">
          Security Recommendations Configuration
        </h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="systemType">System Type</Label>
        <Select
          value={config.systemType}
          onValueChange={(value) => handleChange("systemType", value)}
        >
          <SelectTrigger id="systemType">
            <SelectValue placeholder="Select system type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal Computer</SelectItem>
            <SelectItem value="server">Server</SelectItem>
            <SelectItem value="network">Network Infrastructure</SelectItem>
            <SelectItem value="mobile">Mobile Device</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="threatLevel">Threat Level Assessment</Label>
        <Select
          value={config.threatLevel}
          onValueChange={(value) => handleChange("threatLevel", value)}
        >
          <SelectTrigger id="threatLevel">
            <SelectValue placeholder="Select threat level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low (Basic Protection)</SelectItem>
            <SelectItem value="medium">Medium (Standard Protection)</SelectItem>
            <SelectItem value="high">High (Enhanced Protection)</SelectItem>
            <SelectItem value="critical">
              Critical (Maximum Protection)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <input
          type="checkbox"
          id="includeRemediation"
          checked={config.includeRemediation}
          onChange={(e) => handleChange("includeRemediation", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <Label htmlFor="includeRemediation">Include remediation steps</Label>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm border border-gray-200">
      {toolType === "network-scanner" && renderNetworkScannerConfig()}
      {toolType === "vulnerability-assessment" &&
        renderVulnerabilityAssessmentConfig()}
      {toolType === "security-recommendations" &&
        renderSecurityRecommendationsConfig()}

      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="outline" onClick={() => setConfig({})}>
          Reset
        </Button>
        <Button onClick={onExecute} className="flex items-center space-x-2">
          <Server className="h-4 w-4" />
          <span>Execute Scan</span>
        </Button>
      </div>
    </div>
  );
};

export default ToolConfiguration;
