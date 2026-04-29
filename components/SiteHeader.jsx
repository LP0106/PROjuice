"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

const navItems = [
  ["Products", "#products"],
  ["Live API", "#backend"],
  ["Benefits", "#benefits"],
  ["Partners", "#partners"],
  ["Enquire", "#enquire"],
  ["Admin", "/admin"]
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">PJ</span>
        <span>
          <strong>PROjuice</strong>
          <small>Fruit protein drinks</small>
        </span>
      </Link>

      <button
        className="icon-button menu-button"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>

      <Link className="header-cta" href="#enquire">
        Pre-order
        <ArrowRight size={17} />
      </Link>
    </header>
  );
}
