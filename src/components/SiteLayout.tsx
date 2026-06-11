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
            <a href="tel:+971543379384" className="text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
              <Phone className="w-4 h-4 text-[oklch(0.82_0.13_85)]" /> +971 54 337 9384
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
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[oklch(0.82_0.13_85)] flex-shrink-0" /> 1501 The Tower Plaza, Sheikh Zayed Road, Dubai, UAE</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[oklch(0.82_0.13_85)]" /> <a href="tel:+971543379384" className="hover:text-foreground">+971 54 337 9384</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[oklch(0.82_0.13_85)]" /> <a href="mailto:Info@hingolmarketing.com" className="hover:text-foreground">Info@hingolmarketing.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Hingol Marketing. All rights reserved.</div>
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
