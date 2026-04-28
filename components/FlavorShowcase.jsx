"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import ProductStage from "@/components/ProductStage";

export default function FlavorShowcase({ products }) {
  const [activeId, setActiveId] = useState(products[0]?.id || "mango");
  const active = useMemo(
    () => products.find((product) => product.id === activeId) || products[0],
    [activeId, products]
  );

  return (
    <section id="products" className="section flavour-section fx-reveal">
      <div className="section-heading">
        <h2>Choose a flavour and the whole stage reacts.</h2>
        <p>
          The range is built as a living product system, with colour, motion and launch role changing around each bottle.
        </p>
      </div>

      <div className="flavour-grid" style={{ "--active-color": active.color, "--active-deep": active.deepColor }}>
        <div className="flavour-tabs" role="tablist" aria-label="PROjuice flavours">
          {products.map((product) => (
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
          <ProductStage products={products} activeId={active.id} compact />
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
