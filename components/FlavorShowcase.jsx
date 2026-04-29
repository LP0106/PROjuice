"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Radio } from "lucide-react";
import ProductStage from "@/components/ProductStage";

export default function FlavorShowcase({ products }) {
  const [liveProducts, setLiveProducts] = useState(products);
  const [syncState, setSyncState] = useState("loading");
  const [activeId, setActiveId] = useState(products[0]?.id || "mango");
  const displayProducts = liveProducts.length ? liveProducts : products;
  const active = useMemo(
    () => displayProducts.find((product) => product.id === activeId) || displayProducts[0],
    [activeId, displayProducts]
  );

  useEffect(() => {
    let alive = true;

    async function syncProducts() {
      try {
        const response = await fetch("/api/products", { cache: "no-store" });
        const payload = await response.json();

        if (!response.ok || !Array.isArray(payload.products)) {
          throw new Error("Product API unavailable");
        }

        if (alive) {
          setLiveProducts(payload.products);
          setSyncState("synced");
          if (!payload.products.some((product) => product.id === activeId)) {
            setActiveId(payload.products[0]?.id || "mango");
          }
        }
      } catch {
        if (alive) {
          setSyncState("local");
        }
      }
    }

    syncProducts();

    return () => {
      alive = false;
    };
  }, [activeId]);

  return (
    <section id="products" className="section flavour-section fx-reveal">
      <div className="section-heading">
        <h2>Choose a flavour and the whole stage reacts.</h2>
        <p>
          The range is built as a living product system, with colour, motion and launch role changing around each bottle.
        </p>
        <span className={syncState === "synced" ? "api-sync-note is-live" : "api-sync-note"}>
          <Radio size={15} />
          {syncState === "synced" ? "Products API synced" : "Local product fallback"}
        </span>
      </div>

      <div className="flavour-grid" style={{ "--active-color": active.color, "--active-deep": active.deepColor }}>
        <div className="flavour-tabs" role="tablist" aria-label="PROjuice flavours">
          {displayProducts.map((product) => (
            <button
              className={product.id === activeId ? "flavour-tab is-active" : "flavour-tab"}
              type="button"
              role="tab"
              aria-selected={product.id === activeId}
              key={product.id}
              onClick={() => setActiveId(product.id)}
            >
              <span className="mini-bottle" style={{ "--mini-color": product.color }} />
              <span>
                <strong>{product.name}</strong>
                <small>{product.tone}</small>
              </span>
              {product.id === activeId && <Check size={18} />}
            </button>
          ))}
        </div>

        <div className="flavour-live-panel">
          <ProductStage products={displayProducts} activeId={active.id} compact />
          <div className="flavour-copy">
            <p>{active.role}</p>
            <h3>{active.headline}</h3>
            <span>{active.description}</span>
            <div className="stat-bars">
              {active.stats.map(([label, value]) => (
                <div className="stat-bar" key={label}>
                  <span>{label}</span>
                  <strong>{value}%</strong>
                  <i style={{ "--bar-value": `${value}%` }} />
                </div>
              ))}
            </div>
            <a className="text-link" href="#enquire">
              Enquire about {active.name}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
