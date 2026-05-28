import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: TripleGSite,
});

const WHATSAPP = "https://wa.me/250788300194";
const WHATSAPP_BOOK = "https://wa.me/250788300194?text=Hello%20Triple%20G%20Apartments%2C%20I%20would%20like%20to%20make%20a%20booking.";
const EMAIL = "brtripplegaptments14@gmail.com";
const PHONE = "+250788300194";

const NAV = [
  { id: "home", label: "Home" },
  { id: "apartments", label: "Apartments" },
  { id: "amenities", label: "Amenities" },
  { id: "location", label: "Location" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

import livingBlue from "@/assets/gallery/living-blue.jpg";
import livingLeather from "@/assets/gallery/living-leather.jpg";
import bathroomShower from "@/assets/gallery/bathroom-shower.jpg";
import bathroomVanity from "@/assets/gallery/bathroom-vanity.jpg";
import bedroomWarm from "@/assets/gallery/bedroom-warm.jpg";
import kitchen1 from "@/assets/gallery/kitchen-1.jpg";
import bedroomSuite from "@/assets/gallery/bedroom-suite.jpg";
import bedroomClassic from "@/assets/gallery/bedroom-classic.jpg";
import kitchenBar from "@/assets/gallery/kitchen-bar.jpg";
import dining from "@/assets/gallery/dining.jpg";

const GALLERY = [
  { url: livingBlue, alt: "Bright living room with blue sofa and modern decor", span: true },
  { url: bedroomWarm, alt: "Warm master bedroom with king bed" },
  { url: kitchen1, alt: "Fully equipped modern kitchen" },
  { url: bathroomShower, alt: "En-suite bathroom with rain shower" },
  { url: dining, alt: "Spacious dining area with chandelier" },
  { url: livingLeather, alt: "Elegant living room with leather sofas" },
  { url: bedroomSuite, alt: "Luxury bedroom suite with tray ceiling" },
  { url: bathroomVanity, alt: "Modern double-vanity bathroom" },
  { url: bedroomClassic, alt: "Classic bedroom with lounge seating" },
  { url: kitchenBar, alt: "Open kitchen with breakfast bar" },
];

function TripleGSite() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="font-sans text-charcoal">
      <Navbar scrolled={scrolled} active={active} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Hero />
      <TrustBar />
      <About />
      <Apartments />
      <Amenities />
      <Location />
      <Gallery onOpen={setLightbox} />
      <Testimonials />
      <Booking />
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.5)] sm:bottom-7 sm:right-7 sm:h-[58px] sm:w-[58px]"
      >
        <span className="text-[24px] sm:text-[26px]">💬</span>
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25d366] animate-pulse-ring" />
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-5 left-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand-red text-white shadow-lg transition hover:bg-brand-red-dark sm:bottom-7 sm:left-7 sm:h-[46px] sm:w-[46px]"
        >
          <span className="text-xl leading-none">↑</span>
        </button>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          >
            ×
          </button>
          <img src={lightbox} alt="" className="max-h-[90vh] max-w-5xl rounded-lg object-contain" />
        </div>
      )}
    </div>
  );
}

/* ---------------- Navbar ---------------- */
function Navbar({
  scrolled,
  active,
  mobileOpen,
  setMobileOpen,
}: {
  scrolled: boolean;
  active: string;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const linkClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 bg-white transition-shadow ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between gap-2 px-4 sm:h-[70px] sm:px-5">
        <button onClick={() => linkClick("home")} className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-brand-red text-sm font-bold text-white sm:h-10 sm:w-10">TG</span>
          <span className="truncate font-display text-[16px] font-bold text-charcoal sm:text-[20px]">Triple G Apartments</span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => linkClick(n.id)}
              className={`relative text-[13px] font-medium transition ${
                active === n.id ? "text-brand-red" : "text-charcoal hover:text-brand-red"
              }`}
            >
              {n.label}
              {active === n.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-red" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => linkClick("booking")}
            className="hidden rounded bg-brand-red px-[22px] py-[10px] text-sm font-semibold text-white transition hover:bg-brand-red-dark sm:block"
          >
            Book Now
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-10 w-10 place-items-center rounded text-charcoal lg:hidden"
          >
            <span className="text-2xl">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t bg-white lg:hidden">
          <nav className="flex flex-col px-5 py-3">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => linkClick(n.id)}
                className={`py-3 text-left text-sm font-medium ${
                  active === n.id ? "text-brand-red" : "text-charcoal"
                }`}
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => linkClick("booking")}
              className="mt-2 rounded bg-brand-red px-5 py-3 text-sm font-semibold text-white"
            >
              Book Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal"
    >
      <img
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920"
        alt="Luxury Kigali apartment interior"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[rgba(31,41,55,0.7)]" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pt-24 pb-16 text-center text-white sm:px-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-red px-3 py-1.5 text-[11px] font-semibold text-white sm:px-4 sm:text-xs">
          🏆 Rwanda Hospitality Association Member
        </span>

        <h1 className="mt-6 font-display text-[32px] font-bold leading-[1.15] sm:text-5xl md:text-6xl lg:text-[64px]">
          Discover Luxury Living
          <br />
          in the Heart of Kigali
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-[1.7] text-white/90 sm:mt-6 sm:text-lg">
          3 modern fully furnished apartments · 12 bedrooms total.
          <br className="hidden sm:block" />
          Book a single room from $65/night or entire apartment from $199/night.
          <br className="hidden sm:block" />
          200m from Intare Arena · 10 min from Kigali Airport & Health City.
        </p>

        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
          <a href="#booking" className="inline-flex h-12 items-center justify-center rounded bg-brand-red px-6 text-sm font-semibold text-white transition hover:bg-brand-red-dark sm:px-7 sm:text-base">
            Book Your Stay Now
          </a>
          <a href="#apartments" className="inline-flex h-12 items-center justify-center rounded border-2 border-white px-6 text-sm font-semibold text-white transition hover:bg-white hover:text-charcoal sm:px-7 sm:text-base">
            View Apartments
          </a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded bg-[#25d366] px-6 text-sm font-semibold text-white transition hover:brightness-110 sm:px-7 sm:text-base">
            💬 WhatsApp Us
          </a>
        </div>
      </div>

      <a href="#about" aria-label="Scroll" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce-soft">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
      </a>
    </section>
  );
}

/* ---------------- Trust Bar ---------------- */
function TrustBar() {
  const items = [
    "🏆 RHA Certified",
    "📍 200m from Intare Arena",
    "✈️ 10 min from Airport",
    "🏥 10 min from Health City",
    "🔒 24/7 Security",
  ];
  return (
    <div className="bg-brand-red">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-3 text-[13px] font-medium text-white sm:py-0 sm:h-[52px]">
        {items.map((t, i) => (
          <div key={i} className="flex items-center">
            <span>{t}</span>
            {i < items.length - 1 && <span className="ml-6 hidden h-4 w-px bg-white/40 md:inline-block" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- About ---------------- */
function About() {
  const stats = [
    { n: "3", l: "Apartments" },
    { n: "12", l: "Total Rooms" },
    { n: "24", l: "Max Guests" },
    { n: "5★", l: "Service" },
  ];
  const features = [
    "200m from Intare Conference Arena",
    "10 min from Kigali International Airport",
    "10 min from Kigali Health City",
    "Flexible booking — room, apartment, full property",
    "High-speed WiFi & DSTV in every room",
    "Professional housekeeping & 24/7 security",
    "Free parking for all guests",
    "Rwanda Hospitality Association member",
  ];

  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 lg:grid-cols-[55%_45%] lg:items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">About Us</div>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal sm:text-[48px] sm:leading-[1.1]">
            Welcome to Triple G Apartments
          </h2>
          <p className="mt-6 text-base leading-[1.8] text-brand-gray">
            Triple G Apartments Ltd is a premier short-term and long-term accommodation provider in Rusororo, Gasabo District, Kigali, Rwanda. We offer 3 separate fully furnished apartments, each with 4 spacious bedrooms.
          </p>
          <p className="mt-4 text-base leading-[1.8] text-brand-gray">
            Whether you are an international business traveler, a medical professional visiting Kigali Health City, a family on holiday, or a corporate team on retreat — Triple G is your home away from home. Flexible booking options let you rent a single room, an entire apartment, or the whole property.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5">
            {stats.map((s) => (
              <div key={s.l} className="rounded-lg border-t-[3px] border-brand-red bg-white px-4 py-5 text-center shadow-sm">
                <div className="font-display text-4xl font-bold text-brand-red">{s.n}</div>
                <div className="mt-1 text-xs text-brand-gray">{s.l}</div>
              </div>
            ))}
          </div>

          <ul className="mt-8 space-y-1.5">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-base leading-8 text-charcoal">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-brand-red-light text-brand-red">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200"
            alt="Modern furnished living room at Triple G Apartments"
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-xl sm:aspect-[4/3] lg:aspect-[5/4]"
          />
          <div className="absolute -bottom-5 left-5 rounded bg-brand-gold px-5 py-3 text-charcoal shadow-lg">
            <div className="text-sm font-bold">RHA Member</div>
            <div className="text-xs">Since 2020</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Apartments ---------------- */
function Apartments() {
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(3);

  const calc = useMemo(() => {
    const base = guests <= 2 ? 65 : guests <= 8 ? 199 : 499;
    const label = guests <= 2 ? "Single Room" : guests <= 8 ? "Entire Apartment" : "Entire Property";
    const discount = nights >= 30 ? 0.75 : nights >= 7 ? 0.88 : 1;
    const total = Math.round(base * nights * discount);
    return { label, total, discount };
  }, [guests, nights]);

  return (
    <section id="apartments" className="bg-brand-bg py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-5">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Our Spaces</div>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal sm:text-[48px]">Flexible Booking Options</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-gray">
            Book exactly what you need — a room, an apartment, or the entire property.
          </p>
        </div>

        {/* Calculator */}
        <div className="mt-12 rounded-xl bg-white p-7 shadow-md">
          <h3 className="font-sans text-lg font-bold text-charcoal">💰 Find the Best Option for You</h3>
          <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1fr_1.4fr] md:items-end">
            <Stepper label="👥 Guests" min={1} max={24} value={guests} onChange={setGuests} />
            <Stepper label="🌙 Nights" min={1} max={90} value={nights} onChange={setNights} />
            <div className="rounded-lg border border-brand-red/40 bg-brand-red-light p-4">
              <div className="text-xs text-brand-gray">Best option</div>
              <div className="mt-1 font-semibold text-charcoal">{calc.label}</div>
              <div className="mt-1 text-lg font-bold text-brand-red">
                Estimated Total: ${calc.total.toLocaleString()}
              </div>
              {calc.discount < 1 && (
                <div className="mt-1 text-xs text-brand-red">{Math.round((1 - calc.discount) * 100)}% long-stay discount applied</div>
              )}
            </div>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid gap-7 lg:grid-cols-3 lg:items-stretch">
          <PriceCard
            tone="red"
            title="🛏️ Single Room"
            badge="Solo & Couples"
            price="65"
            unit="/night"
            sub="$32.50 per person"
            rows={[
              ["Nightly", "$65/night", ""],
              ["Weekly", "$399/week", "Save $56"],
              ["Monthly", "$1,300/mo", "Save $650"],
            ]}
            features={[
              "Private en-suite bathroom",
              "High-speed WiFi & DSTV",
              "Shared kitchen access",
              "Free parking",
            ]}
            cta={{ label: "Book a Room", href: WHATSAPP_BOOK, variant: "outline" }}
          />

          <PriceCard
            tone="featured"
            title="🏠 Entire Apartment"
            badge="Families & Groups"
            price="199"
            unit="/night"
            strike="$260/night"
            sub="$25/person · Save $61 vs rooms"
            rows={[
              ["Nightly", "$199", "Save $61"],
              ["Weekly", "$1,199/week", "Save $594"],
              ["Monthly", "$4,200/mo", "Save $1,900"],
            ]}
            features={[
              "All 4 rooms included",
              "Full kitchen & living area",
              "All en-suite bathrooms",
              "WiFi, DSTV & free parking",
              "Up to 8 guests",
            ]}
            cta={{ label: "Book Apartment", href: WHATSAPP_BOOK, variant: "solid" }}
          />

          <PriceCard
            tone="gold"
            title="🏘️ Entire Property"
            badge="Events & Corporate Retreats"
            price="499"
            unit="/night"
            strike="$597/night"
            sub="$21/person · Save $98 vs apartments"
            priceTextClass="text-charcoal"
            rows={[
              ["Nightly", "$499", "Save $98"],
              ["Weekly", "$2,999/week", "Save $1,194"],
              ["Monthly", "$10,500/mo", "Save $2,100"],
            ]}
            features={[
              "All 3 apartments (12 rooms)",
              "Up to 24 guests",
              "Exclusive full property use",
              "All kitchens & living areas",
              "Event & retreat ready",
            ]}
            cta={{ label: "Book Full Property", href: WHATSAPP_BOOK, variant: "gold" }}
          />
        </div>

        {/* Add-ons */}
        <div className="mt-12 rounded-xl bg-[#f3f4f6] p-8 sm:p-9">
          <h3 className="font-sans text-[22px] font-bold text-charcoal">✨ Enhance Your Stay</h3>
          <p className="mt-1 text-sm text-brand-gray">Optional extras available on request</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["🍳", "Breakfast", "$8/person/day"],
              ["🚗", "Airport Transfer", "$15 one way"],
              ["🕐", "Late Check-out", "$20 (until 2PM)"],
              ["🌅", "Early Check-in", "$20 (from 10AM)"],
              ["🧹", "Extra Cleaning", "$15"],
              ["🍼", "Baby Cot", "$10/night"],
            ].map(([e, s, p]) => (
              <div key={s} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                <span className="text-2xl">{e}</span>
                <div>
                  <div className="text-sm font-semibold text-charcoal">{s}</div>
                  <div className="text-xs text-brand-gray">{p}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discount strip */}
        <div className="mt-6 rounded-xl bg-gradient-to-br from-brand-red to-brand-red-dark px-8 py-7 text-white shadow-lg">
          <h3 className="text-center font-sans text-xl font-bold">📅 Stay Longer, Save More</h3>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/30">
            {[
              ["1–6 Nights", "Standard Rate"],
              ["7–29 Nights", "12% OFF"],
              ["30+ Nights", "25% OFF"],
              ["Corporate", "Custom + Invoice"],
            ].map(([d, r]) => (
              <div key={d} className="px-4 text-center">
                <div className="text-xs font-medium uppercase tracking-wider text-white/80">{d}</div>
                <div className="mt-1 text-lg font-bold">{r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stepper({ label, min, max, value, onChange }: { label: string; min: number; max: number; value: number; onChange: (n: number) => void }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-brand-gray">{label}</div>
      <div className="mt-2 flex items-center overflow-hidden rounded-lg border border-border">
        <button onClick={() => onChange(Math.max(min, value - 1))} className="h-12 w-12 text-lg font-bold text-charcoal hover:bg-brand-red-light">−</button>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Math.max(min, Math.min(max, Number(e.target.value) || min)))}
          className="h-12 flex-1 border-x border-border bg-white text-center font-semibold text-charcoal outline-none"
        />
        <button onClick={() => onChange(Math.min(max, value + 1))} className="h-12 w-12 text-lg font-bold text-charcoal hover:bg-brand-red-light">+</button>
      </div>
    </div>
  );
}

type PriceCardProps = {
  tone: "red" | "featured" | "gold";
  title: string;
  badge: string;
  price: string;
  unit: string;
  strike?: string;
  sub: string;
  priceTextClass?: string;
  rows: [string, string, string][];
  features: string[];
  cta: { label: string; href: string; variant: "solid" | "outline" | "gold" };
};

function PriceCard({ tone, title, badge, price, unit, strike, sub, priceTextClass = "text-brand-red", rows, features, cta }: PriceCardProps) {
  const wrap =
    tone === "featured"
      ? "relative rounded-xl bg-white shadow-2xl border-t-4 border-brand-red lg:scale-[1.04] lg:z-10"
      : tone === "gold"
      ? "relative rounded-xl bg-white border-2 border-brand-gold shadow-md"
      : "relative rounded-xl bg-white border border-border shadow-md";

  const headerBar =
    tone === "gold"
      ? "bg-brand-gold text-charcoal"
      : "bg-brand-red text-white";

  const ctaBtn =
    cta.variant === "solid"
      ? "bg-brand-red text-white hover:bg-brand-red-dark h-[52px]"
      : cta.variant === "gold"
      ? "bg-brand-gold text-charcoal hover:brightness-95 h-12"
      : "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white h-12";

  return (
    <div className={wrap}>
      {tone === "featured" && (
        <div className="absolute -top-3 right-5 rounded bg-brand-gold px-3 py-1 text-[11px] font-bold text-charcoal shadow">
          ⭐ MOST POPULAR
        </div>
      )}
      <div className={`flex items-center justify-between rounded-t-xl px-5 py-4 font-semibold ${headerBar}`}>
        <span>{title}</span>
      </div>

      <div className="p-6">
        <span className="inline-block rounded bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-brand-gray">{badge}</span>

        <div className="mt-5">
          {strike && <div className="text-[18px] text-brand-gray line-through">{strike}</div>}
          <div className="flex items-baseline gap-2">
            <span className={`font-display text-[42px] font-bold leading-none ${priceTextClass} sm:text-[52px] ${tone === "featured" ? "sm:text-[64px]" : ""}`}>${price}</span>
            <span className="text-lg text-brand-gray">{unit}</span>
          </div>
          <div className="mt-1 text-sm italic text-brand-gray">{sub}</div>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-border">
          {rows.map((r, i) => (
            <div key={i} className={`grid grid-cols-3 px-4 py-2.5 text-sm ${i % 2 ? "bg-brand-bg" : "bg-white"}`}>
              <span className="text-brand-gray">{r[0]}</span>
              <span className="font-semibold text-charcoal">{r[1]}</span>
              <span className="text-right text-xs text-brand-red">{r[2] && `${r[2]} ✓`}</span>
            </div>
          ))}
        </div>

        <ul className="mt-5 space-y-2 text-sm text-charcoal">
          {features.map((f) => (
            <li key={f} className="flex gap-2"><span className="text-brand-red">✓</span><span>{f}</span></li>
          ))}
        </ul>

        <a
          href={cta.href}
          target="_blank"
          rel="noreferrer"
          className={`mt-6 flex w-full items-center justify-center rounded font-semibold transition ${ctaBtn}`}
        >
          {cta.label}
        </a>
      </div>
    </div>
  );
}

/* ---------------- Amenities ---------------- */
function Amenities() {
  const items = [
    ["📶", "High-Speed WiFi"], ["🧹", "Housekeeping"], ["🛋️", "Fully Furnished"], ["🔥", "Smoke Alarms"],
    ["📺", "DSTV Included"], ["🚿", "Hot Water"], ["🌿", "Outdoor Space"], ["🧯", "Fire Extinguisher"],
    ["🍳", "Full Kitchen"], ["🔒", "24/7 Security"], ["🏋️", "Exercise Equipment"], ["🩺", "First Aid Kit"],
    ["💼", "Workspace"], ["🚗", "Free Parking"], ["🍽️", "Breakfast Option"], ["🅿️", "2 Cars/Apartment"],
  ];
  return (
    <section id="amenities" className="bg-brand-red py-16 sm:py-24 text-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-5">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">What's Included</div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-[48px]">Everything You Need, Already Here</h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map(([e, l]) => (
            <div key={l} className="rounded-lg border border-white/15 bg-white/10 px-4 py-6 text-center transition hover:bg-white/20">
              <div className="text-4xl">{e}</div>
              <div className="mt-3 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Location ---------------- */
function Location() {
  const dests: [string, string, string][] = [
    ["📍", "Intare Conference Arena", "200m (2 min walk)"],
    ["✈️", "Kigali International Airport", "5km / 10 min"],
    ["🏥", "Kigali Health City", "10 min drive"],
    ["🏙️", "Kigali City Centre", "20 min drive"],
    ["🛒", "Nearest Supermarket", "1km"],
    ["🏦", "Nearest Bank / ATM", "2km"],
  ];

  return (
    <section id="location" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-5">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Find Us</div>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal sm:text-[48px]">Perfectly Located in Kigali</h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[45%_55%] lg:items-start">
          <div>
            <p className="text-base leading-[1.8] text-brand-gray">
              Nestled in the peaceful Rusororo area of Gasabo District, Triple G Apartments places you minutes from Kigali's key destinations.
            </p>
            <p className="mt-3 text-sm italic leading-[1.8] text-brand-gray">
              Located just 10 minutes from Kigali Health City in Masaka, Triple G Apartments offers convenient accommodation near CHUK, IRCAD Africa, and the Heart Center in Kigali.
            </p>

            <div className="mt-6 space-y-3">
              {dests.map(([e, name, dist]) => (
                <div key={name} className="flex items-center justify-between gap-3 rounded-lg bg-white px-4 py-3.5 shadow-sm ring-1 ring-border sm:px-5">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="shrink-0 text-xl">{e}</span>
                    <span className="min-w-0 text-sm font-medium text-charcoal">{name}</span>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-brand-red">{dist}</span>
                </div>
              ))}
            </div>

            <div className="my-6 rounded-lg border-2 border-brand-gold bg-white px-4 py-4 sm:px-5">
              <div className="text-sm font-bold text-charcoal sm:text-base">📅 Check-in: 2:00 PM <span className="hidden sm:inline">&nbsp;|&nbsp;</span><span className="sm:hidden"><br/></span>Check-out: 11:00 AM</div>
              <div className="mt-1 text-xs text-brand-gray">Early check-in & late check-out available (fee applies)</div>
            </div>

            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex h-12 w-full items-center justify-center rounded-lg bg-[#25d366] font-semibold text-white transition hover:brightness-110">
              💬 Need Directions? WhatsApp Us
            </a>
          </div>

          <div className="overflow-hidden rounded-xl shadow-lg">
            <iframe
              title="Triple G Apartments Map"
              src="https://www.google.com/maps?q=Rusororo,Kigali,Rwanda&output=embed"
              width="100%"
              className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/3]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */
function Gallery({ onOpen }: { onOpen: (url: string) => void }) {
  return (
    <section id="gallery" className="bg-brand-bg py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-5">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Photo Gallery</div>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal sm:text-[48px]">A Glimpse Inside Triple G</h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <button
              key={i}
              onClick={() => onOpen(g.url)}
              className={`group relative aspect-[4/3] overflow-hidden rounded-lg sm:aspect-square ${g.span ? "md:col-span-2 md:aspect-[16/9]" : ""}`}
            >
              <img src={g.url} alt={g.alt} className="h-full w-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 grid place-items-center bg-brand-red/0 text-white opacity-0 transition group-hover:bg-brand-red/30 group-hover:opacity-100">
                <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur">🔍 View</span>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-sm italic text-brand-gray">
          📸 Real property photos coming soon. Contact us for a virtual tour via WhatsApp.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const cards = [
    {
      text: "Excellent location — just minutes from the conference arena. The apartment was spotless and the WiFi was fast and reliable. Perfect for my business trip to Kigali. I will definitely be back.",
      name: "James M.",
      role: "Business Traveler · Nairobi, Kenya",
    },
    {
      text: "We booked the entire property for a family gathering and it was absolutely perfect. Spacious, clean, modern — and the team responded instantly on WhatsApp. Highly recommended for large groups!",
      name: "Diane K.",
      role: "Family Guest · Kigali, Rwanda",
    },
    {
      text: "I was in Kigali for a medical conference near Health City and Triple G was the most convenient and comfortable option I found. Great value for money and a very professional, responsive team.",
      name: "Dr. Ahmed R.",
      role: "Medical Professional · Dubai, UAE",
    },
  ];

  return (
    <section id="testimonials" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-5">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Guest Reviews</div>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal sm:text-[48px]">What Our Guests Say</h2>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.name} className="relative overflow-hidden rounded-xl border-t-4 border-brand-red bg-white p-8 shadow-md">
              <span className="pointer-events-none absolute left-4 top-1 font-display text-[80px] leading-none font-bold text-brand-red/10">❝</span>
              <div className="relative">
                <div className="text-xl text-brand-gold">★★★★★</div>
                <p className="mt-4 text-[15px] italic leading-[1.8] text-brand-gray">{c.text}</p>
                <div className="mt-6">
                  <div className="text-lg font-bold text-charcoal">{c.name}</div>
                  <div className="text-[13px] text-brand-red">{c.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-brand-gray">
          * Testimonials based on guest feedback. Share your experience →{" "}
          <a className="font-semibold text-brand-red hover:underline" href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a>
        </p>
      </div>
    </section>
  );
}

/* ---------------- Booking ---------------- */
function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Not sure",
    checkin: "",
    checkout: "",
    guests: 2,
    notes: "",
  });

  const nights = useMemo(() => {
    if (!form.checkin || !form.checkout) return 0;
    const ms = new Date(form.checkout).getTime() - new Date(form.checkin).getTime();
    return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
  }, [form.checkin, form.checkout]);

  const rate = form.type.includes("$65") ? 65 : form.type.includes("$199") ? 199 : form.type.includes("$499") ? 499 : 0;
  const discount = nights >= 30 ? 0.75 : nights >= 7 ? 0.88 : 1;
  const estimate = Math.round(rate * nights * discount);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}%0AEmail: ${form.email}%0APhone/WhatsApp: ${form.phone}%0ABooking type: ${form.type}%0ACheck-in: ${form.checkin}%0ACheck-out: ${form.checkout}%0AGuests: ${form.guests}%0ANights: ${nights}%0AEstimated total: $${estimate}%0A%0ASpecial requests:%0A${encodeURIComponent(form.notes)}`;
    window.location.href = `mailto:${EMAIL}?subject=Booking%20Inquiry%20-%20Triple%20G%20Apartments&body=${body}`;
  };

  const input = "h-12 w-full rounded-lg border border-border bg-white px-4 text-sm text-charcoal outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20";

  return (
    <section id="booking" className="bg-brand-bg py-16 sm:py-24">
      <a id="contact" className="block -mt-24 pt-24" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-5">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">Book Now</div>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal sm:text-[48px]">Ready to Book? Let's Make It Happen</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-brand-gray">We respond within 1 hour · 7 days a week</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[40%_60%] lg:items-start">
          <div>
            <a href={WHATSAPP_BOOK} target="_blank" rel="noreferrer" className="flex h-14 w-full flex-col items-center justify-center rounded-lg bg-[#25d366] text-white shadow-lg transition hover:brightness-110">
              <span className="text-base font-bold">💬 WhatsApp Us Now — Fastest Response</span>
            </a>
            <div className="mt-1 text-center text-xs text-brand-gray">Typically under 1 hour response</div>

            <div className="my-6 text-center text-[13px] text-brand-gray">— or contact us directly —</div>

            <ul className="space-y-3">
              {[
                ["📞", "Phone", PHONE, `tel:${PHONE}`],
                ["✉️", "Email", EMAIL, `mailto:${EMAIL}`],
                ["📍", "Address", "Rusororo, Gasabo District, Kigali, Rwanda", ""],
                ["🕐", "Hours", "Check-in: 2:00 PM | Check-out: 11:00 AM", ""],
              ].map(([e, l, v, href]) => (
                <li key={l} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <span className="shrink-0 text-xl">{e}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold uppercase tracking-wider text-brand-gray">{l}</div>
                    {href ? (
                      <a href={href} className="block break-words text-sm font-medium text-charcoal hover:text-brand-red">{v}</a>
                    ) : (
                      <div className="break-words text-sm font-medium text-charcoal">{v}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-gray">Payment Options</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["💵 USD Cash", "🇷🇼 RWF Cash", "📱 MTN MoMo", "📱 Airtel Money", "💳 Bank Transfer"].map((p) => (
                  <span key={p} className="rounded-md border border-border bg-white px-3 py-1.5 text-[13px] text-charcoal">{p}</span>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="rounded-2xl bg-white p-5 shadow-lg sm:p-7 lg:p-10">
            <h3 className="font-display text-2xl font-bold text-charcoal">Send a Booking Inquiry</h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
              </Field>
              <Field label="Email Address">
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
              </Field>
              <Field label="Phone / WhatsApp">
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
              </Field>
              <Field label="Booking Type">
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={input}>
                  <option>Single Room ($65/night)</option>
                  <option>Entire Apartment ($199/night)</option>
                  <option>Entire Property — All 3 ($499/night)</option>
                  <option>Not sure — recommend for me</option>
                </select>
              </Field>
              <Field label="Check-in Date">
                <input type="date" value={form.checkin} onChange={(e) => setForm({ ...form, checkin: e.target.value })} className={input} />
              </Field>
              <Field label="Check-out Date">
                <input type="date" value={form.checkout} onChange={(e) => setForm({ ...form, checkout: e.target.value })} className={input} />
              </Field>
              <Field label="Number of Guests (max 24)">
                <input type="number" min={1} max={24} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} className={input} />
              </Field>
            </div>

            <Field label="Special Requests" className="mt-4">
              <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${input} h-auto py-3`} />
            </Field>

            {rate > 0 && nights > 0 && (
              <div className="mt-4 rounded-lg border border-[#fca5a5] bg-brand-red-light px-5 py-3.5">
                <div className="text-base font-bold text-brand-red">💰 Estimated Total: ${estimate.toLocaleString()}</div>
                <div className="mt-0.5 text-[13px] text-brand-gray">{nights} nights × {form.type}</div>
              </div>
            )}

            <button type="submit" className="mt-5 flex h-[52px] w-full items-center justify-center rounded-lg bg-brand-red font-semibold text-white transition hover:bg-brand-red-dark">
              Send Booking Inquiry →
            </button>
            <p className="mt-3 text-center text-sm text-brand-gray">We'll respond within 1 hour via WhatsApp or email</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-brand-gray">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const links = NAV.concat({ id: "booking", label: "Book Now" });
  return (
    <footer className="border-t-[3px] border-brand-red bg-charcoal text-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-5 pt-16 pb-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-red text-sm font-bold text-white">TG</span>
              <span className="font-display text-[22px] font-bold text-brand-gold">Triple G Apartments</span>
            </div>
            <p className="mt-4 text-sm leading-[1.8] text-white/70">Your Home Away From Home in Kigali</p>
            <span className="mt-4 inline-block rounded border border-brand-gold px-3.5 py-1.5 text-xs font-semibold text-brand-gold">🏆 RHA Member</span>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Quick Links</div>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {links.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-sm text-white/70 transition hover:text-brand-gold">{l.label}</a>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-1 text-sm text-white/60">
              <div>• Single Room from $65/night</div>
              <div>• Apartment from $199/night</div>
              <div>• Full Property from $499/night</div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Contact Us</div>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>📞 <a href={`tel:${PHONE}`} className="hover:text-brand-gold">+250 788 300 194</a></li>
              <li>✉️ <a href={`mailto:${EMAIL}`} className="hover:text-brand-gold break-all">{EMAIL}</a></li>
              <li>📍 Rusororo, Gasabo District, Kigali, Rwanda</li>
              <li>🕐 Check-in 2PM | Check-out 11AM</li>
            </ul>
            <div className="mt-5">
              <div className="text-xs uppercase tracking-wider text-white/50">Coming Soon</div>
              <div className="mt-2 flex gap-2">
                <span className="rounded border border-white/15 px-3 py-1 text-xs text-white/50">Facebook</span>
                <span className="rounded border border-white/15 px-3 py-1 text-xs text-white/50">Instagram</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-5 text-center text-[13px] text-white/50">
          © 2026 Triple G Apartments Ltd. All rights reserved. | Kigali, Rwanda
        </div>
      </div>
    </footer>
  );
}
