"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Webcam from "react-webcam";
import { Upload, Camera, ImagePlus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BillUploadProps {
  onImageCapture: (imageData: string) => void;
}

export function BillUpload({ onImageCapture }: BillUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const webcamRef = useRef<Webcam>(null);
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

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
        onImageCapture(imageSrc);
        setIsCapturing(false);
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-gray-700/50">
      <CardContent className="p-8">
        <AnimatePresence mode="wait">
          {!isCapturing && !image && (
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full h-32 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300 text-white"
                    onClick={() => setIsCapturing(true)}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Camera className="h-8 w-8" />
                      <span className="text-lg">Take Photo</span>
                    </div>
                  </Button>
                </motion.div>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </motion.div>
          )}

          {isCapturing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <div className="relative rounded-xl overflow-hidden border-2 border-white/30 shadow-lg">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
                  onClick={handleCapture}
                >
                  <ImagePlus className="mr-2" /> Capture Image
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 hover:bg-white/10 text-white"
                  onClick={() => setIsCapturing(false)}
                >
                  <X className="mr-2" /> Cancel
                </Button>
              </div>
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
                  alt="Captured bill"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <Button
                variant="outline"
                className="w-full border-white/20 hover:bg-white/10 text-white transition-all duration-300"
                onClick={() => setImage(null)}
              >
                <Camera className="mr-2" /> Take Another Photo
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}