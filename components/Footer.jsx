import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="brand">
              <Image
                src="/logo.svg"
                alt="Poko HD"
                width={40}
                height={40}
              />

              <span className="brand-name">
                POKO<span>HD</span>
              </span>
            </Link>

            <p className="mt-4">
              A cinematic movie discovery interface built for fast browsing,
              clean details and a genuinely comfortable experience across
              desktop and mobile.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div className="footer-label">Explore</div>

            <div className="footer-links">
              <Link href="/">Discover</Link>
              <Link href="/genres">Genres</Link>
              <Link href="/watchlist">My Watchlist</Link>
              <Link href="/search">Search</Link>
            </div>
          </div>

          {/* Official Sources */}
          <div>
            <div className="footer-label">Official sources</div>

            <div className="footer-links">
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Movie Database
                <span className="ml-1">↗</span>
              </a>

              <a
                href="https://developer.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                TMDB Developer Docs
                <span className="ml-1">↗</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mr-1">⌘</span>
                GitHub
              </a>
            </div>
          </div>

          {/* Production */}
          <div>
            <div className="footer-label">Production</div>

            <div className="footer-links">
              <a
                href="https://silverloft.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                SilverLoft — official site
                <span className="ml-1">↗</span>
              </a>

              <span className="flex items-center gap-2 text-[12px] text-[#68748b]">
                <span aria-hidden="true">✓</span>
                API-powered interface
              </span>

              <span className="flex items-center gap-2 text-[12px] text-[#68748b]">
                <span aria-hidden="true">♡</span>
                Built for movie lovers
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Slantyfix. All rights reserved.
          </span>

          <span>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </span>
        </div>
      </div>
    </footer>
  );
}