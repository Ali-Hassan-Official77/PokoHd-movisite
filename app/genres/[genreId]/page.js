import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MovieGridClient from "@/components/MovieGridClient";
import { getBaseUrl } from "@/lib/utils";
async function getGenreMovies(id){const res=await fetch(`${getBaseUrl()}/api/movies/genre/${id}`,{cache:"no-store"});if(!res.ok)throw new Error("Genre not found");return res.json()}
export default async function GenreMoviesPage({params}){const {genreId}=await params;const data=await getGenreMovies(genreId);const movies=data.results||[];return <div><Link href="/genres" className="back-link"><ArrowLeft size={13}/> All genres</Link><div className="page-heading"><h1>Genre <span className="text-[#38bdf8]">movies</span></h1><p>{movies.length} titles ready to explore.</p></div>{movies.length?<MovieGridClient movies={movies}/>:<div className="empty-state">No movies were found for this genre.</div>}</div>}
