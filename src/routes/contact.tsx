import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { z } from "zod";
import { SectionHeading } from "@/components/SectionHeading";
import { FireworkBackground } from "@/components/FireworkBackground";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SparkleFire — Support, Store & Bulk Orders" },
      {
        name: "description",
        content:
          "Reach the SparkleFire team by phone, email or at our Chennai store. Send a message and we'll reply within one business day.",
      },
      { property: "og:title", content: "Contact SparkleFire — Support, Store & Bulk Orders" },
      { property: "og:description", content: "We're here to help you with orders and bulk enquiries." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{10,15}$/, "Enter a valid phone number"),
  subject: z.string().trim().min(3, "Please add a subject").max(120),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const initial = { name: "", email: "", phone: "", subject: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        next[issue.path[0] as keyof Errors] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
    setForm(initial);
  };

  return (
    <div className="animate-rise">
      <section className="relative overflow-hidden border-b border-champagne/60 bg-gradient-champagne py-12">
        <FireworkBackground />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Contact Us" subtitle="We're here to help you" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-champagne/70 bg-card p-6 shadow-soft md:p-8">
            <h2 className="font-serif text-2xl font-bold text-brown">Get in Touch</h2>
            <ul className="mt-6 space-y-5 text-sm">
              {[
                { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                { icon: Mail, label: "Email", value: "support@sparklefire.com" },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "123 Celebration Street, Chennai, Tamil Nadu 600001",
                },
                { icon: Clock, label: "Working Hours", value: "Mon – Sat: 9AM – 8PM · Sun: 10AM – 6PM" },
              ].map((row) => (
                <li key={row.label} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-gold-deep">
                    <row.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wide text-brown-muted">
                      {row.label}
                    </span>
                    <span className="block font-medium text-brown">{row.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-champagne/70 bg-card p-6 shadow-soft md:p-8">
            <h2 className="font-serif text-2xl font-bold text-brown">Send Us a Message</h2>
            {sent ? (
              <div className="mt-6 rounded-2xl border border-success/30 bg-success/10 p-6 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
                <h3 className="mt-3 font-serif text-xl font-bold text-brown">Message sent</h3>
                <p className="mt-1 text-sm text-brown-muted">
                  Thank you — our team will reply within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-5 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold-deep"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                <Field label="Your Name" error={errors.name}>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={100}
                    className={inputClass}
                    placeholder="Your Name"
                  />
                </Field>
                <Field label="Your Email" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    maxLength={15}
                    className={inputClass}
                    placeholder="+91 98765 43210"
                  />
                </Field>
                <Field label="Subject" error={errors.subject}>
                  <input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    maxLength={120}
                    className={inputClass}
                    placeholder="Bulk order enquiry"
                  />
                </Field>
                <Field label="Message" error={errors.message}>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    maxLength={1000}
                    rows={4}
                    className={inputClass}
                    placeholder="How can we help?"
                  />
                </Field>
                <button
                  type="submit"
                  className="shimmer-btn w-full rounded-full bg-gradient-gold py-3 text-sm font-semibold text-brown"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Find us */}
        <section className="mt-12">
          <SectionHeading title="Find Us" align="left" />
          <div className="mt-6 grid gap-6 overflow-hidden rounded-2xl border border-champagne/70 bg-card p-6 shadow-soft lg:grid-cols-[minmax(0,1fr)_300px]">
            <div
              className="relative h-64 overflow-hidden rounded-xl border border-champagne lg:h-80"
              style={{
                backgroundColor: "var(--cream)",
                backgroundImage:
                  "linear-gradient(0deg, color-mix(in oklab, var(--champagne) 60%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--champagne) 60%, transparent) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-champagne bg-card px-4 py-3 text-center shadow-gold">
                <MapPin className="mx-auto h-5 w-5 text-gold" />
                <span className="mt-1 block text-sm font-semibold text-brown">SparkleFire Store</span>
                <span className="block text-xs text-brown-muted">
                  123 Celebration Street, Chennai
                </span>
              </span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-brown">Store Location</h3>
              <p className="mt-2 text-sm text-brown-muted">
                123 Celebration Street,
                <br /> Chennai, Tamil Nadu 600001
              </p>
              <p className="mt-3 text-xs text-brown-muted">
                Free parking behind the building. Bulk orders are handled at the rear counter.
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Chennai+Tamil+Nadu"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-brown"
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-champagne bg-ivory px-4 py-3 text-sm text-brown outline-none placeholder:text-brown-muted focus:border-gold";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brown-muted">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
