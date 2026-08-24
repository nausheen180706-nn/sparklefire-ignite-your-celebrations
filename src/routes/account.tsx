import { createFileRoute } from "@tanstack/react-router";
import { FireworkBackground } from "@/components/FireworkBackground";
import { SectionHeading } from "@/components/SectionHeading";
import { User, LogOut, Package, MapPin, CreditCard, Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — SparkleFire" },
      {
        name: "description",
        content: "Manage your profile details, shipping addresses, and track orders.",
      },
    ],
  }),
  component: AccountPage,
});

const tabs = [
  { id: "orders", label: "My Orders", icon: Package },
  { id: "profile", label: "Profile Details", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
] as const;

function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses">("orders");
  const [profile, setProfile] = useState({
    name: "Dinesh Kumar",
    email: "dinesh@example.com",
    phone: "+91 98765 43210",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="animate-rise pb-16">
      <section className="relative overflow-hidden border-b border-champagne/60 bg-gradient-champagne py-12">
        <FireworkBackground />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="My Account"
            subtitle="Manage your orders, profile and shipping addresses"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-2">
            <div className="rounded-2xl border border-champagne/70 bg-card p-5 shadow-soft mb-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-gold grid place-items-center font-bold text-brown text-lg">
                DK
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-sm font-bold text-brown truncate">{profile.name}</h3>
                <p className="text-[11px] text-brown-muted truncate">{profile.email}</p>
              </div>
            </div>

            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "bg-gradient-gold text-brown shadow-soft"
                      : "text-brown-muted hover:bg-cream hover:text-brown"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </aside>

          {/* Tab Content */}
          <div className="rounded-2xl border border-champagne/70 bg-card p-6 shadow-soft min-h-[400px]">
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-brown">Order History</h3>
                <div className="border border-champagne/70 rounded-xl overflow-hidden divide-y divide-champagne/50">
                  <div className="p-4 bg-cream/30 flex flex-wrap justify-between items-center gap-2 text-xs">
                    <div>
                      <p className="text-brown-muted">Order ID</p>
                      <p className="font-bold text-brown">SF-2026-8947</p>
                    </div>
                    <div>
                      <p className="text-brown-muted">Date</p>
                      <p className="font-bold text-brown">24th Aug 2026</p>
                    </div>
                    <div>
                      <p className="text-brown-muted">Total Amount</p>
                      <p className="font-bold text-brown">₹2,848.00</p>
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-full bg-green-50 text-green-700 font-semibold">
                        Delivered
                      </span>
                    </div>
                  </div>
                  <div className="p-4 text-sm text-brown-muted">
                    <p className="font-medium text-brown mb-1">Items:</p>
                    <p>1x Kids Safe Combo, 2x Sparkling Sparklers, 1x Royal Rocket Bomb</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <h3 className="font-serif text-lg font-bold text-brown">Profile Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold text-brown-muted">Full Name</span>
                    <input
                      type="text"
                      required
                      value={profile.name}
                      onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                      className="w-full rounded-xl border border-champagne bg-ivory px-4 py-2.5 text-sm text-brown outline-none focus:border-gold"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold text-brown-muted">Email Address</span>
                    <input
                      type="email"
                      required
                      value={profile.email}
                      onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                      className="w-full rounded-xl border border-champagne bg-ivory px-4 py-2.5 text-sm text-brown outline-none focus:border-gold"
                    />
                  </label>
                  <label className="block space-y-1.5 sm:col-span-2">
                    <span className="text-xs font-semibold text-brown-muted">Phone Number</span>
                    <input
                      type="tel"
                      required
                      value={profile.phone}
                      onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full rounded-xl border border-champagne bg-ivory px-4 py-2.5 text-sm text-brown outline-none focus:border-gold"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-brown hover:opacity-95 shadow-soft transition"
                >
                  Save Profile
                </button>
              </form>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-brown">My Addresses</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-gold bg-cream/10 p-4 relative">
                    <span className="absolute top-4 right-4 text-[10px] uppercase font-bold text-gold-deep border border-gold/40 px-2 py-0.5 rounded-full bg-ivory">
                      Default
                    </span>
                    <p className="font-serif text-sm font-bold text-brown mb-2">Home Address</p>
                    <p className="text-xs text-brown-muted leading-relaxed">
                      Dinesh Kumar<br />
                      12, Mahatma Gandhi Road, Nungambakkam<br />
                      Chennai, Tamil Nadu - 600034<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
