import React from "react";
import { Avatar } from "../../components/ui/avatar";
import { AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Badge } from "../../components/ui/badge";
import { Clock, Shield, Code, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  type?: "security" | "code" | "general";
}

interface MessageListProps {
  messages?: Message[];
  isLoading?: boolean;
}

const MessageList = ({
  messages = [
    {
      id: "1",
      content:
        "Hello! I'm your AI Cybersecurity Assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toISOString(),
      type: "general",
    },
    {
      id: "2",
      content: "Can you scan my network for vulnerabilities?",
      sender: "user",
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    },
    {
      id: "3",
      content:
        "I'll scan your network for potential security issues. This may take a few moments while I analyze your network configuration and check for common vulnerabilities.",
      sender: "ai",
      timestamp: new Date(Date.now() - 4 * 60000).toISOString(),
      type: "security",
    },
    {
      id: "4",
      content:
        "Can you help me write a Python script to automate file backups?",
      sender: "user",
      timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
    },
    {
      id: "5",
      content:
        "Here's a Python script for automated backups:\n```python\nimport shutil\nimport os\nfrom datetime import datetime\n\ndef backup_files(source_dir, backup_dir):\n    # Create timestamp for backup folder name\n    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')\n    backup_path = os.path.join(backup_dir, f'backup_{timestamp}')\n    \n    # Create backup directory if it doesn't exist\n    os.makedirs(backup_path)\n    \n    # Copy files from source to backup directory\n    for item in os.listdir(source_dir):\n        source_item = os.path.join(source_dir, item)\n        dest_item = os.path.join(backup_path, item)\n        if os.path.isfile(source_item):\n            shutil.copy2(source_item, dest_item)\n        elif os.path.isdir(source_item):\n            shutil.copytree(source_item, dest_item)\n    \n    print(f'Backup completed to {backup_path}')\n\n# Example usage\nsource_directory = '/path/to/source'\nbackup_directory = '/path/to/backups'\nbackup_files(source_directory, backup_directory)\n```\nYou can schedule this script to run automatically using cron jobs on Linux/Mac or Task Scheduler on Windows.",
      sender: "ai",
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      type: "code",
    },
  ],
  isLoading = false,
}: MessageListProps) => {
  // Format timestamp to readable format
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Get message type icon
  const getMessageTypeIcon = (type?: string) => {
    switch (type) {
      case "security":
        return <Shield className="h-3 w-3" />;
      case "code":
        return <Code className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-gray-900">
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {message.sender === "ai" && (
                  <div className="flex-shrink-0 mr-2">
                    <Avatar>
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/bottts/svg?seed=robot"
                        alt="AI Assistant"
                      />
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}
                {message.sender === "user" && (
                  <div className="flex-shrink-0 ml-2">
                    <Avatar>
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                        alt="User"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                )}
                <div
                  className={`rounded-lg p-4 ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={`flex items-center mt-2 text-xs ${message.sender === "user" ? "justify-start" : "justify-end"}`}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{formatTime(message.timestamp)}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{new Date(message.timestamp).toLocaleString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {message.type && (
                      <Badge variant="outline" className="ml-2 px-2 py-0 h-5">
                        <div className="flex items-center">
                          {getMessageTypeIcon(message.type)}
                          <span className="ml-1 capitalize">
                            {message.type}
                          </span>
                        </div>
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex flex-row">
                <div className="flex-shrink-0 mr-2">
                  <Avatar>
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/bottts/svg?seed=robot"
                      alt="AI Assistant"
                    />
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="rounded-lg p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageList;
