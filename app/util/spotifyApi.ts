import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi();

export function setSpotifyAccessToken(token: string) {
  spotifyApi.setAccessToken(token);
}

export default spotifyApi;
