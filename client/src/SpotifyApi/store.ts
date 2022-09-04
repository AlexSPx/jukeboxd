import { atom } from "nanostores";
import type { SpotifyUser } from "../components/data/UserStore";

export const user = atom<SpotifyUser | null>(null);

export function setUser(spotifyUser: SpotifyUser) {
  user.set(spotifyUser);
}

export function getUser(): SpotifyUser | null {
  return user.get()
}
