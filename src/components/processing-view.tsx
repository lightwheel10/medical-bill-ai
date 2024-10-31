"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const loadingTexts = [
  "Analyzing your medical bill...",
  "Extracting key information...",
  "Breaking down the charges...",
  "Simplifying medical terms...",
  "Preparing your results..."
];

interface ProcessingViewProps {
  isComplete?: boolean;
}

export function ProcessingView({ isComplete }: ProcessingViewProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (isComplete && currentTextIndex < loadingTexts.length - 1) {
      const timer = setTimeout(() => {
        setCurrentTextIndex(loadingTexts.length - 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, currentTextIndex]);

  useEffect(() => {
    if (!isComplete && currentTextIndex < loadingTexts.length - 1) {
      const timer = setInterval(() => {
        setCurrentTextIndex(prev => 
          prev < loadingTexts.length - 2 ? prev + 1 : prev
        );
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [isComplete, currentTextIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <Card className="w-full max-w-md bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-gray-700/50">
        <div className="p-8 flex flex-col items-center justify-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-12 h-12 text-blue-400" />
          </motion.div>
          
          <div className="text-center space-y-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTextIndex}
                className="text-white/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {loadingTexts[currentTextIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
} 