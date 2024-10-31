"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { marked } from 'marked';
import { ChatInterface } from "@/components/chat-interface";
import { chatWithBill } from "@/lib/gemini";

export default function ResultPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<{ imageData: string; analysis: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: "I've analyzed your medical bill. How can I help you understand it better? Feel free to ask any questions about the charges, services, or insurance details."
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!data) return;
    
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsChatLoading(true);
    
    try {
      const response = await chatWithBill(message, data.imageData, data.analysis);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsChatLoading(false);
    }
  };

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`/api/analysis?id=${params.id}`);
        if (!response.ok) {
          throw new Error('Analysis not found');
        }
        const analysisData = await response.json();
        setData(analysisData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analysis');
        setTimeout(() => router.push('/'), 2000);
      }
    };

    fetchAnalysis();
  }, [params.id, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white flex items-center justify-center">
        <Card className="p-6 bg-red-950/50 border-red-500/30 text-red-200">
          <p>{error}</p>
          <p className="text-sm mt-2">Redirecting to home...</p>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  const formattedAnalysis = data.analysis ? marked(data.analysis) : '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-4 md:mb-8 flex-shrink-0">
            <Button
              variant="ghost"
              className="text-white/80 transition-all hover:text-white hover:bg-transparent hover:translate-y-[-2px]"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Upload
            </Button>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400">
              Bill Analysis Results
            </h1>
          </div>

          {/* Main content area */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Bill Image Preview */}
            <Card className="md:w-[400px] flex-shrink-0 bg-white/10 backdrop-blur-sm border-gray-700/50 p-4 h-[200px] md:h-auto">
              <div className="relative h-full md:h-[600px] rounded-lg overflow-hidden border-2 border-white/30">
                <img
                  src={data?.imageData}
                  alt="Medical Bill"
                  className="h-full w-full object-contain"
                />
              </div>
            </Card>

            {/* Analysis/Chat Card */}
            <Card className="flex-1 bg-white/10 backdrop-blur-sm border-gray-700/50 flex flex-col">
              <div className="flex justify-between items-center p-3 md:p-4 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">Analysis Result</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300"
                  onClick={() => setShowChat(!showChat)}
                >
                  {showChat ? 'View Analysis' : 'Have Questions?'}
                </Button>
              </div>
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {showChat ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ChatInterface
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        isLoading={isChatLoading}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-[calc(100vh-400px)] md:h-[600px] overflow-y-auto custom-scrollbar"
                    >
                      <div className="p-4 md:p-6">
                        <div className="prose prose-invert prose-custom max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: formattedAnalysis }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8 mt-8 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent" />
          <div className="max-w-5xl mx-auto px-8 flex items-center justify-between text-sm text-gray-400 relative">
            <p>© 2024 Medical Bill Analysis. All rights reserved.</p>
            <a 
              href="https://github.com/yourusername/medical-bill-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
} 