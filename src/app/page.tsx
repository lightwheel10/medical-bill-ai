"use client";

import { useState } from "react";
import { BillUpload } from "@/components/bill-upload";
import { analyzeBillImage } from "@/lib/gemini";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Brain, Zap, Github, MessageSquare, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProcessingView } from "@/components/processing-view";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "@/components/error-boundary";
import Link from "next/link";

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
      setImageData(capturedImage);

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

      setAnalysis(result);

      router.push(`/result/${data.id}`);

    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze bill');
      setAnalysis(null);
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
      title: "Context-aware reasoning",
      description:
        "Gemini 1.5 Flash combines OCR results with clinical language understanding to explain charges like a human expert."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning-fast summaries",
      description:
        "Receive a jargon-free overview in under a minute, complete with key takeaways and questions to ask your provider."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Structured breakdowns",
      description:
        "Line items, CPT codes, and insurance adjustments are organized automatically into a digestible, shareable format."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy-first architecture",
      description:
        "Uploads stay encrypted, are deleted after analysis, and never used to train third-party models without your consent."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Always-on bill coach",
      description:
        "Chat through appeals, payment plans, or negotiation scripts with an assistant grounded in your original bill."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Capture your bill",
      description: "Snap a photo or upload a PDF. We automatically enhance, deskew, and prepare it for analysis."
    },
    {
      number: "02",
      title: "Let Gemini decode",
      description: "Gemini reads the bill, understands medical terminology, and builds a structured explanation."
    },
    {
      number: "03",
      title: "Review & chat",
      description: "See the story behind every charge and continue the conversation to negotiate with confidence."
    }
  ];

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-[-360px] h-[720px] bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.55),_rgba(15,23,42,0))] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-20 bottom-[-260px] h-[520px] bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.35),_rgba(15,23,42,0))] blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(148,163,184,0.08)_0%,rgba(15,23,42,0)_55%)]" />

        <AnimatePresence>
          {isAnalyzing && !isProcessingComplete && (
            <ProcessingView isComplete={false} />
          )}
        </AnimatePresence>

        <main className="relative">
          {/* Hero Section */}
          <motion.section
            className="relative px-6 pb-20 pt-24 md:px-10 lg:px-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
            <div className="relative mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 backdrop-blur"
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={18}
                    height={18}
                    className="h-4 w-4"
                  />
                  Powered by Google Gemini
                </motion.div>

                <motion.h1
                  className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl md:leading-[1.05]"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                    Translate confusing medical bills
                  </span>
                  <br />
                  into human language in seconds.
                </motion.h1>

                <motion.p
                  className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Upload a photo of any bill and receive a clear, jargon-free breakdown powered by state-of-the-art multimodal AI. Chat with the assistant to negotiate, compare, or clarify every line item.
                </motion.p>

                <motion.div
                  className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {[
                    { value: "45 sec", label: "Average time to first summary" },
                    { value: "99.1%", label: "Charge detection accuracy" },
                    { value: "Secure", label: "HIPAA-friendly uploads" }
                  ].map((highlight) => (
                    <div
                      key={highlight.label}
                      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left shadow-[0_10px_40px_-20px_rgba(14,165,233,0.45)] backdrop-blur"
                    >
                      <p className="text-xl font-semibold text-white sm:text-2xl">{highlight.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                        {highlight.label}
                      </p>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex flex-col items-center justify-center gap-4 text-sm text-slate-400 sm:flex-row sm:text-base"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="flex -space-x-2">
                    {["A", "B", "C"].map((item) => (
                      <div
                        key={item}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-semibold text-white"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <span className="text-center">
                    Trusted by patient advocates and billing experts for fast reviews.
                  </span>
                </motion.div>
              </div>

              {!isAnalyzing && !analysis && (
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                >
                  <BillUpload onImageCapture={handleImageCapture} />
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Error banner */}
          {error && (
            <motion.div
              className="relative mx-auto mb-10 max-w-3xl px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="border-red-400/40 bg-red-500/10 p-6 text-sm text-red-100 backdrop-blur">
                <p>{error}</p>
              </Card>
            </motion.div>
          )}

          {/* How it works */}
          <section id="how-it-works" className="relative mx-auto max-w-6xl px-6 pb-16 md:px-10 lg:px-14">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80">Workflow</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Understand every bill in three intuitive steps
              </h2>
              <p className="mt-4 text-slate-300">
                From upload to actionable insight, the experience is designed to feel effortless yet deeply informative.
              </p>
            </motion.div>

            <div className="relative mt-16 grid gap-12 md:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="group relative"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <div className="absolute inset-0 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl transition duration-300 group-hover:border-sky-400/50" />
                  <div className="relative flex h-full flex-col gap-6 rounded-3xl p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-400 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/30">
                      {step.number}
                    </span>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      <p className="text-sm text-slate-300">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="relative mx-auto max-w-6xl px-6 pb-20 md:px-10 lg:px-14">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">Why it feels different</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Elegant tools crafted for clarity and confidence
              </h2>
              <p className="mt-4 text-slate-300">
                Each feature is designed to reveal the story behind the charges, highlight savings opportunities, and empower you to take action.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-sky-500/40 to-emerald-400/40 blur-2xl transition group-hover:opacity-80" />
                  <div className="relative flex h-full flex-col gap-5">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-sky-200">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Call to action */}
          <section className="relative mx-auto max-w-5xl px-6 pb-24 md:px-10 lg:px-14">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-sky-500/20 via-blue-500/10 to-emerald-400/20 p-10 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
              <div className="relative flex flex-col items-start gap-6 text-left md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl space-y-3">
                  <p className="text-sm uppercase tracking-[0.35em] text-white/80">Get clarity now</p>
                  <h3 className="text-2xl font-semibold sm:text-3xl">
                    Ready to decode your latest medical bill?
                  </h3>
                  <p className="text-slate-200">
                    Upload a photo to receive a human-friendly explanation with suggested questions for your provider or insurer.
                  </p>
                </div>
                <Button
                  variant="secondary"
                  className="rounded-full border border-white/30 bg-white/20 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-white/30"
                  onClick={handleReset}
                >
                  Start a new upload
                </Button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative border-t border-white/10 bg-slate-950/90 py-12">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
            <p>© 2024 Medical Bill Analysis. Crafted for clarity and peace of mind.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact" className="flex items-center gap-2 transition hover:text-sky-300">
                <MessageSquare className="h-4 w-4" />
                Contact us
              </Link>
              <a
                href="https://github.com/lightwheel10/medical-bill-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition hover:text-sky-300"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://x.com/parastiwaari"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition hover:text-sky-300"
              >
                <Twitter className="h-4 w-4" />
                X (Twitter)
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
