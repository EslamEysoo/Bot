import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Code, Zap, AlertCircle, Wifi, WifiOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface RobotAvatarProps {
  state?: "idle" | "processing" | "speaking";
  isConnected?: boolean;
}

const RobotAvatar = ({
  state = "idle",
  isConnected = true,
}: RobotAvatarProps) => {
  const [animationKey, setAnimationKey] = useState(0);

  // Trigger animation restart when state changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [state]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-xl w-full max-w-[300px] h-[300px]">
      {/* Robot Head */}
      <motion.div
        key={animationKey}
        className="relative w-40 h-40 bg-gradient-to-b from-slate-700 to-slate-800 rounded-2xl shadow-lg border-2 border-slate-600"
        initial={{ scale: 0.9 }}
        animate={{
          scale:
            state === "idle"
              ? [0.95, 1]
              : state === "processing"
                ? [0.9, 1.05, 0.9]
                : [0.95, 1.05, 0.95],
          rotate: state === "processing" ? [-2, 2, -2] : 0,
        }}
        transition={{
          duration: state === "idle" ? 2 : 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        {/* Robot Eyes */}
        <div className="absolute top-6 left-0 w-full flex justify-around">
          <motion.div
            className="w-10 h-3 rounded-full"
            style={{
              background:
                state === "idle"
                  ? "#4ADE80"
                  : state === "processing"
                    ? "#FB923C"
                    : "#60A5FA",
            }}
            animate={{
              opacity: state === "processing" ? [0.6, 1, 0.6] : 1,
              width:
                state === "speaking"
                  ? ["2.5rem", "1.5rem", "2.5rem"]
                  : "2.5rem",
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="w-10 h-3 rounded-full"
            style={{
              background:
                state === "idle"
                  ? "#4ADE80"
                  : state === "processing"
                    ? "#FB923C"
                    : "#60A5FA",
            }}
            animate={{
              opacity: state === "processing" ? [1, 0.6, 1] : 1,
              width:
                state === "speaking"
                  ? ["1.5rem", "2.5rem", "1.5rem"]
                  : "2.5rem",
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Robot Mouth */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-md"
          style={{
            background:
              state === "idle"
                ? "#4ADE80"
                : state === "processing"
                  ? "#FB923C"
                  : "#60A5FA",
            height: "0.5rem",
          }}
          animate={{
            width: state === "speaking" ? ["1rem", "2rem", "1rem"] : "1.5rem",
            opacity: state === "processing" ? [0.7, 1, 0.7] : 1,
          }}
          transition={{
            duration: state === "speaking" ? 0.3 : 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Antenna */}
        <motion.div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-slate-600"
          animate={{
            rotateZ: state === "processing" ? [-5, 5, -5] : 0,
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              background: isConnected ? "#4ADE80" : "#EF4444",
            }}
            animate={{
              opacity: isConnected ? 1 : [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Status Indicators */}
      <div className="mt-6 flex space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="p-2 rounded-full bg-slate-800">
                {isConnected ? (
                  <Wifi className="w-5 h-5 text-green-400" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-400" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isConnected ? "Connected" : "Offline"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="p-2 rounded-full bg-slate-800">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Security Module Active</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="p-2 rounded-full bg-slate-800">
                <Code className="w-5 h-5 text-purple-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Code Analysis Ready</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="p-2 rounded-full bg-slate-800">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Task Automation Ready</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default RobotAvatar;
