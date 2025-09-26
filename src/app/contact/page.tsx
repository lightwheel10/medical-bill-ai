import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Medical Bill Analysis",
  description: "Get in touch with the Medical Bill Analysis team and find answers to common questions.",
};

const faqs = [
  {
    question: "How quickly can I expect a response?",
    answer:
      "We reply to most inquiries within one business day. Messages sent over the weekend or on holidays are answered the next business day."
  },
  {
    question: "Do you offer phone support?",
    answer:
      "Yes. Our specialists are available Monday through Friday from 9 AM to 6 PM Eastern Time at the number listed below."
  },
  {
    question: "Can I share sensitive health information?",
    answer:
      "Absolutely. All communications are encrypted, and we only use your details to help resolve your billing questions."
  }
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-[-360px] h-[720px] bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.45),_rgba(15,23,42,0))] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-10 bottom-[-260px] h-[520px] bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.25),_rgba(15,23,42,0))] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(148,163,184,0.08)_0%,rgba(15,23,42,0)_55%)]" />

      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-24 sm:px-10 lg:px-0">
        <section className="space-y-6 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 self-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 backdrop-blur">
            <MessageSquare className="h-4 w-4" />
            Support
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">We&apos;re here to help</h1>
          <p className="text-base text-slate-300 sm:text-lg">
            Reach out using the contact details below or browse our quick FAQs to find instant answers. Our team of billing
            specialists is ready to assist whether you have a simple question or need detailed guidance.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_-30px_rgba(59,130,246,0.45)] backdrop-blur sm:p-10">
            <h2 className="text-2xl font-semibold">Contact information</h2>
            <p className="text-sm text-slate-300">
              Choose the option that works best for you—we monitor every channel closely and keep your information secure.
            </p>
            <div className="space-y-5">
              <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-slate-200">
                  <Phone className="h-5 w-5 text-emerald-300" />
                  <div>
                    <p className="text-sm uppercase tracking-wider text-slate-400">Call us</p>
                    <p className="text-lg font-medium text-white">(800) 555-0148</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">Mon–Fri · 9am–6pm ET</p>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-slate-200">
                  <Mail className="h-5 w-5 text-sky-300" />
                  <div>
                    <p className="text-sm uppercase tracking-wider text-slate-400">Email</p>
                    <p className="text-lg font-medium text-white">support@medicalbill.ai</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">We reply within 1 business day</p>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-slate-200">
                  <MapPin className="h-5 w-5 text-violet-300" />
                  <div>
                    <p className="text-sm uppercase tracking-wider text-slate-400">Mailing address</p>
                    <p className="text-lg font-medium text-white">225 Market Street, Suite 420 · Philadelphia, PA 19103</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">Visits by appointment only</p>
              </div>
              <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-slate-200">
                  <Clock className="h-5 w-5 text-amber-300" />
                  <div>
                    <p className="text-sm uppercase tracking-wider text-slate-400">Support hours</p>
                    <p className="text-lg font-medium text-white">Extended evening availability by request</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">Let us know what you need</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_20px_60px_-35px_rgba(16,185,129,0.55)] backdrop-blur sm:p-10">
            <h2 className="text-2xl font-semibold">Quick FAQs</h2>
            <dl className="space-y-5 text-left">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <dt className="text-base font-medium text-white">{faq.question}</dt>
                  <dd className="mt-2 text-sm text-slate-300">{faq.answer}</dd>
                </div>
              ))}
            </dl>
            <p className="rounded-2xl border border-dashed border-slate-600 bg-slate-900/40 p-5 text-sm text-slate-300">
              Still need help? Send us an email with any documents attached and we&apos;ll follow up with a detailed response.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
