import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Wifi, WifiOff, Bot, Shield, Settings } from "lucide-react";

interface HeaderProps {
  title?: string;
  isConnected?: boolean;
  avatarState?: "idle" | "processing" | "speaking";
  onSettingsClick?: () => void;
}

const Header = ({
  title = "AI Cybersecurity Assistant",
  isConnected = true,
  avatarState = "idle",
  onSettingsClick = () => {},
}: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold">{title}</h1>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="mr-2">{currentTime}</span>
            {isConnected ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <Wifi className="w-3 h-3 text-green-500 mr-1" />
                      <span>Connected</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Internet connection active</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <WifiOff className="w-3 h-3 text-destructive mr-1" />
                      <span>Offline</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>No internet connection</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    avatarState === "idle" && "bg-slate-200",
                    avatarState === "processing" &&
                      "bg-amber-200 animate-pulse",
                    avatarState === "speaking" && "bg-green-200 animate-pulse",
                  )}
                >
                  <Bot
                    className={cn(
                      "w-6 h-6",
                      avatarState === "idle" && "text-slate-700",
                      avatarState === "processing" && "text-amber-700",
                      avatarState === "speaking" && "text-green-700",
                    )}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Robot Status: {avatarState}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button variant="ghost" size="icon" onClick={onSettingsClick}>
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
