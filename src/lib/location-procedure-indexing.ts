export interface IndexedLocationProcedurePath {
  location: string;
  procedure: string;
}

const PRIMARY_LOCATION_SLUGS = [
  "sydney",
  "melbourne",
  "brisbane",
  "perth",
  "adelaide",
  "gold-coast",
] as const;

const PRIMARY_PROCEDURE_SLUGS = [
  "dental-loans",
  "ivf-financing",
  "breast-augmentation-loans",
  "rhinoplasty-financing",
  "facelift-financing",
  "vet-bill-loans",
] as const;

const GSC_EVIDENCE_BACKED_EXCEPTIONS = [
  ["sunshine-coast", "facelift-financing"],
  ["sunshine-coast", "vet-bill-loans"],
  ["bendigo", "dermatology-financing"],
  ["townsville", "invisalign-financing"],
] as const;

const indexedLocationProcedureKeys = new Set<string>([
  ...PRIMARY_LOCATION_SLUGS.flatMap((location) =>
    PRIMARY_PROCEDURE_SLUGS.map((procedure) => key(location, procedure))
  ),
  ...GSC_EVIDENCE_BACKED_EXCEPTIONS.map(([location, procedure]) =>
    key(location, procedure)
  ),
]);

function key(locationSlug: string, procedureSlug: string) {
  return `${locationSlug}/${procedureSlug}`;
}

export function shouldIndexLocationProcedure(
  locationSlug: string,
  procedureSlug: string
) {
  return indexedLocationProcedureKeys.has(key(locationSlug, procedureSlug));
}

export function getIndexedLocationProcedurePaths(
  allLocationSlugs: string[],
  allProcedureSlugs: string[]
): IndexedLocationProcedurePath[] {
  return allLocationSlugs.flatMap((location) =>
    allProcedureSlugs
      .filter((procedure) => shouldIndexLocationProcedure(location, procedure))
      .map((procedure) => ({ location, procedure }))
  );
}
