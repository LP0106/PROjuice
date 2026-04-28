import { Sparkles } from "lucide-react";

export default function ProductStage({ products, activeId = "mango", compact = false }) {
  return (
    <div className={compact ? "product-stage compact" : "product-stage"} data-active={activeId}>
      <div className="stage-backplate" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="fruit fruit-mango" />
      <div className="fruit fruit-berry" />
      <div className="fruit fruit-lime" />
      <div className="bottle-row" aria-label="PROjuice product range">
        {products.map((product, index) => (
          <article
            className={product.id === activeId ? "bottle-card is-active" : "bottle-card"}
            key={product.id}
            style={{
              "--bottle-color": product.color,
              "--bottle-deep": product.deepColor,
              "--bottle-accent": product.accent,
              "--bottle-delay": `${index * 110}ms`
            }}
          >
            <div className="bottle-cap" />
            <div className="bottle">
              <span className="bottle-gloss" />
              <span className="bottle-label">
                <strong>PROjuice</strong>
                <small>{product.name}</small>
              </span>
            </div>
          </article>
        ))}
      </div>
      <div className="stage-badge">
        <Sparkles size={17} />
        Live flavour motion
      </div>
    </div>
  );
}
