import { nbYears } from "./constants";
import {
  crossProduct,
  cumulativeToDensity,
  densityToCumulative,
  empty2DArray,
  interpolate,
  subtract,
  sum,
  transpose,
  triangleDistribution,
} from "./mathUtils";
import { Parameters } from "./types";

export const updateParameters = (p: Parameters): Parameters => {
  p.probabilityDensityAGI = triangleDistribution(
    p.agiProbModeYear,
    nbYears,
    p.agiProb
  );
  p.probabilityDensityAIS = triangleDistribution(
    p.aisProbModeYear,
    nbYears,
    p.aisProb
  );
  p.speedUpPerYear = Array(nbYears)
    .fill(undefined)
    .map((_, i) => p.speedUpEveryYear);

  p.probabilityDensity = crossProduct(
    p.probabilityDensityAIS,
    p.probabilityDensityAGI
  );
  p.probabilityDensityT = transpose(p.probabilityDensity, nbYears - 1);

  p.shiftedProbabilityDensity = shiftProbDensity(
    p.probabilityDensity,
    p.speedUpPerYear
  );
  p.deltaProbabilityDensity = subtract(
    p.shiftedProbabilityDensity,
    p.probabilityDensity
  );
  //   p.deltaProbabilityDensity = p.shiftedProbabilityDensity;
  p.deltaProbabilityDensityT = transpose(
    p.deltaProbabilityDensity,
    nbYears - 1
  );

  p.doomProbWithoutYou = probDoom(p.probabilityDensity);
  p.doomProbWithYou = probDoom(p.shiftedProbabilityDensity);

  p.saveProb = p.doomProbWithoutYou - p.doomProbWithYou;

  return p;
};

// IT IS WRONG, SHOULD BE ABOUT PROB F FUNCTION
const shiftProbDensity = (
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

const probDoom = (probabilityDensity: number[][]): number => {
  let result = 0;
  for (let aisYear = 0; aisYear < nbYears; aisYear++) {
    for (let agiYear = 0; agiYear < aisYear; agiYear++) {
      result += probabilityDensity[agiYear][aisYear];
    }
  }
  return result;
};
