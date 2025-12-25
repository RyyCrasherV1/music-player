"use client";

import { useEffect, useState } from "react";

export default function SavedTracks() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch("/api/spotify/saved-tracks");
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

  if (loading) return <div className="text-white">Loading saved tracks...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!tracks.length) return <div className="text-white">No saved tracks found</div>;

  return (
    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Your Saved Tracks</h2>
      <ul className="space-y-3">
        {tracks.slice(0, 10).map((item: any) => (
          <li key={item.track.id} className="text-white">
            {item.track.name} by {item.track.artists.map((a: any) => a.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}
