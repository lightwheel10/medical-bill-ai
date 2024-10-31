"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onSendMessage: (message: string) => Promise<void>;
  messages: Message[];
  isLoading: boolean;
}

export function ChatInterface({ onSendMessage, messages, isLoading }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const message = input;
    setInput('');
    await onSendMessage(message);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-400px)] md:h-[600px]">
      {/* Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto custom-scrollbar p-3 md:p-4 space-y-4 md:space-y-6"
      >
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.3
              }}
              className={`flex items-start gap-2 md:gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div 
                className={`w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center ${
                  message.role === 'assistant' 
                    ? 'bg-blue-500/20 border border-blue-500/30' 
                    : 'bg-purple-500/20 border border-purple-500/30'
                }`}
              >
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-blue-200" />
                ) : (
                  <User className="w-4 h-4 md:w-5 md:h-5 text-purple-200" />
                )}
              </div>

              {/* Message Bubble */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className={`max-w-[80%] md:max-w-[85%] rounded-lg px-3 py-2 md:px-4 md:py-2 ${
                  message.role === 'user'
                    ? 'bg-purple-500/20 border border-purple-500/30'
                    : 'bg-blue-500/20 border border-blue-500/30'
                }`}
              >
                <p className="text-sm md:text-base text-white/90 break-words leading-relaxed">
                  {message.content}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 md:gap-3"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden flex-shrink-0 bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 md:w-5 md:h-5 text-blue-200" />
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-2 md:px-4">
              <div className="flex gap-1.5 md:gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 md:p-4 border-t border-white/10 bg-gray-900/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your bill..."
            className="flex-1 bg-white/5 border-white/10 text-white text-sm md:text-base h-9 md:h-10"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 flex-shrink-0 transition-colors h-9 md:h-10 px-3 md:px-4"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
            ) : (
              <Send className="h-4 w-4 md:h-5 md:w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
} 