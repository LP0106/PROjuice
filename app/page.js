import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Download,
  Dumbbell,
  Leaf,
  PackageCheck,
  Sparkles,
  Users,
  Zap
} from "lucide-react";
import BackendBridge from "@/components/BackendBridge";
import FlavorShowcase from "@/components/FlavorShowcase";
import HeroMotion from "@/components/HeroMotion";
import LeadForm from "@/components/LeadForm";
import ProductStage from "@/components/ProductStage";
import ScrollFX from "@/components/ScrollFX";
import SiteHeader from "@/components/SiteHeader";
import { channels, products, reportLinks } from "@/lib/site-data";

const benefits = [
  {
    icon: Leaf,
    title: "Real fruit first",
    text: "Premium fruit-led taste cues instead of a chalky supplement signal."
  },
  {
    icon: Dumbbell,
    title: "20g protein",
    text: "Clear functional value for gym, campus and busy workday routines."
  },
  {
    icon: Zap,
    title: "High-energy launch",
    text: "Motion, colour and sampling moments built for social discovery."
  }
];

export default function HomePage() {
  return (
    <>
      <ScrollFX />
      <SiteHeader />

      <main>
        <section className="hero-section">
          <HeroMotion />
          <div className="hero-grid">
            <div className="hero-copy fx-reveal is-visible">
              <h1>Real fruit energy. Serious protein.</h1>
              <p>
                PROjuice is a premium fruit-protein drink platform for students, gym users and busy young professionals,
                now rebuilt with lead capture, launch analytics and a live admin backend.
              </p>
              <div className="hero-actions">
                <Link className="primary-button" href="#enquire">
                  Pre-order or enquire
                  <ArrowRight size={18} />
                </Link>
                <Link className="secondary-button" href="#partners">
                  For campuses and gyms
                </Link>
              </div>
              <div className="hero-proof">
                <span>20g protein</span>
                <span>3 launch flavours</span>
                <span>API-backed enquiries</span>
              </div>
            </div>

            <div className="hero-stage-wrap fx-reveal is-visible">
              <ProductStage products={products} />
            </div>
          </div>

          <div className="flavour-dock" aria-label="Launch flavour summary">
            {products.map((product) => (
              <article key={product.id} style={{ "--dock-color": product.color }}>
                <span />
                <strong>{product.name}</strong>
                <small>{product.tone}</small>
              </article>
            ))}
          </div>
        </section>

        <FlavorShowcase products={products} />

        <BackendBridge />

        <section id="benefits" className="section benefits-section fx-reveal">
          <div className="section-heading">
            <h2>Designed to feel alive without making the interface heavy.</h2>
            <p>
              The new experience uses layered motion, GPU-friendly transforms and a mobile-first fallback to keep the site smooth.
            </p>
          </div>
          <div className="benefit-grid">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article className="benefit-card" key={title}>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="partners" className="section partner-section fx-reveal">
          <div className="partner-copy">
            <h2>Launch channels with a proper middle layer.</h2>
            <p>
              The public site now connects to backend lead capture, while the admin view tracks channel intent, product interest and
              recent enquiries for the next sales action.
            </p>
            <Link className="text-link" href="/admin">
              Open admin dashboard
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="channel-orbit">
            {channels.map((channel, index) => (
              <article className="channel-card" key={channel.name} style={{ "--card-delay": `${index * 80}ms` }}>
                <span>{channel.share}%</span>
                <h3>{channel.name}</h3>
                <p>{channel.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section system-section fx-reveal">
          <div className="system-card">
            <div>
              <PackageCheck size={28} />
              <h2>Full-stack launch flow</h2>
              <p>
                Product content, form submissions, API validation and dashboard summaries now live in one Next.js application.
              </p>
            </div>
            <div className="system-flow">
              <span>Public site</span>
              <i />
              <span>Lead API</span>
              <i />
              <span>Local store</span>
              <i />
              <span>Admin dashboard</span>
            </div>
          </div>
          <div className="admin-preview">
            <div className="preview-sidebar">
              <strong>PROjuice Admin</strong>
              <span>Overview</span>
              <span>Leads</span>
              <span>Partners</span>
            </div>
            <div className="preview-main">
              <div className="preview-metrics">
                <article>
                  <Users size={18} />
                  <strong>1,248</strong>
                  <span>Total leads</span>
                </article>
                <article>
                  <BarChart3 size={18} />
                  <strong>842</strong>
                  <span>Qualified</span>
                </article>
                <article>
                  <Building2 size={18} />
                  <strong>28</strong>
                  <span>Partners</span>
                </article>
              </div>
              <div className="preview-chart" />
            </div>
          </div>
        </section>

        <section id="enquire" className="section enquire-section fx-reveal">
          <div className="section-heading">
            <h2>Capture pre-orders, campus partnerships and stockist interest.</h2>
            <p>
              Submissions are validated by the backend and appear in the admin dashboard immediately during local development.
            </p>
          </div>
          <LeadForm products={products} />
        </section>

        <section className="section downloads-section fx-reveal">
          <div className="section-heading">
            <h2>Reports stay available inside the new platform.</h2>
            <p>The existing classroom-ready PDF deliverables are now served from the Next.js public asset layer.</p>
          </div>
          <div className="download-grid">
            {reportLinks.map((report) => (
              <a className="download-card" href={report.href} key={report.href}>
                <Download size={22} />
                <strong>{report.title}</strong>
                <span>{report.description}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <strong>PROjuice</strong>
        <span>Fruit protein drinks for active routines.</span>
        <span>
          <Sparkles size={16} /> Dynamic full-stack launch site
        </span>
      </footer>
    </>
  );
}
