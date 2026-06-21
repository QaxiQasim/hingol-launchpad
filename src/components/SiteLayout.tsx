import { Link } from "@tanstack/react-router";
import logo from "../lib/images/logo.png";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Phone, Mail, MapPin, ArrowRight, Linkedin, Instagram, Facebook } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const SERVICES = [
  { to: "/services/seo", label: "SEO" },
  { to: "/services/social-media-marketing", label: "Social Media" },
  { to: "/services/ppc-advertising", label: "PPC & Ads" },
  { to: "/services/website-development", label: "Web Development" },
  { to: "/services/app-development", label: "App Development" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container-px mx-auto max-w-7xl flex items-center justify-between py-3">
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="Hingol Marketing Logo" 
              className="h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105" 
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "px-4 py-2 text-sm font-semibold text-foreground" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+971585630337" className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
              <Phone className="w-4 h-4 text-[oklch(0.82_0.13_85)]" /> +971 58 563 0337
            </a>
            <Link to="/contact" className="btn-gold text-sm">
              Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-lg border border-border flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in">
            <div className="container-px mx-auto max-w-7xl py-6 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg text-base font-medium hover:bg-secondary"
                >
                  {n.label}
                </Link>
              ))}
              <div className="border-t border-border my-3" />
              <div className="text-xs uppercase tracking-widest text-muted-foreground px-4 mb-2">Services</div>
              {SERVICES.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {s.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-4">
                Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pt-20">{children}</main>

      <SiteFooter />

      {/* Floating WhatsApp Live Chat */}
      <a
        href="https://wa.me/971543379384?text=Hi%20Hingol%20Marketing%2C%20I'm%20interested%20in%20your%20services%20and%20would%20like%20to%20get%20more%20details."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute right-16 bg-[oklch(0.2_0.025_255)] text-foreground text-xs font-semibold px-3 py-1.5 rounded-lg border border-border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[oklch(0.13_0.02_250)] mt-20">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center mb-5 group">
              <img 
                src={logo} 
                alt="Hingol Marketing Logo" 
                className="h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105" 
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              A premium digital marketing agency in Dubai helping brands across the UAE, GCC,
              Europe, and beyond grow with SEO, performance marketing, web & app development.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/company/hinolmarketing" },
                { Icon: Instagram, href: "https://www.instagram.com/hingolmarketing/" },
                { Icon: Facebook, href: "https://www.facebook.com/Hingolmarketing" }
              ].map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  target={href !== "#" ? "_blank" : undefined} 
                  rel={href !== "#" ? "noopener noreferrer" : undefined} 
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-[oklch(0.82_0.13_85)] hover:border-[oklch(0.82_0.13_85)] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-sm font-semibold mb-4">Company</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
              <li><Link to="/case-studies" className="hover:text-foreground">Case Studies</Link></li>
              <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link to="/sitemap" className="hover:text-foreground">Sitemap</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-sm font-semibold mb-4">Services</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {SERVICES.map((s) => (
                <li key={s.to}><Link to={s.to} className="hover:text-foreground">{s.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-sm font-semibold mb-4">Contact</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[oklch(0.82_0.13_85)] flex-shrink-0" /> 1302 The Tower Plaza, Sheikh Zayed Road, Dubai, UAE</li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-[oklch(0.82_0.13_85)] flex-shrink-0" />
                <div className="flex flex-col gap-1.5">
                  <a href="tel:+971585630337" className="hover:text-foreground transition-colors">+971 58 563 0337</a>
                  <a href="tel:+971543379384" className="hover:text-foreground transition-colors">+971 54 337 9384</a>
                </div>
              </li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[oklch(0.82_0.13_85)]" /> <a href="mailto:Info@hingolmarketing.com" className="hover:text-foreground">Info@hingolmarketing.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Hingol Marketing. All rights reserved. · <Link to="/sitemap" className="hover:underline hover:text-foreground">Sitemap</Link></div>
          <div>Digital Marketing Agency in Dubai · UAE · GCC</div>
        </div>
      </div>
    </footer>
  );
}

export function CTASection({
  title = "Ready to scale your brand in Dubai and beyond?",
  subtitle = "Book a free 30-minute strategy call with our senior marketing consultants. No obligations — just clear, actionable insights.",
  primary = "Book a Strategy Call",
  secondary = "Request a Free Website Audit",
}: {
  title?: string;
  subtitle?: string;
  primary?: string;
  secondary?: string;
}) {
  return (
    <section className="section-y">
      <div className="container-px mx-auto max-w-6xl">
        <div className="card-surface p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
          <div className="relative">
            <span className="eyebrow mb-5">Let's talk growth</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-5 max-w-3xl mx-auto">{title}</h2>
            <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-base md:text-lg">{subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Link to="/contact" className="btn-gold">{primary} <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/contact" className="btn-ghost">{secondary}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: { eyebrow?: string; title: string; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-12`}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-3xl md:text-5xl font-bold mt-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-4 text-base md:text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  highlight,
}: { eyebrow: string; title: string; subtitle: string; highlight?: string }) {
  return (
    <section className="relative bg-hero">
      <div className="container-px mx-auto max-w-7xl pt-16 pb-20 md:pt-24 md:pb-28 text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="text-4xl md:text-6xl font-bold mt-6 max-w-4xl mx-auto leading-tight">
          {title} {highlight && <span className="text-gradient-gold">{highlight}</span>}
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link to="/contact" className="btn-gold">Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/contact" className="btn-ghost">Request Proposal</Link>
        </div>
      </div>
    </section>
  );
}
