"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass, Heart, Menu, Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Discover", icon: Compass },
  { href: "/genres", label: "Genres", icon: null },
  { href: "/watchlist", label: "Watchlist", icon: Heart },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  function submit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <Image src="/logo.svg" alt="Poko HD" width={38} height={38} className="brand-mark" priority />
          <span className="brand-name">POKO<span>HD</span></span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return <Link key={href} href={href} className={`nav-link ${active ? "active" : ""}`}>{Icon && <Icon size={14} />}{label}</Link>;
          })}
          <form onSubmit={submit} className="ml-2 flex items-center gap-2 rounded-[13px] border border-white/8 bg-white/[.035] px-3 py-1.5">
            <Search size={14} className="text-white/35" />
            <input aria-label="Search movies" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="w-24 bg-transparent text-xs text-white outline-none placeholder:text-white/25" />
          </form>
        </nav>

        <button type="button" className="mobile-menu btn" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/6 bg-[#070910]/95 px-4 py-4 backdrop-blur-2xl md:hidden">
          <form onSubmit={submit} className="mb-3 flex items-center gap-3 rounded-xl border border-white/8 bg-white/[.04] px-3 py-3">
            <Search size={16} className="text-white/35" />
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25" />
          </form>
          <div className="grid gap-1">
            {links.map(({ href, label }) => <Link key={href} href={href} onClick={() => setOpen(false)} className="nav-link py-3">{label}</Link>)}
          </div>
        </div>
      )}
    </header>
  );
}
