import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getBaseUrl } from "@/lib/utils";
async function getGenres(){const res=await fetch(`${getBaseUrl()}/api/genres`,{cache:"no-store"});if(!res.ok)throw new Error("Failed to load genres");return res.json()}
export default async function GenresPage(){const data=await getGenres();const genres=data.genres||[];return <div><Link href="/" className="back-link"><ArrowLeft size={13}/> Back to discover</Link><div className="page-heading"><h1>Browse <span className="text-[#38bdf8]">genres</span></h1><p>Pick a mood. Let the database do the rest.</p></div><ul className="genre-list">{genres.map(g=><li key={g.id}><Link className="genre-link" href={`/genres/${g.id}`}>{g.name}<ArrowRight size={15}/></Link></li>)}</ul></div>}
