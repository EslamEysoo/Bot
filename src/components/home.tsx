import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./layout/Header";
import Navigation from "./layout/Navigation";
import RobotAvatar from "./home/RobotAvatar";
import ChatInterface from "./chat/ChatInterface";
import SecurityTools from "./security/SecurityTools";
import CodeTools from "./code/CodeTools";
import TaskAutomation from "./tasks/TaskAutomation";
import Settings from "./settings/Settings";
import { Button } from "./ui/button";
import { MessageSquare, Shield, Code, Clock, Zap } from "lucide-react";

const Home = () => {
  const [robotState, setRobotState] = useState<
    "idle" | "processing" | "speaking"
  >("idle");
  const [isConnected, setIsConnected] = useState(true);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate connection status changes
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      // 95% chance to stay connected, 5% chance to disconnect
      if (Math.random() > 0.95) {
        setIsConnected((prev) => !prev);
      }
    }, 30000);

    return () => clearInterval(connectionInterval);
  }, []);

  const handleFeatureSelect = (feature: string) => {
    setRobotState("processing");
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setActiveFeature(feature);
      setRobotState("idle");
      setIsProcessing(false);
    }, 1000);
  };

  const handleSendMessage = (message: string) => {
    setRobotState("processing");
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      setRobotState("speaking");

      // Simulate speaking completion
      setTimeout(() => {
        setRobotState("idle");
        setIsProcessing(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <Header avatarState={robotState} isConnected={isConnected} />

      <main className="flex-1 flex flex-col items-center justify-start pt-24 pb-20 px-4 overflow-y-auto">
        {!activeFeature ? (
          <div className="w-full max-w-4xl flex flex-col items-center space-y-8 mt-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <RobotAvatar state={robotState} isConnected={isConnected} />
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl font-bold text-center mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              AI Cybersecurity Assistant
            </motion.h1>

            <motion.p
              className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Your advanced AI robot with cybersecurity and programming
              capabilities. Ask me anything or use the specialized tools below.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <FeatureCard
                title="Chat Interface"
                description="Talk with your AI assistant about any topic"
                icon={<MessageSquare className="h-8 w-8 text-blue-500" />}
                onClick={() => handleFeatureSelect("chat")}
              />

              <FeatureCard
                title="Security Tools"
                description="Scan networks, assess vulnerabilities, get recommendations"
                icon={<Shield className="h-8 w-8 text-green-500" />}
                onClick={() => handleFeatureSelect("security")}
              />

              <FeatureCard
                title="Code Tools"
                description="Generate and analyze code with AI assistance"
                icon={<Code className="h-8 w-8 text-purple-500" />}
                onClick={() => handleFeatureSelect("code")}
              />

              <FeatureCard
                title="Task Automation"
                description="Schedule and automate security and programming tasks"
                icon={<Clock className="h-8 w-8 text-amber-500" />}
                onClick={() => handleFeatureSelect("tasks")}
              />
            </motion.div>

            <motion.div
              className="mt-8 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div
                className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {isConnected
                  ? "Connected to cloud services"
                  : "Operating in offline mode"}
              </span>
            </motion.div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full max-w-6xl"
            >
              {activeFeature === "chat" && (
                <ChatInterface
                  robotState={robotState}
                  onSendMessage={handleSendMessage}
                  isProcessing={isProcessing}
                />
              )}

              {activeFeature === "security" && (
                <SecurityTools isScanning={isProcessing} />
              )}

              {activeFeature === "code" && <CodeTools />}

              {activeFeature === "tasks" && <TaskAutomation />}

              {activeFeature === "settings" && <Settings />}

              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setActiveFeature(null)}
                  className="flex items-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <Navigation />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const FeatureCard = ({
  title,
  description,
  icon,
  onClick,
}: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
      onClick={onClick}
    >
      <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </motion.div>
  );
};

export default Home;
