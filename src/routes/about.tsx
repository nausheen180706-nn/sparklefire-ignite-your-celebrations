import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Shield, Sparkles, Users } from "lucide-react";
import heroImage from "@/assets/hero-fireworks.jpg";
import { SectionHeading } from "@/components/SectionHeading";
import { FireworkBackground } from "@/components/FireworkBackground";
import { TestimonialCard } from "@/components/cards";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SparkleFire — Lighting Celebrations Since 2009" },
      {
        name: "description",
        content:
          "The SparkleFire story: a family-run Sivakasi fireworks brand built on safety testing, fair pricing and premium quality since 2009.",
      },
      { property: "og:title", content: "About SparkleFire — Lighting Celebrations Since 2009" },
      {
        property: "og:description",
        content: "Our story, mission, values and the reason families trust SparkleFire.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Award, title: "Quality", text: "Every batch is inspected before it reaches your home." },
  { icon: Shield, title: "Trust", text: "Transparent pricing with no hidden festive markups." },
  { icon: Shield, title: "Safety", text: "Independently tested and safety-certified products." },
  { icon: Sparkles, title: "Celebration", text: "Designed for moments people remember for years." },
  { icon: Users, title: "Customer First", text: "Real humans on call through the entire season." },
];

const timeline = [
  { year: "2009", text: "Started as a small family fireworks stall in Sivakasi." },
  { year: "2013", text: "Opened our first certified storage and testing facility." },
  { year: "2017", text: "Launched curated celebration boxes for families." },
  { year: "2021", text: "Went online and shipped to 20 cities in the first season." },
  { year: "2026", text: "Serving 10,000+ families across 50+ delivery locations." },
];

function AboutPage() {
  return (
    <div className="animate-rise">
      <section className="relative overflow-hidden border-b border-champagne/60 bg-gradient-champagne">
        <FireworkBackground dense />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 lg:grid-cols-2 lg:px-8">
          <div>
            <h1 className="font-serif text-4xl font-bold leading-tight text-brown md:text-5xl">
              Lighting Celebrations, Creating Memories
            </h1>
            <p className="mt-4 max-w-lg text-sm text-brown-muted md:text-base">
              For over fifteen years, SparkleFire has helped Indian families mark their happiest
              moments with fireworks that are as safe as they are spectacular.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-champagne shadow-gold">
            <img
              src={heroImage}
              alt="SparkleFire premium firework collection"
              loading="lazy"
              width={1408}
              height={1008}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading title="Our Story" align="left" />
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-brown-muted">
              <p>
                SparkleFire began in 2009 with a single stall in Sivakasi, run by the Iyer family
                during Diwali week. What set them apart was simple: every cracker was test-fired
                before it was sold, and nothing left the counter that they wouldn't light in their
                own courtyard.
              </p>
              <p>
                Word spread. Families started travelling from neighbouring towns for a stock they
                could trust. In 2013 we built our own certified storage and testing facility, and in
                2021 we brought the same standards online so families anywhere in India could order
                without guessing at quality.
              </p>
              <p>
                Today we design curated celebration boxes, work directly with a small group of
                licensed manufacturers, and keep our team on call through the entire festive season.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-champagne/70 bg-card p-6 shadow-soft">
              <h3 className="font-serif text-xl font-bold text-brown">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-brown-muted">
                To make every celebration brighter and safer — offering premium, honestly priced
                fireworks with clear safety guidance, so families can focus on the moment instead of
                the risk.
              </p>
            </div>
            <TestimonialCard
              quote="We have ordered from SparkleFire for four Diwalis. Nothing has ever failed to light."
              name="Ramesh & Kavitha"
              city="Coimbatore"
            />
          </div>
        </section>

        <section>
          <SectionHeading title="Our Values" subtitle="The principles behind every box we pack" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-lift rounded-2xl border border-champagne/70 bg-card p-5 shadow-soft"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-gold-deep">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-base font-semibold text-brown">{v.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-brown-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading title="Our Journey" subtitle="From one stall to thousands of homes" />
          <ol className="relative mt-10 space-y-8 border-l border-champagne pl-8">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[41px] grid h-5 w-5 place-items-center rounded-full bg-gradient-gold ring-4 ring-background" />
                <h3 className="font-serif text-lg font-bold text-brown">{t.year}</h3>
                <p className="mt-1 text-sm text-brown-muted">{t.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-3xl border border-champagne/70 bg-gradient-champagne p-8 md:p-12">
          <SectionHeading title="Why Families Trust SparkleFire" />
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { stat: "10K+", label: "Happy Customers", icon: Heart },
              { stat: "100+", label: "Products", icon: Sparkles },
              { stat: "50+", label: "Delivery Locations", icon: Users },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-champagne bg-card p-5 shadow-soft">
                <s.icon className="mx-auto h-5 w-5 text-gold" />
                <span className="mt-2 block font-serif text-2xl font-bold text-brown md:text-3xl">
                  {s.stat}
                </span>
                <span className="mt-1 block text-xs text-brown-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
