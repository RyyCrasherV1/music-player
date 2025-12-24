import { NextResponse } from "next/server";
import spotifyApi, { setSpotifyAccessToken } from "@/app/util/spotifyApi";
import { getAuthenticatedSession } from "@/app/util/auth";

export async function GET() {
  try {
    // Ambil token dari session (server-side)
    const accessToken = await getAuthenticatedSession();

    if (!accessToken) {
      return NextResponse.json(
        { error: "No access token. User not authenticated." },
        { status: 401 }
      );
    }

    // Set token ke spotifyApi
    setSpotifyAccessToken(accessToken);

    // Panggil Spotify API untuk saved tracks
    const response = await spotifyApi.getMySavedTracks();
    const tracks = response.body?.items || []; // Cek jika body.items undefined

    return NextResponse.json(tracks);
  } catch (error: any) {
    console.error("Error fetching Spotify data:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
