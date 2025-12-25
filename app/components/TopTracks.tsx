"use client";

import { useEffect, useState } from "react";

export default function TopTracks() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch("/api/spotify/top-tracks");
        const data = await res.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setTracks(data);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  if (loading) return <div className="text-white">Loading top tracks...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!tracks.length) return <div className="text-white">No top tracks found</div>;

  return (
    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Your Top Tracks</h2>
      <ul className="space-y-3">
        {tracks.map((item: any, index: number) => (
          <li key={item.id} className="text-white">
            <span className="font-bold">{index + 1}. </span>
            {item.name} by {item.artists.map((a: any) => a.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
