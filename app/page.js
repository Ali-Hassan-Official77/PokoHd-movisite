import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import LatestMoviesSection from "@/components/LatestMoviesSection";
import PopularRow from "@/components/PopularRow";
import { getBaseUrl } from "@/lib/utils";

async function getData(path){ const res=await fetch(`${getBaseUrl()}${path}`,{cache:"no-store"}); return res.json(); }

export default async function HomePage(){
  const [trendingData,latestData,popularData]=await Promise.all([
    getData("/api/movies/trending"),getData("/api/movies/latest?page=1"),getData("/api/movies/popular")
  ]);
  const trending=(trendingData.results||[]).slice(0,10), featured=trending[0], latest=latestData.results||[], popular=popularData.results||[];
  const totalPages=Math.min(latestData.total_pages||1,500);
  return <div>
    {featured && <section className="hero">
      {featured.backdrop_path && <div className="hero-backdrop"><Image src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`} alt="" fill priority sizes="100vw"/></div>}
      <div className="hero-overlay"/>
      <div className="hero-content"><div className="hero-copy">
        <div className="eyebrow"><Sparkles size={12}/> Featured from trending</div>
        <h1 className="hero-title">{featured.title?.split(" ").slice(0,-1).join(" ")} <span>{featured.title?.split(" ").slice(-1)}</span></h1>
        <p className="hero-overview">{featured.overview || "Explore movies worth adding to your list."}</p>
        <div className="hero-actions"><Link href={`/movie/${featured.id}`} className="btn btn-primary"><Play size={15} fill="currentColor"/> View movie</Link><Link href="/genres" className="btn">Browse genres <ArrowRight size={14}/></Link></div>
      </div></div>
    </section>}
    <LatestMoviesSection initialMovies={latest} initialPage={1} totalPages={totalPages}/>
    <PopularRow movies={popular}/>
  </div>;
}
