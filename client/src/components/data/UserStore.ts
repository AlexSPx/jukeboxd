export interface SpotifyUser {
  country: string;
  displayName: string;
  email: string;
  explicitContent: ExplicitContent;
  externalUrls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface ExplicitContent {
  filterEnabled: boolean;
  filterLocked: boolean;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string;
  total: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}
