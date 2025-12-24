"use client";

import { useEffect, useRef } from "react";
import LoginButton from "./components/LoginButton";
import SavedTracks from "./components/SavedTracks";
import TopTracks from "./components/TopTracks";
import OwnerMenu from "./components/OwnerMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playlist = [
    "https://files.catbox.moe/dyyhrw.mp3",
    "https://files.catbox.moe/8sn3pp.mp3",
    "https://files.catbox.moe/tvbpbj.mp3",
    "https://files.catbox.moe/1fq3d2.mp3",
    "https://files.catbox.moe/lvu2v7.m4a",
  ];

  useEffect(() => {
    if (!audioRef.current) return;

    let currentTrack = 0;
    const audio = audioRef.current;

    audio.src = playlist[currentTrack];
    audio.play();

    const onEnded = () => {
      currentTrack = (currentTrack + 1) % playlist.length;
      audio.src = playlist[currentTrack];
      audio.play();
    };

    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const stopAudio = () => {
    if (audioRef.current) audioRef.current.pause();
  };

  return (
    <main className="relative min-h-screen">
      {/* Background GIF */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://files.catbox.moe/aao761.gif"
          alt="Background GIF"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Auto-play audio */}
      <audio ref={audioRef} autoPlay loop className="hidden" />

      {/* Konten utama */}
      <Header />

      <div className="p-4 max-w-4xl mx-auto text-white relative z-10">
        <div onClick={stopAudio}>
          <LoginButton />
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Top Tracks</h2>
          <TopTracks />
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Saved Tracks</h2>
          <SavedTracks />
        </section>

        {/* Owner/Admin Menu */}
        <OwnerMenu />
      </div>

      <Footer />
    </main>
  );
}
