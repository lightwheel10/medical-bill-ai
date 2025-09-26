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
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file) return;

    setIsDragActive(false);
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result as string;
      setImage(imageData);
      onImageCapture(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isDragActive) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const relatedTarget = event.relatedTarget as Node | null;
    if (relatedTarget && event.currentTarget.contains(relatedTarget)) {
      return;
    }
    setIsDragActive(false);
  };

  return (
    <Card className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80 shadow-[0_18px_60px_-25px_rgba(14,165,233,0.45)] backdrop-blur-xl">
      <div className="pointer-events-none absolute -left-32 top-[-160px] h-64 w-64 rounded-full bg-gradient-to-br from-sky-500/40 via-sky-400/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-[-120px] h-60 w-60 rounded-full bg-gradient-to-br from-emerald-400/30 via-emerald-300/10 to-transparent blur-3xl" />
      <CardContent className="relative p-10">
        <AnimatePresence mode="wait">
          {!image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2 text-left">
                <h3 className="text-2xl font-semibold text-white">Upload your medical bill</h3>
                <p className="text-sm text-slate-300">
                  Drag in a photo or screenshot. We&apos;ll enhance the image quality automatically before analysis.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDragEnd={handleDragLeave}
                  className={`group relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-12 transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    isDragActive
                      ? "border-sky-400/70 bg-sky-400/10"
                      : "border-white/10 bg-white/5 hover:border-sky-300/50 hover:bg-white/10"
                  }`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-slate-900/70 text-sky-200 shadow-[0_10px_40px_-20px_rgba(56,189,248,0.65)]">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-base font-medium text-white">
                      Drag &amp; drop your bill image
                    </p>
                    <p className="text-sm text-slate-300">
                      or
                      <button
                        type="button"
                        className="ml-1 inline-flex items-center text-sm font-semibold text-sky-300 underline-offset-4 transition hover:text-sky-200"
                        onClick={(event) => {
                          event.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        browse files
                      </button>
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">
                    JPG or PNG, up to 15 MB
                  </p>
                </div>
              </motion.div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                <span className="rounded-full bg-sky-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-200">
                  Private by design
                </span>
                We remove metadata and never retain your bill after the session is complete.
              </div>
            </motion.div>
          )}

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_18px_50px_-30px_rgba(14,165,233,0.6)]">
                <img
                  src={image}
                  alt="Uploaded bill"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 text-sm text-slate-300">
                <p>
                  Ready when you are. We&apos;ll guide you through the analysis while you keep this preview for reference.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-white/20 bg-white/10 text-white transition hover:border-sky-300/60 hover:bg-sky-500/10"
                  onClick={() => setImage(null)}
                >
                  <Upload className="mr-2 h-4 w-4" /> Choose a different bill
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}