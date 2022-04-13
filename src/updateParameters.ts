import { nbYears } from "./constants";
import {
  crossProduct,
  empty2DArray,
  interpolate,
  transpose,
  triangleDistribution,
} from "./mathUtils";
import { Parameters } from "./types";

export const updateParameters = (p: Parameters): Parameters => {
  p.save_prob = p.agiProb * p.aisProb;

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
    .map((_, i) => 0.5);
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
  p.shiftedProbabilityDensityT = transpose(
    p.shiftedProbabilityDensity,
    nbYears - 1
  );
  return p;
};

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
