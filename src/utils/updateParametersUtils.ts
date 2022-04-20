import { nbYears } from "./constants";
import {
  cumulativeToDensity,
  densityToCumulative,
  empty2DArray,
  interpolate
} from "./mathUtils";

export const shiftProbDensity = (
  density: number[][],
  speedupPerYear: number[]
): number[][] => {
  let result: number[][] = empty2DArray(nbYears, nbYears);

  for (let agiYear = 0; agiYear < nbYears; agiYear++) {
    const cumulativeAISProgress = densityToCumulative(density[agiYear]);
    const shiftedCumulativeAISProgress: number[] = [];

    const maxAISProgress =
      cumulativeAISProgress[cumulativeAISProgress.length - 1];

    let aisProgress = 0; // Mesured in year index
    for (let aisYear = 0; aisYear < nbYears; aisYear++) {
      shiftedCumulativeAISProgress.push(
        interpolate(cumulativeAISProgress, aisProgress, maxAISProgress)
      );
      aisProgress += 1 + speedupPerYear[aisYear];
    }

    result[agiYear] = cumulativeToDensity(shiftedCumulativeAISProgress);
  }

  return result;
};

export const probDoom = (probabilityDensity: number[][]): number => {
  let result = 0;
  for (let aisYear = 0; aisYear < nbYears; aisYear++) {
    for (let agiYear = 0; agiYear < aisYear; agiYear++) {
      result += probabilityDensity[agiYear][aisYear];
    }
  }
  return result;
};
