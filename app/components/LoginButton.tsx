"use client";
export default function LoginButton() {
  return (
    <a
      href="/api/auth/signin/spotify"
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Login with Spotify
    </a>
  );
}
