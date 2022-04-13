import { nbYears } from "./constants";
import {
  crossProduct,
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
  console.log(p.speedUpPerYear);

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

  console.log(sum(p.probabilityDensity));
  console.log(sum(p.shiftedProbabilityDensity));

  return p;
};

// IT IS WRONG, SHOULD BE ABOUT PROB F FUNCTION
const shiftProbDensity = (
  array: number[][],
  speedupPerYear: number[]
): number[][] => {
  let result: number[][] = empty2DArray(nbYears, nbYears);

  for (let agiYear = 0; agiYear < nbYears; agiYear++) {
    let aisProgress = 0; // Mesured in year index
    for (let aisYear = 0; aisYear < nbYears; aisYear++) {
      result[agiYear][aisYear] = interpolate(array[agiYear], aisProgress, 0);
      aisProgress += 1 + speedupPerYear[aisYear];
    }
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
