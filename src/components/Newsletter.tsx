import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().trim().email().max(255);

export function Newsletter() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("You're on the list — festive offers are on the way!");
    setEmail("");
  };

  return (
    <section className="bg-gradient-gold">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center md:flex-row md:justify-between md:text-left lg:px-8">
        <div>
          <h3 className="text-2xl font-bold text-brown">Subscribe for Exclusive Offers</h3>
          <p className="mt-1 text-sm text-brown/80">Get the latest deals and collections</p>
        </div>
        <form onSubmit={submit} className="flex w-full max-w-md gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            maxLength={255}
            className="min-w-0 flex-1 rounded-full border border-brown/10 bg-ivory px-4 py-3 text-sm outline-none placeholder:text-brown-muted focus:border-brown/30"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-brown px-6 py-3 text-sm font-semibold text-ivory transition hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
