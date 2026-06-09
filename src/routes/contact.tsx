import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { FAQ } from "@/components/site/Primitives";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Hingol Marketing | Digital Marketing Agency in Dubai" },
      { name: "description", content: "Get in touch with Hingol Marketing — Dubai's senior-led digital marketing agency. Free consultations, audits and strategy calls available." },
      { property: "og:title", content: "Contact Hingol Marketing" },
      { property: "og:description", content: "Book a free consultation with our Dubai team. SEO, PPC, social, web and app development — all senior-led, all in-house." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(5, "Phone is required").max(30),
  email: z.string().trim().email("Valid email required").max(255),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(2000),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const data = Object.fromEntries(form.entries());
    
    // Zod validation
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const formData = new FormData(formElement);
      formData.append("access_key", "9ed8cc19-8eb8-4e6a-abe3-1fe5a982d23e");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const resData = await response.json();
      if (resData.success) {
        setSubmitted(true);
      } else {
        setSubmitError(resData.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setSubmitError("Failed to send message. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact Hingol Marketing"
        title="Let's build your next"
        highlight="growth chapter."
        subtitle="Tell us about your business, your goals and where you're stuck. A senior strategist will get back to you within one business day with clear, actionable insights."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 card-surface p-8 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold">Send us a message</h2>
            <p className="text-muted-foreground mt-2">Fill in the form and we'll be in touch within one business day.</p>

            {submitted ? (
              <div className="mt-8 p-6 rounded-2xl border border-[oklch(0.82_0.13_85/0.4)] bg-[oklch(0.82_0.13_85/0.08)] flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[oklch(0.82_0.13_85)] flex-shrink-0" />
                <div>
                  <div className="font-semibold">Thank you — message received.</div>
                  <p className="text-sm text-muted-foreground mt-1">A senior Hingol strategist will be in touch within one business day.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 grid sm:grid-cols-2 gap-4">
                {/* Web3Forms settings */}
                <input type="hidden" name="subject" value="New Contact Form Submission - Hingol Marketing" />
                <input type="hidden" name="from_name" value="Hingol Marketing Site" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                <Field name="name" label="Full Name" placeholder="Your name" error={errors.name} required />
                <Field name="phone" label="Phone" placeholder="+971 ..." error={errors.phone} required />
                <Field name="email" label="Email" placeholder="you@company.com" error={errors.email} required type="email" />
                <Field name="company" label="Company" placeholder="Your company" error={errors.company} />
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold mb-2 block">Message *</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project, goals or challenges..."
                    className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)]"
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                {submitError && (
                  <div className="sm:col-span-2 p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm mt-2">
                    {submitError}
                  </div>
                )}
                <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 mt-2">
                  <p className="text-xs text-muted-foreground">By submitting, you agree to be contacted by Hingol Marketing.</p>
                  <button type="submit" disabled={submitting} className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? "Sending..." : "Get a Free Quote"} <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <Info icon={<Phone />} title="Phone" lines={["+971 54 337 9384"]} href="tel:+971543379384" />
            <Info icon={<Mail />} title="Email" lines={["Info@hingolmarketing.com"]} href="mailto:Info@hingolmarketing.com" />
            <Info icon={<MapPin />} title="Office" lines={["1501 The Tower Plaza", "Sheikh Zayed Road", "Dubai, UAE"]} />
            <Info icon={<Clock />} title="Business Hours" lines={["Mon – Fri: 9:00 – 18:00 GST", "Sat: By appointment", "Sun: Closed"]} />
          </div>
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <div className="card-surface overflow-hidden">
            <iframe
              title="Hingol Marketing office in Dubai"
              src="https://www.google.com/maps?q=The+Tower+Plaza+Sheikh+Zayed+Road+Dubai&output=embed"
              className="w-full h-[420px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="eyebrow">FAQs</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">Frequently asked questions</h2>
          </div>
          <FAQ items={[
            { q: "How fast will I hear back?", a: "All enquiries receive a personal response from a senior strategist within one business day, often the same day." },
            { q: "Do you offer a free consultation?", a: "Yes. Every new conversation starts with a free 30-minute consultation to understand your goals and see if we're a good fit." },
            { q: "Do you work outside Dubai?", a: "Yes — we work with clients across the UAE, GCC, UK, US, Europe and Australia, with fully remote-friendly processes." },
            { q: "What information should I have ready?", a: "It helps to share your website URL, current marketing channels, key challenges and any specific goals or KPIs you're targeting." },
          ]} />
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-t border-border">
        <div className="container-px mx-auto max-w-5xl text-center">
          <span className="eyebrow">Final Call to Action</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-5">Get Your Free Consultation Today</h2>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto">
            Talk to a senior Hingol strategist, no obligations. Walk away with a clear, honest view of how to accelerate
            your business — even if you don't end up working with us.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a href="tel:+971543379384" className="btn-gold">Call +971 54 337 9384</a>
            <a href="mailto:Info@hingolmarketing.com" className="btn-ghost">Email Us</a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ name, label, placeholder, error, required, type = "text" }: { name: string; label: string; placeholder: string; error?: string; required?: boolean; type?: string }) {
  return (
    <div>
      <label className="text-sm font-semibold mb-2 block">{label} {required && "*"}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)]"
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}

function Info({ icon, title, lines, href }: { icon: React.ReactNode; title: string; lines: string[]; href?: string }) {
  const content = (
    <div className="card-surface card-hover p-6 flex gap-4">
      <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center bg-[oklch(0.82_0.13_85/0.12)] border border-[oklch(0.82_0.13_85/0.3)] text-[oklch(0.82_0.13_85)]">
        <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
        {lines.map((l) => <div key={l} className="text-sm font-medium mt-0.5">{l}</div>)}
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
