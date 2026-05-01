export interface Location {
  slug: string;
  name: string;
  state: string;
  stateCode: string;
  nearbyAreas: string[];
  localContext: string;
}

export const locations: Location[] = [
  {
    slug: "sydney",
    name: "Sydney",
    state: "New South Wales",
    stateCode: "NSW",
    nearbyAreas: ["Parramatta", "North Shore", "Inner West", "Sutherland Shire"],
    localContext:
      "Sydney patients often compare quotes across inner-city specialists and larger suburban provider networks before locking in treatment timing.",
  },
  {
    slug: "melbourne",
    name: "Melbourne",
    state: "Victoria",
    stateCode: "VIC",
    nearbyAreas: ["Richmond", "South Yarra", "Box Hill", "Footscray"],
    localContext:
      "Melbourne has a broad private provider market, so comparing finance before choosing a clinic can help patients keep treatment options open.",
  },
  {
    slug: "brisbane",
    name: "Brisbane",
    state: "Queensland",
    stateCode: "QLD",
    nearbyAreas: ["Fortitude Valley", "South Brisbane", "Chermside", "Logan"],
    localContext:
      "Brisbane patients commonly weigh central clinics against northside, southside, and Logan corridor providers when planning treatment costs.",
  },
  {
    slug: "perth",
    name: "Perth",
    state: "Western Australia",
    stateCode: "WA",
    nearbyAreas: ["Joondalup", "Fremantle", "Cannington", "Midland"],
    localContext:
      "Perth patients may travel across a wide metro area for the right provider, so finance flexibility matters before booking dates are fixed.",
  },
  {
    slug: "adelaide",
    name: "Adelaide",
    state: "South Australia",
    stateCode: "SA",
    nearbyAreas: ["Norwood", "Glenelg", "Elizabeth", "Mawson Lakes"],
    localContext:
      "Adelaide's provider market is compact, which makes it practical to compare treatment quotes and finance offers side by side.",
  },
  {
    slug: "gold-coast",
    name: "Gold Coast",
    state: "Queensland",
    stateCode: "QLD",
    nearbyAreas: ["Southport", "Robina", "Broadbeach", "Tweed Heads"],
    localContext:
      "Gold Coast patients often compare providers along the coastal corridor, where procedure pricing and payment timing can vary by clinic.",
  },
  {
    slug: "canberra",
    name: "Canberra",
    state: "Australian Capital Territory",
    stateCode: "ACT",
    nearbyAreas: ["Belconnen", "Woden", "Gungahlin", "Queanbeyan"],
    localContext:
      "Canberra patients may compare ACT providers with nearby Queanbeyan options, especially for treatments with specialist wait times.",
  },
  {
    slug: "newcastle",
    name: "Newcastle",
    state: "New South Wales",
    stateCode: "NSW",
    nearbyAreas: ["Lake Macquarie", "Maitland", "Charlestown", "Port Stephens"],
    localContext:
      "Newcastle patients often balance local convenience with Hunter region specialist access when planning treatment and funding.",
  },
  {
    slug: "wollongong",
    name: "Wollongong",
    state: "New South Wales",
    stateCode: "NSW",
    nearbyAreas: ["Shellharbour", "Kiama", "Corrimal", "Dapto"],
    localContext:
      "Wollongong patients may compare Illawarra providers with Sydney options, so pre-approval can help clarify the realistic budget first.",
  },
  {
    slug: "geelong",
    name: "Geelong",
    state: "Victoria",
    stateCode: "VIC",
    nearbyAreas: ["Belmont", "Newtown", "Corio", "Torquay"],
    localContext:
      "Geelong patients can compare local providers and Melbourne referrals, making flexible finance useful before committing to a treatment plan.",
  },
  {
    slug: "hobart",
    name: "Hobart",
    state: "Tasmania",
    stateCode: "TAS",
    nearbyAreas: ["Glenorchy", "Kingston", "Sandy Bay", "Rosny"],
    localContext:
      "Hobart patients often plan around a smaller specialist market, so confirming finance early can make provider availability easier to act on.",
  },
  {
    slug: "townsville",
    name: "Townsville",
    state: "Queensland",
    stateCode: "QLD",
    nearbyAreas: ["Aitkenvale", "Kirwan", "Douglas", "Thuringowa"],
    localContext:
      "Townsville patients may have fewer provider choices for some treatments, which makes comparing loan terms before booking especially useful.",
  },
  {
    slug: "cairns",
    name: "Cairns",
    state: "Queensland",
    stateCode: "QLD",
    nearbyAreas: ["Smithfield", "Earlville", "Redlynch", "Trinity Beach"],
    localContext:
      "Cairns patients often plan around regional provider availability and travel time, so clear finance options can reduce booking friction.",
  },
  {
    slug: "darwin",
    name: "Darwin",
    state: "Northern Territory",
    stateCode: "NT",
    nearbyAreas: ["Palmerston", "Casuarina", "Nightcliff", "Humpty Doo"],
    localContext:
      "Darwin patients may need to account for limited specialist availability and interstate referrals, making loan flexibility important.",
  },
  {
    slug: "toowoomba",
    name: "Toowoomba",
    state: "Queensland",
    stateCode: "QLD",
    nearbyAreas: ["Rangeville", "Harristown", "Highfields", "Dalby"],
    localContext:
      "Toowoomba patients often compare local care with Brisbane referrals, so understanding borrowing capacity early can help with timing.",
  },
  {
    slug: "ballarat",
    name: "Ballarat",
    state: "Victoria",
    stateCode: "VIC",
    nearbyAreas: ["Wendouree", "Sebastopol", "Delacombe", "Bacchus Marsh"],
    localContext:
      "Ballarat patients may compare local providers with Melbourne specialists, especially for higher-cost treatment plans.",
  },
  {
    slug: "bendigo",
    name: "Bendigo",
    state: "Victoria",
    stateCode: "VIC",
    nearbyAreas: ["Kangaroo Flat", "Eaglehawk", "Strathfieldsaye", "Castlemaine"],
    localContext:
      "Bendigo patients often plan treatment around regional provider choice and referral timing, so finance pre-approval can help narrow options.",
  },
  {
    slug: "albury",
    name: "Albury",
    state: "New South Wales",
    stateCode: "NSW",
    nearbyAreas: ["Wodonga", "Lavington", "Thurgoona", "Wangaratta"],
    localContext:
      "Albury patients commonly compare cross-border provider options around Albury-Wodonga before finalising treatment and funding.",
  },
  {
    slug: "launceston",
    name: "Launceston",
    state: "Tasmania",
    stateCode: "TAS",
    nearbyAreas: ["Kings Meadows", "Mowbray", "Invermay", "Devonport"],
    localContext:
      "Launceston patients often plan around northern Tasmania provider availability, with finance helping bridge the gap between quote and booking.",
  },
  {
    slug: "rockhampton",
    name: "Rockhampton",
    state: "Queensland",
    stateCode: "QLD",
    nearbyAreas: ["Yeppoon", "Gracemere", "Berserker", "Emerald"],
    localContext:
      "Rockhampton patients may compare local treatment with coastal or Brisbane options, so flexible funding can make a quote easier to act on.",
  },
  {
    slug: "mackay",
    name: "Mackay",
    state: "Queensland",
    stateCode: "QLD",
    nearbyAreas: ["Andergrove", "Paget", "Sarina", "Whitsundays"],
    localContext:
      "Mackay patients often plan around regional appointment availability and travel, making early finance comparison useful before deposits are due.",
  },
  {
    slug: "sunshine-coast",
    name: "Sunshine Coast",
    state: "Queensland",
    stateCode: "QLD",
    nearbyAreas: ["Maroochydore", "Noosa", "Caloundra", "Kawana"],
    localContext:
      "Sunshine Coast patients often compare coastal clinics with Brisbane providers, so lender choice can matter before treatment dates are booked.",
  },
  {
    slug: "bunbury",
    name: "Bunbury",
    state: "Western Australia",
    stateCode: "WA",
    nearbyAreas: ["Australind", "Dalyellup", "Busselton", "Collie"],
    localContext:
      "Bunbury patients may compare south-west providers with Perth options, especially when specialist access or travel time affects the quote.",
  },
  {
    slug: "bundaberg",
    name: "Bundaberg",
    state: "Queensland",
    stateCode: "QLD",
    nearbyAreas: ["Bargara", "Kepnock", "Maryborough", "Childers"],
    localContext:
      "Bundaberg patients often plan around regional provider availability and payment timing, so a soft-credit check can clarify next steps.",
  },
  {
    slug: "coffs-harbour",
    name: "Coffs Harbour",
    state: "New South Wales",
    stateCode: "NSW",
    nearbyAreas: ["Sawtell", "Toormina", "Woolgoolga", "Grafton"],
    localContext:
      "Coffs Harbour patients may compare local clinics with larger regional centres, making transparent finance terms useful before booking.",
  },
  {
    slug: "wagga-wagga",
    name: "Wagga Wagga",
    state: "New South Wales",
    stateCode: "NSW",
    nearbyAreas: ["Kooringal", "Turvey Park", "Junee", "Griffith"],
    localContext:
      "Wagga Wagga patients often plan treatment around Riverina provider access, referral timing, and travel, so finance clarity can help earlier.",
  },
  {
    slug: "hervey-bay",
    name: "Hervey Bay",
    state: "Queensland",
    stateCode: "QLD",
    nearbyAreas: ["Urangan", "Pialba", "Maryborough", "Burrum Heads"],
    localContext:
      "Hervey Bay patients may compare Fraser Coast providers with Bundaberg or Sunshine Coast options before choosing a finance path.",
  },
  {
    slug: "mildura",
    name: "Mildura",
    state: "Victoria",
    stateCode: "VIC",
    nearbyAreas: ["Irymple", "Red Cliffs", "Wentworth", "Robinvale"],
    localContext:
      "Mildura patients often account for regional travel and cross-border provider choice, making pre-approval useful before treatment is scheduled.",
  },
  {
    slug: "shepparton",
    name: "Shepparton",
    state: "Victoria",
    stateCode: "VIC",
    nearbyAreas: ["Mooroopna", "Kialla", "Kyabram", "Echuca"],
    localContext:
      "Shepparton patients may compare Goulburn Valley providers with Melbourne referrals, especially for larger treatment plans.",
  },
  {
    slug: "gladstone",
    name: "Gladstone",
    state: "Queensland",
    stateCode: "QLD",
    nearbyAreas: ["Boyne Island", "Tannum Sands", "Calliope", "Agnes Water"],
    localContext:
      "Gladstone patients often plan around central Queensland provider access, so comparing finance before paying deposits can reduce uncertainty.",
  },
];

export const getAllLocationSlugs = (): string[] => locations.map((l) => l.slug);

export const getLocationBySlug = (slug: string): Location | null =>
  locations.find((l) => l.slug === slug) ?? null;
