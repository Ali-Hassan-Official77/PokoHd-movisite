import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";

import LatestMoviesSection from "@/components/LatestMoviesSection";
import PopularRow from "@/components/PopularRow";
import { fetchFromTMDB } from "@/lib/tmdb";

async function getHomeData() {
  const [trendingData, latestData, popularData] = await Promise.all([
    fetchFromTMDB("/trending/movie/week"),
    fetchFromTMDB("/discover/movie", {
      sort_by: "primary_release_date.desc",
      "vote_count.gte": 1,
      page: 1,
    }),
    fetchFromTMDB("/movie/popular"),
  ]);

  return {
    trendingData,
    latestData,
    popularData,
  };
}

export default async function HomePage() {
  try {
    const { trendingData, latestData, popularData } = await getHomeData();

    const trending = (trendingData?.results || []).slice(0, 10);
    const featured = trending[0];

    const latest = latestData?.results || [];
    const popular = popularData?.results || [];

    const totalPages = Math.min(latestData?.total_pages || 1, 500);

    return (
      <div>
        {featured && (
          <section className="hero">
            {featured.backdrop_path && (
              <div className="hero-backdrop">
                <Image
                  src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                />
              </div>
            )}

            <div className="hero-overlay" />

            <div className="hero-content">
              <div className="hero-copy">
                <div className="eyebrow">
                  <Sparkles size={12} />
                  Featured from trending
                </div>

                <h1 className="hero-title">
                  {featured.title?.split(" ").slice(0, -1).join(" ")}{" "}
                  <span>{featured.title?.split(" ").slice(-1)}</span>
                </h1>

                <p className="hero-overview">
                  {featured.overview ||
                    "Explore movies worth adding to your list."}
                </p>

                <div className="hero-actions">
                  <Link
                    href={`/movie/${featured.id}`}
                    className="btn btn-primary"
                  >
                    <Play size={15} fill="currentColor" />
                    View movie
                  </Link>

                  <Link href="/genres" className="btn">
                    Browse genres
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <LatestMoviesSection
          initialMovies={latest}
          initialPage={1}
          totalPages={totalPages}
        />

        <PopularRow movies={popular} />
      </div>
    );
  } catch (error) {
    console.error("Homepage data error:", error);

    return (
      <main className="min-h-[60vh] px-6 py-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <h1 className="mb-3 text-2xl font-bold text-white">
            Movies could not be loaded
          </h1>

          <p className="text-sm text-white/50">
            Please try again in a moment.
          </p>
        </div>
      </main>
    );
  }
}