import type { SpotifyUser } from "../components/data/UserStore";

const SPOTIFY_API = "https://api.spotify.com/v1";

export default class spotifyApi {
  static async fetchUser(access_token: string): Promise<SpotifyUser | null> {
    const res = await fetch(`${SPOTIFY_API}/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (res.status === 200) return res.json() as Promise<SpotifyUser>;
    return null;
  }
}
