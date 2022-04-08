const startYear = 2020;
const endYear = 2040;
export const nbYears: number = endYear - startYear + 1;
export const yearsNames: string[] = Array.from(
  { length: nbYears },
  (_, i) => `${startYear + i}`
);
