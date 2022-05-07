import { startYear, yearsInterval } from "./constants";

export const percentToProb = (p: number) => p / 100;
export const probToPercent = (p: number) => p * 100;
export const yearToIndex = (y: number) => {
  return (y - startYear) / yearsInterval;
};

export const indexToYear = (i: number) => i * yearsInterval + startYear;
