"use client";

import { useState } from "react";
import { BillUpload } from "@/components/bill-upload";
import { analyzeBillImage } from "@/lib/gemini";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Shield, Brain, Zap, ArrowRight, Github, MessageSquare, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProcessingView } from "@/components/processing-view";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "@/components/error-boundary";

export default function Home() {
  const router = useRouter();
  const [imageData, setImageData] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);

  const handleImageCapture = async (capturedImage: string) => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      const result = await analyzeBillImage(capturedImage);
      
      const response = await fetch('/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageData: capturedImage,
          analysis: result
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to store analysis');
      }
      
      const data = await response.json();
      
      if (!data.id) {
        throw new Error('Invalid response from server');
      }

      router.push(`/result/${data.id}`);
      
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze bill');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImageData(null);
    setAnalysis(null);
    setError(null);
  };

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning to extract and analyze medical bill information"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Smart Extraction", 
      description: "Automatically identifies charges, dates, and insurance details"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Interactive Chat",
      description: "Ask questions and get instant clarification about your medical bill"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Upload or Capture",
      description: "Upload an image of your medical bill or take a photo directly"
    },
    {
      number: "02", 
      title: "AI Processing",
      description: "Our AI analyzes the bill to extract key information"
    },
    {
      number: "03",
      title: "Review Results",
      description: "Get a detailed breakdown of charges, dates, and coverage"
    }
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <AnimatePresence>
          {isAnalyzing && !isProcessingComplete && (
            <ProcessingView isComplete={false} />
          )}
        </AnimatePresence>
        
        {/* Hero Section */}
        <motion.section 
          className="relative py-20 px-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-teal-900/30" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          
          <div className="relative max-w-5xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <div className="flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-teal-500/20 border border-purple-500/30">
                <Image 
                  src="/google.svg" 
                  alt="Google" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5"
                />
                Powered by Google AI
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Medical Bill Analysis
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Understand your medical bills instantly with AI-powered analysis
            </motion.p>

            {!isAnalyzing && !analysis && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <BillUpload onImageCapture={handleImageCapture} />
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="relative max-w-5xl mx-auto px-8 py-16 space-y-20">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none" />

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="p-6 bg-red-950/50 border-red-500/30 text-red-200 backdrop-blur-sm">
                <p>{error}</p>
              </Card>
            </motion.div>
          )}

          {analysis && imageData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="p-6 bg-white/10 backdrop-blur-sm">
                <div className="space-y-4">
                  <img src={imageData} alt="Uploaded bill" className="max-w-full rounded-lg" />
                  <div className="prose prose-invert">
                    <pre className="whitespace-pre-wrap">{analysis}</pre>
                  </div>
                  <Button onClick={handleReset}>Upload Another Bill</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* How it Works Section */}
          <section className="space-y-12">
            <motion.h2 
              className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-16 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-8 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/50 h-full backdrop-blur-sm">
                    <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-6">{step.number}</div>
                    <h3 className="text-2xl font-semibold mb-3 text-gray-100">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-10 transform -translate-y-1/2 text-blue-500/50">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="space-y-12">
            <motion.h2 
              className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Features
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="p-8 rounded-xl bg-gradient-to-b from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-blue-500/30 transition-colors backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="p-3 w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 flex items-center justify-center text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-100">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12 mt-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent" />
          <div className="max-w-5xl mx-auto px-8 flex items-center justify-between text-sm text-gray-400 relative">
            <p>© 2024 Medical Bill Analysis. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/lightwheel10/medical-bill-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </a>
              <a 
                href="https://x.com/parastiwaari" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                Follow on Twitter
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
