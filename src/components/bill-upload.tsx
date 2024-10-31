"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BillUploadProps {
  onImageCapture: (imageData: string) => void;
}

export function BillUpload({ onImageCapture }: BillUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setImage(imageData);
        onImageCapture(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-gray-700/50">
      <CardContent className="p-8">
        <AnimatePresence mode="wait">
          {!image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <p className="text-white/80">
                  Upload your bill and get a clear, simple explanation of what everything means
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full h-32 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300 text-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="h-8 w-8" />
                    <span className="text-lg">Upload Bill</span>
                  </div>
                </Button>
              </motion.div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </motion.div>
          )}

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <div className="relative w-full rounded-xl overflow-hidden border-2 border-white/30 shadow-lg">
                <img
                  src={image}
                  alt="Uploaded bill"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <Button
                variant="outline"
                className="w-full border-white/20 hover:bg-white/10 text-white transition-all duration-300"
                onClick={() => setImage(null)}
              >
                <Upload className="mr-2" /> Upload Another Bill
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}