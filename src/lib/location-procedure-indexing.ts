const INDEXED_LOCATION_PROCEDURE_SLUGS = new Set([
  "dental-loans",
  "veneers-financing",
  "invisalign-financing",
  "ivf-financing",
  "fertility-treatment-loans",
  "breast-augmentation-loans",
  "rhinoplasty-financing",
  "tummy-tuck-loans",
  "lasik-loans",
  "bariatric-surgery-loans",
  "hair-transplant-loans",
  "orthopedic-surgery-loans",
  "medical-loan",
  "vet-bill-loans",
]);

export function shouldIndexLocationProcedure(procedureSlug: string) {
  return INDEXED_LOCATION_PROCEDURE_SLUGS.has(procedureSlug);
}

export function getIndexedLocationProcedureSlugs(allProcedureSlugs: string[]) {
  return allProcedureSlugs.filter((slug) =>
    shouldIndexLocationProcedure(slug)
  );
}
