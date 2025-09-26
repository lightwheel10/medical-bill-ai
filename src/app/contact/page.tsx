const faqs = [
  {
    question: "How quickly will someone respond to my message?",
    answer: "Our support specialists monitor the inbox throughout the workday and typically respond within one business day."
  },
  {
    question: "Can you review bills from any healthcare provider?",
    answer: "Yes. As long as you can share a clear image or PDF of the bill, our AI can analyze charges and insurance details from any provider."
  },
  {
    question: "Do you offer help with insurance appeals?",
    answer: "We can highlight potential issues and next steps, and our team can connect you with partner advocates for complex appeals."
  }
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-gray-100">
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent pointer-events-none rounded-3xl blur-3xl" />
        <div className="relative space-y-12">
          <header className="space-y-4">
            <p className="inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-sm uppercase tracking-[0.2em] text-blue-200/90">
              Contact
            </p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">We’re here to help</h1>
            <p className="max-w-2xl text-base text-gray-300 sm:text-lg">
              Reach out to the Medical Bill AI team for support, partnership inquiries, or product feedback. Explore the quick answers below or connect with us directly—whatever works best for you.
            </p>
          </header>

          <section className="grid gap-8 rounded-2xl border border-gray-800 bg-gray-900/60 p-8 shadow-2xl backdrop-blur sm:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Talk with support</h2>
              <p className="text-gray-300">
                We love hearing from customers, clinicians, and partners. Send us a note and we’ll make sure the right specialist follows up.
              </p>
              <div className="space-y-3 text-gray-300">
                <p>
                  Email: <a href="mailto:support@medicalbill.ai" className="text-blue-300 hover:text-blue-200">support@medicalbill.ai</a>
                </p>
                <p>
                  Phone: <a href="tel:+18001234567" className="text-blue-300 hover:text-blue-200">(800) 123-4567</a>
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6 text-sm text-blue-100">
              <h3 className="text-lg font-semibold text-white">Availability</h3>
              <ul className="mt-4 space-y-3 text-blue-100/90">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" aria-hidden />
                  <div>
                    <p className="font-medium text-white">Support hours</p>
                    <p>Monday – Friday, 9:00am – 5:00pm EST</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" aria-hidden />
                  <div>
                    <p className="font-medium text-white">Response time</p>
                    <p>Within one business day for most requests</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" aria-hidden />
                  <div>
                    <p className="font-medium text-white">Emergency help</p>
                    <p>If it’s urgent, call and select option 2 to reach the on-call advocate.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="grid gap-6 rounded-2xl border border-gray-800 bg-black/40 p-8 backdrop-blur">
            <div>
              <h2 className="text-xl font-semibold text-white">Frequently asked questions</h2>
              <p className="mt-2 text-sm text-gray-400">Find quick answers to common questions about Medical Bill AI.</p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="space-y-2">
                  <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
