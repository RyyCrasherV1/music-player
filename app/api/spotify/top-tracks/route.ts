import { NextResponse } from "next/server";
import spotifyApi, { setSpotifyAccessToken } from "../../../../util/spotifyApi";
import { getAuthenticatedSession } from "../../../../util/auth";
export async function GET() {
  try {
    const accessToken = await getAuthenticatedSession();
    if (!accessToken) return NextResponse.json({ error: "No access token" }, { status: 401 });

    setSpotifyAccessToken(accessToken);
    const response = await spotifyApi.getMyTopTracks({ limit: 5 });
    const tracks = response.body?.items || [];

    return NextResponse.json(tracks);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}
