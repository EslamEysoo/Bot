import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Bot, Shield, Code, Zap } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  type?: "security" | "code" | "general";
}

interface ChatInterfaceProps {
  robotState?: "idle" | "processing" | "speaking";
  onSendMessage?: (message: string) => void;
  messages?: Message[];
  isProcessing?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  robotState = "idle",
  onSendMessage = () => {},
  messages = [
    {
      id: "1",
      content:
        "Hello! I'm your AI Cybersecurity Assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toISOString(),
      type: "general",
    },
  ],
  isProcessing = false,
}) => {
  const [activeTab, setActiveTab] = useState<string>("chat");

  const handleSendMessage = (message: string) => {
    onSendMessage(message);
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 dark:bg-gray-900">
      <Tabs
        defaultValue="chat"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full flex flex-col"
      >
        <div className="bg-white dark:bg-gray-800 p-2 border-b">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Code</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="chat"
          className="flex-1 flex flex-col overflow-hidden m-0"
        >
          <div className="flex-1 overflow-hidden">
            <MessageList messages={messages} isLoading={isProcessing} />
          </div>
          <MessageInput
            onSendMessage={handleSendMessage}
            isProcessing={isProcessing}
            placeholder="Ask me anything..."
          />
        </TabsContent>

        <TabsContent
          value="security"
          className="flex-1 flex flex-col overflow-hidden m-0"
        >
          <div className="flex-1 overflow-hidden">
            <MessageList
              messages={messages.filter(
                (m) => m.type === "security" || m.sender === "user",
              )}
              isLoading={isProcessing && activeTab === "security"}
            />
          </div>
          <MessageInput
            onSendMessage={handleSendMessage}
            isProcessing={isProcessing}
            placeholder="Ask about security topics..."
          />
        </TabsContent>

        <TabsContent
          value="code"
          className="flex-1 flex flex-col overflow-hidden m-0"
        >
          <div className="flex-1 overflow-hidden">
            <MessageList
              messages={messages.filter(
                (m) => m.type === "code" || m.sender === "user",
              )}
              isLoading={isProcessing && activeTab === "code"}
            />
          </div>
          <MessageInput
            onSendMessage={handleSendMessage}
            isProcessing={isProcessing}
            placeholder="Ask for code help..."
          />
        </TabsContent>
      </Tabs>

      {/* Robot processing indicator */}
      {isProcessing && (
        <motion.div
          className="fixed bottom-24 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg flex items-center gap-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.8,
          }}
        >
          <Zap className="h-5 w-5" />
          <span className="text-sm font-medium">Processing</span>
        </motion.div>
      )}
    </div>
  );
};

export default ChatInterface;
