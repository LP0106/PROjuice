"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  Inbox,
  Package,
  ShieldCheck,
  Trash2
} from "lucide-react";

function Sparkline({ values }) {
  const points = useMemo(() => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(max - min, 1);
    return values
      .map((value, index) => {
        const x = (index / Math.max(values.length - 1, 1)) * 100;
        const y = 100 - ((value - min) / range) * 82 - 8;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }, [values]);

  return (
    <svg className="sparkline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} />
    </svg>
  );
}

export default function AdminDashboard({ initialSummary = null, initialDemoMode = false }) {
  const [pass, setPass] = useState("");
  const [summary, setSummary] = useState(initialSummary);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(!initialSummary);
  const [demoMode, setDemoMode] = useState(initialDemoMode);
  const [actionId, setActionId] = useState("");

  const adminHeaders = (nextPass = pass, json = false) => ({
    ...(json ? { "Content-Type": "application/json" } : {}),
    ...(nextPass ? { "x-admin-pass": nextPass } : {})
  });

  const loadSummary = async (nextPass = pass) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/summary", {
        headers: adminHeaders(nextPass)
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to load admin data.");
      }

      setSummary(payload.summary);
      setDemoMode(Boolean(payload.demoMode));
      if (nextPass) {
        window.localStorage.setItem("projuice-admin-pass", nextPass);
      }
    } catch (requestError) {
      setSummary(null);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const updateLead = async (leadId, status) => {
    setActionId(`${leadId}:${status}`);
    setError("");

    try {
      const response = await fetch(`/api/admin/leads/${encodeURIComponent(leadId)}`, {
        method: "PATCH",
        headers: adminHeaders(pass, true),
        body: JSON.stringify({ status })
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to update lead.");
      }

      await loadSummary(pass);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setActionId("");
    }
  };

  const removeLead = async (leadId) => {
    setActionId(`${leadId}:delete`);
    setError("");

    try {
      const response = await fetch(`/api/admin/leads/${encodeURIComponent(leadId)}`, {
        method: "DELETE",
        headers: adminHeaders(pass)
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to delete lead.");
      }

      await loadSummary(pass);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setActionId("");
    }
  };

  useEffect(() => {
    if (initialSummary) {
      return;
    }

    const stored = window.localStorage.getItem("projuice-admin-pass") || "";
    setPass(stored);
    loadSummary(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/">
          <span className="brand-mark">PJ</span>
          <strong>PROjuice Admin</strong>
        </Link>
        <nav>
          <a className="is-active" href="#overview">
            <BarChart3 size={17} /> Overview
          </a>
          <a href="#leads">
            <Inbox size={17} /> Leads
          </a>
          <a href="#partners">
            <Building2 size={17} /> Partners
          </a>
          <a href="#products">
            <Package size={17} /> Products
          </a>
        </nav>
        <Link className="back-link" href="/">
          <ArrowLeft size={17} /> Public site
        </Link>
      </aside>

      <section className="admin-content" id="overview">
        <div className="admin-topbar">
          <div>
            <p>Launch command centre</p>
            <h1>Lead, channel and product performance</h1>
          </div>
          <div className="admin-date">
            <CalendarDays size={17} />
            April 2026
          </div>
        </div>

        {!summary && (
          <form
            className="admin-login"
            onSubmit={(event) => {
              event.preventDefault();
              loadSummary(pass);
            }}
          >
            <ShieldCheck size={24} />
            <h2>Admin access</h2>
            <p>Enter the passcode from `PROJUICE_ADMIN_PASS`. If no passcode is configured, the dashboard opens in demo mode.</p>
            <input
              value={pass}
              onChange={(event) => setPass(event.target.value)}
              placeholder="Admin passcode"
              type="password"
              autoComplete="new-password"
            />
            <button className="primary-button" type="submit" disabled={loading}>
              Load dashboard
            </button>
            {error && <span>{error}</span>}
          </form>
        )}

        {summary && (
          <>
            {demoMode && (
              <div className="demo-note">
                Demo admin mode is active. Set `PROJUICE_ADMIN_PASS` before production deployment.
              </div>
            )}

            <div className="admin-metrics">
              {summary.metrics.map((metric, index) => (
                <article className="admin-metric" key={metric.label} style={{ "--metric-delay": `${index * 70}ms` }}>
                  <span>{metric.label}</span>
                  <strong>{metric.value.toLocaleString()}</strong>
                  <small>{metric.delta} vs last month</small>
                </article>
              ))}
            </div>

            <div className="admin-grid">
              <article className="admin-panel chart-panel">
                <div className="panel-head">
                  <h2>Leads over time</h2>
                  <span>Live API summary</span>
                </div>
                <Sparkline values={summary.trend} />
              </article>

              <article className="admin-panel" id="partners">
                <div className="panel-head">
                  <h2>Channel mix</h2>
                  <span>Launch focus</span>
                </div>
                <div className="channel-list">
                  {summary.channels.map((channel) => (
                    <div className="channel-row" key={channel.name}>
                      <span>{channel.name}</span>
                      <strong>{channel.share}%</strong>
                      <i style={{ "--bar-value": `${channel.share}%` }} />
                    </div>
                  ))}
                </div>
              </article>

              <article className="admin-panel" id="products">
                <div className="panel-head">
                  <h2>Top products</h2>
                  <span>Lead preference</span>
                </div>
                <div className="product-list">
                  {summary.products.map((product) => (
                    <div className="product-row" key={product.name}>
                      <span>{product.name}</span>
                      <strong>{product.count}</strong>
                    </div>
                  ))}
                </div>
              </article>

              <article className="admin-panel leads-panel" id="leads">
                <div className="panel-head">
                  <h2>Recent enquiries</h2>
                  <button className="admin-small-button" type="button" onClick={() => loadSummary(pass)} disabled={loading}>
                    Refresh
                  </button>
                </div>
                {error && <p className="admin-error">{error}</p>}
                <div className="lead-table">
                  {summary.leads.map((lead) => (
                    <div className="lead-row" key={lead.id}>
                      <strong>
                        {lead.organisation || lead.name}
                        <small>{lead.email}</small>
                      </strong>
                      <span>{lead.segment}</span>
                      <span>{lead.flavour}</span>
                      <em>{lead.status}</em>
                      <div className="lead-actions" aria-label={`Actions for ${lead.organisation || lead.name}`}>
                        {lead.status !== "Contacted" && (
                          <button
                            type="button"
                            onClick={() => updateLead(lead.id, "Contacted")}
                            disabled={Boolean(actionId)}
                          >
                            Contacted
                          </button>
                        )}
                        {lead.status !== "Qualified" && (
                          <button
                            type="button"
                            onClick={() => updateLead(lead.id, "Qualified")}
                            disabled={Boolean(actionId)}
                          >
                            <CheckCircle2 size={14} />
                            Qualify
                          </button>
                        )}
                        <button
                          className="danger"
                          type="button"
                          onClick={() => removeLead(lead.id)}
                          disabled={Boolean(actionId)}
                          aria-label={`Delete ${lead.organisation || lead.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
