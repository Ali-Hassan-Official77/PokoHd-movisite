const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

if (!BASE_URL) {
  throw new Error("TMDB_BASE_URL is not configured.");
}

if (!API_KEY) {
  throw new Error("TMDB_API_KEY is not configured.");
}

export async function fetchFromTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "en-US");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    next: {
      revalidate: 3600,
    },
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    const body = await res.text();

    throw new Error(
      `TMDB fetch failed: ${res.status} ${res.statusText} - ${body.slice(
        0,
        300
      )}`
    );
  }

  if (!contentType.includes("application/json")) {
    const body = await res.text();

    throw new Error(
      `TMDB returned non-JSON response: ${contentType} - ${body.slice(0, 300)}`
    );
  }

  return res.json();
}