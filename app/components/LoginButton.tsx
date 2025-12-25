"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-white mb-8">
        Spotify Dashboard
      </h1>
      <button
        onClick={() => signIn("spotify")}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105"
      >
        Login Spotify Zhou
      </button>
    </div>
  );
}
