export interface IndexedLocationProcedurePath {
  location: string;
  procedure: string;
}

export function shouldIndexLocationProcedure(
  locationSlug: string,
  procedureSlug: string
) {
  return Boolean(locationSlug && procedureSlug);
}

export function getIndexedLocationProcedurePaths(
  allLocationSlugs: string[],
  allProcedureSlugs: string[]
): IndexedLocationProcedurePath[] {
  return allLocationSlugs.flatMap((location) =>
    allProcedureSlugs.map((procedure) => ({ location, procedure }))
  );
}
