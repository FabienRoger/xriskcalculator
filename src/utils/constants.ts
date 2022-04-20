export const startYear = 2020;
export const endYear = 2100;
export const yearsInterval = 4;
export const nbYears: number = Math.ceil(
  (endYear - startYear + 1) / yearsInterval
);
export const yearsNames: string[] = Array.from(
  { length: nbYears },
  (_, i) => `${startYear + i * yearsInterval}`
);
