"use client";
import { useEffect, useState } from "react";

export default function SavedTracks() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch("/api/spotify/saved-tracks");
        const data = await res.json();
        if (data.error) setError(data.error);
        else setTracks(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchTracks();
  }, []);

  if (loading) return <p>Loading saved tracks...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!tracks.length) return <p>No saved tracks found</p>;

  return (
    <ul>
      {tracks.map((item: any) => (
        <li key={item.track.id}>
          {item.track.name} by {item.track.artists.map((a: any) => a.name).join(", ")}
        </li>
      ))}
    </ul>
  );
}
