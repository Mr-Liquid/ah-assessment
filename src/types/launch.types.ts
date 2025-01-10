interface Fairings {
  reused?: boolean;
  recovery_attempt?: boolean;
  recovered?: boolean;
  ships: string[];
}

interface Links {
  patch?: {
    small?: string;
    large?: string;
  };
  reddit?: {
    campaign?: string;
    launch?: string;
    media?: string;
    recovery?: string;
  };
  flickr?: {
    small?: string[];
    original?: string[];
  };
  presskit?: string;
  webcast?: string;
  youtube_id?: string;
  article?: string;
  wikipedia?: string;
}

interface Core {
  core_serial?: string;
  flight?: number;
  block?: number;
  gridfins?: boolean;
  legs?: boolean;
  reused?: boolean;
  land_success?: boolean;
  landing_intent?: boolean;
  landing_type?: string;
  landing_vehicle?: string;
}

interface Launch {
  fairings: Fairings | null;
  links: Links;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: Array<{
    time?: number;
    altitude?: number;
    reason: string;
  }>;
  details: string | null;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
}

export type { Launch, Fairings, Links, Core };
