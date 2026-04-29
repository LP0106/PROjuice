"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Database,
  Gauge,
  Inbox,
  PackageCheck,
  RefreshCw,
  ShieldCheck
} from "lucide-react";

const endpointConfig = [
  { key: "products", label: "Products API", method: "GET", url: "/api/products", icon: PackageCheck },
  { key: "leads", label: "Leads API", method: "GET / POST", url: "/api/leads", icon: Inbox },
  { key: "admin", label: "Admin summary", method: "GET", url: "/api/admin/summary", icon: ShieldCheck }
];

async function readJson(url) {
  const started = performance.now();
  const response = await fetch(url, { cache: "no-store" });
  let payload = {};

  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  return {
    ok: response.ok,
    status: response.status,
    ms: Math.max(1, Math.round(performance.now() - started)),
    payload
  };
}

export default function BackendBridge() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [snapshot, setSnapshot] = useState({
    loading: true,
    endpoints: {},
    products: [],
    leadsTotal: 0,
    latestLead: null,
    summary: null,
    lastSynced: ""
  });

  const syncBackend = useCallback(async () => {
    setSnapshot((current) => ({ ...current, loading: true }));

    const [productsResult, leadsResult, adminResult] = await Promise.allSettled([
      readJson("/api/products"),
      readJson("/api/leads"),
      readJson("/api/admin/summary")
    ]);

    const products = productsResult.status === "fulfilled" ? productsResult.value : null;
    const leads = leadsResult.status === "fulfilled" ? leadsResult.value : null;
    const admin = adminResult.status === "fulfilled" ? adminResult.value : null;

    setSnapshot({
      loading: false,
      endpoints: {
        products,
        leads,
        admin
      },
      products: products?.payload?.products || [],
      leadsTotal: leads?.payload?.total || 0,
      latestLead: leads?.payload?.latest?.[0] || null,
      summary: admin?.payload?.summary || null,
      lastSynced: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    });
  }, []);

  useEffect(() => {
    syncBackend();

    const handleLeadCreated = () => {
      setPulse(true);
      syncBackend();
      window.setTimeout(() => setPulse(false), 900);
    };

    window.addEventListener("projuice:lead-created", handleLeadCreated);
    return () => window.removeEventListener("projuice:lead-created", handleLeadCreated);
  }, [syncBackend]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    const syncScroll = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const track = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(Math.max((window.innerHeight * 0.22 - rect.top) / track, 0), 1);
      const nextStep = Math.min(3, Math.floor(progress * 4));

      section.style.setProperty("--bridge-progress", progress.toFixed(3));
      section.style.setProperty("--bridge-tilt", reducedMotion ? "0deg" : `${(progress - 0.5) * 8}deg`);
      section.style.setProperty("--bridge-shift", reducedMotion ? "0px" : `${(progress - 0.5) * -90}px`);
      setActiveStep((current) => (current === nextStep ? current : nextStep));
    };

    const requestSync = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(syncScroll);
      }
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  const phases = useMemo(
    () => [
      {
        label: "01",
        title: "Product content loads from the backend",
        detail: `${snapshot.products.length || 0} live flavours are feeding the public product selector.`,
        value: `${snapshot.products.length || 0} flavours`
      },
      {
        label: "02",
        title: "Visitors submit real enquiries",
        detail: "The public form writes through POST /api/leads with backend validation.",
        value: "POST ready"
      },
      {
        label: "03",
        title: "Lead data becomes an admin signal",
        detail: snapshot.latestLead
          ? `${snapshot.latestLead.organisation || "Latest enquiry"} is now visible in the lead stream.`
          : "Recent enquiries are ready for the admin dashboard.",
        value: `${snapshot.leadsTotal} leads`
      },
      {
        label: "04",
        title: "Dashboard summaries close the loop",
        detail: "The admin view reads the same source through /api/admin/summary.",
        value: snapshot.summary ? `${snapshot.summary.metrics?.[0]?.value?.toLocaleString() || 0} total` : "Synced"
      }
    ],
    [snapshot]
  );

  return (
    <section id="backend" className={pulse ? "section backend-bridge fx-reveal is-pulsing" : "section backend-bridge fx-reveal"} ref={sectionRef}>
      <div className="bridge-layout">
        <div className="bridge-copy">
          <span className="api-sync-note is-live">
            <Activity size={15} />
            Live full-stack link
          </span>
          <h2>Public site, API routes and admin dashboard now move as one system.</h2>
          <p>
            Products load from the backend, enquiries write through the lead API, and the admin dashboard reads the same launch
            summary. The panel reacts as the page moves, so the data flow is visible instead of hidden in code.
          </p>

          <div className="api-status-grid">
            {endpointConfig.map(({ key, label, method, url, icon: Icon }) => {
              const endpoint = snapshot.endpoints[key];
              const live = endpoint?.ok;
              return (
                <article className={live ? "api-status-card is-live" : "api-status-card"} key={key}>
                  <Icon size={19} />
                  <div>
                    <strong>{label}</strong>
                    <span>
                      {method} {url}
                    </span>
                  </div>
                  <em>{endpoint ? `${endpoint.status} · ${endpoint.ms}ms` : "Syncing"}</em>
                </article>
              );
            })}
          </div>
        </div>

        <div className="bridge-stage" data-depth="0.28">
          <div className="bridge-signal">
            <span />
          </div>
          <div className="bridge-orbit-map" aria-hidden="true">
            <div className="bridge-core">
              <Database size={28} />
              API
            </div>
            {endpointConfig.map(({ key, label }, index) => (
              <span
                className={snapshot.endpoints[key]?.ok ? "orbit-node is-live" : "orbit-node"}
                key={key}
                style={{
                  "--node-angle": `${index * 120 - 90}deg`,
                  "--node-angle-back": `${90 - index * 120}deg`
                }}
              >
                {label.split(" ")[0]}
              </span>
            ))}
          </div>

          <div className="bridge-metrics">
            <article>
              <PackageCheck size={18} />
              <strong>{snapshot.products.length || "--"}</strong>
              <span>Flavours</span>
            </article>
            <article>
              <Inbox size={18} />
              <strong>{snapshot.leadsTotal}</strong>
              <span>Lead records</span>
            </article>
            <article>
              <Gauge size={18} />
              <strong>{snapshot.lastSynced || "--:--"}</strong>
              <span>Last sync</span>
            </article>
          </div>

          <button className="bridge-refresh" type="button" onClick={syncBackend} disabled={snapshot.loading}>
            <RefreshCw size={16} />
            Refresh API
          </button>
        </div>
      </div>

      <div className="bridge-steps">
        {phases.map((phase, index) => (
          <article className={index === activeStep ? "bridge-step is-active" : "bridge-step"} key={phase.label}>
            <span>{phase.label}</span>
            <h3>{phase.title}</h3>
            <p>{phase.detail}</p>
            <strong>
              {phase.value}
              {index === activeStep ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
            </strong>
          </article>
        ))}
      </div>
    </section>
  );
}
