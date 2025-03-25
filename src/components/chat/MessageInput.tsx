import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Paperclip, Send, Mic, Loader } from "lucide-react";

interface MessageInputProps {
  onSendMessage?: (message: string) => void;
  isProcessing?: boolean;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage = () => {},
  isProcessing = false,
  placeholder = "Type your message here...",
}) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop voice recording
  };

  return (
    <div className="flex flex-col w-full p-4 border-t bg-background">
      <div className="flex items-center gap-2 mb-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label="Attach file"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          className="rounded-full"
          onClick={toggleRecording}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
          <Mic className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[60px] resize-none"
          disabled={isProcessing}
        />
        <Button
          onClick={handleSendMessage}
          disabled={!message.trim() || isProcessing}
          className="h-[60px] w-[60px] rounded-full"
          aria-label="Send message"
        >
          {isProcessing ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>

      {isProcessing && (
        <div className="text-xs text-muted-foreground mt-2 text-center animate-pulse">
          AI assistant is processing your request...
        </div>
      )}
    </div>
  );
};

export default MessageInput;
