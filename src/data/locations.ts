export interface Location {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
}

export const locations: Location[] = [
  { slug: "sydney",         name: "Sydney",         state: "New South Wales",            stateCode: "NSW" },
  { slug: "melbourne",      name: "Melbourne",      state: "Victoria",                   stateCode: "VIC" },
  { slug: "brisbane",       name: "Brisbane",       state: "Queensland",                 stateCode: "QLD" },
  { slug: "perth",          name: "Perth",          state: "Western Australia",          stateCode: "WA"  },
  { slug: "adelaide",       name: "Adelaide",       state: "South Australia",            stateCode: "SA"  },
  { slug: "gold-coast",     name: "Gold Coast",     state: "Queensland",                 stateCode: "QLD" },
  { slug: "canberra",       name: "Canberra",       state: "Australian Capital Territory", stateCode: "ACT" },
  { slug: "newcastle",      name: "Newcastle",      state: "New South Wales",            stateCode: "NSW" },
  { slug: "wollongong",     name: "Wollongong",     state: "New South Wales",            stateCode: "NSW" },
  { slug: "geelong",        name: "Geelong",        state: "Victoria",                   stateCode: "VIC" },
  { slug: "hobart",         name: "Hobart",         state: "Tasmania",                   stateCode: "TAS" },
  { slug: "townsville",     name: "Townsville",     state: "Queensland",                 stateCode: "QLD" },
  { slug: "cairns",         name: "Cairns",         state: "Queensland",                 stateCode: "QLD" },
  { slug: "darwin",         name: "Darwin",         state: "Northern Territory",         stateCode: "NT"  },
  { slug: "toowoomba",      name: "Toowoomba",      state: "Queensland",                 stateCode: "QLD" },
  { slug: "ballarat",       name: "Ballarat",       state: "Victoria",                   stateCode: "VIC" },
  { slug: "bendigo",        name: "Bendigo",        state: "Victoria",                   stateCode: "VIC" },
  { slug: "albury",         name: "Albury",         state: "New South Wales",            stateCode: "NSW" },
  { slug: "launceston",     name: "Launceston",     state: "Tasmania",                   stateCode: "TAS" },
  { slug: "rockhampton",    name: "Rockhampton",    state: "Queensland",                 stateCode: "QLD" },
  { slug: "mackay",         name: "Mackay",         state: "Queensland",                 stateCode: "QLD" },
  { slug: "sunshine-coast", name: "Sunshine Coast", state: "Queensland",                 stateCode: "QLD" },
  { slug: "bunbury",        name: "Bunbury",        state: "Western Australia",          stateCode: "WA"  },
  { slug: "bundaberg",      name: "Bundaberg",      state: "Queensland",                 stateCode: "QLD" },
  { slug: "coffs-harbour",  name: "Coffs Harbour",  state: "New South Wales",            stateCode: "NSW" },
  { slug: "wagga-wagga",    name: "Wagga Wagga",    state: "New South Wales",            stateCode: "NSW" },
  { slug: "hervey-bay",     name: "Hervey Bay",     state: "Queensland",                 stateCode: "QLD" },
  { slug: "mildura",        name: "Mildura",        state: "Victoria",                   stateCode: "VIC" },
  { slug: "shepparton",     name: "Shepparton",     state: "Victoria",                   stateCode: "VIC" },
  { slug: "gladstone",      name: "Gladstone",      state: "Queensland",                 stateCode: "QLD" },
];

export const getAllLocationSlugs = (): string[] => locations.map((l) => l.slug);

export const getLocationBySlug = (slug: string): Location | null =>
  locations.find((l) => l.slug === slug) ?? null;
