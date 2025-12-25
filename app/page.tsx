"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import LoginButton from "./components/LoginButton";
import SavedTracks from "./components/SavedTracks";
import TopTracks from "./components/TopTracks";
import OwnerMenu from "./components/OwnerMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  const { data: session, status } = useSession();
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
    
    // Play audio with error handling
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.log("Audio autoplay blocked:", err);
      }
    };

    playAudio();

    const onEnded = () => {
      currentTrack = (currentTrack + 1) % playlist.length;
      audio.src = playlist[currentTrack];
      audio.play().catch(err => console.log("Error playing next track:", err));
    };

    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Loading state
  if (status === "loading") {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://files.catbox.moe/aao761.gif"
            alt="Background GIF"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <p className="text-white text-2xl">Loading...</p>
      </main>
    );
  }

  // Not logged in - show login page
  if (!session) {
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
        <audio ref={audioRef} autoPlay className="hidden" />

        {/* Header */}
        <Header />

        {/* Login content */}
        <div className="flex items-center justify-center min-h-[80vh]">
          <div onClick={stopAudio}>
            <LoginButton />
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  // Logged in - show dashboard
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
      <audio ref={audioRef} autoPlay className="hidden" />

      {/* Header */}
      <Header />

      {/* Dashboard content */}
      <div className="p-4 max-w-4xl mx-auto text-white relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome, {session.user?.name}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Top Tracks</h2>
            <TopTracks />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Saved Tracks</h2>
            <SavedTracks />
          </section>
        </div>

        {/* Owner/Admin Menu */}
        <OwnerMenu />
      </div>

      <Footer />
    </main>
  );
      }
