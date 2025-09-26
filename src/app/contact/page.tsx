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
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Get in touch with our team</h1>
            <p className="max-w-2xl text-base text-gray-300 sm:text-lg">
              We&apos;re here to help with any questions about medical bill analysis, feature requests, or partnership opportunities. Use the form below or reach out directly via email.
            </p>
          </header>

          <section className="grid gap-10 rounded-2xl border border-gray-800 bg-gray-900/60 p-8 shadow-2xl backdrop-blur">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Send us a message</h2>
              <p className="text-gray-300">
                Fill out the form and we&apos;ll get back to you within two business days.
              </p>
            </div>
            <form className="grid gap-6" aria-label="Contact form">
              <label className="grid gap-2 text-sm text-gray-200">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-base text-gray-100 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-gray-200">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-base text-gray-100 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-gray-200">
                Message
                <textarea
                  name="message"
                  rows={5}
                  placeholder="How can we help?"
                  className="rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-base text-gray-100 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  required
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
              >
                Send message
              </button>
            </form>
          </section>

          <section className="grid gap-6 rounded-2xl border border-gray-800 bg-black/40 p-8 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">Direct contact</h2>
            <div className="space-y-3 text-gray-300">
              <p>
                Email: <a href="mailto:support@medicalbill.ai" className="text-blue-300 hover:text-blue-200">support@medicalbill.ai</a>
              </p>
              <p>
                Phone: <a href="tel:+18001234567" className="text-blue-300 hover:text-blue-200">(800) 123-4567</a>
              </p>
              <p className="text-sm text-gray-400">
                Our support hours are Monday through Friday, 9am – 5pm EST.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
