import { SpeedUpFactorChain } from "../ParametersContext";
import { nbYears } from "./constants";
import {
  cumulativeToDensity,
  densityToCumulative,
  zeros2DArray,
  interpolate,
  transpose,
} from "./mathUtils";

export const shiftProbDensity = (
  density: number[][],
  speedupPerYear: number[]
): number[][] => {
  let result: number[][] = zeros2DArray(nbYears, nbYears);

  for (let agiYear = 0; agiYear < nbYears; agiYear++) {
    const cumulativeAISProgress = densityToCumulative(density[agiYear]);
    const shiftedCumulativeAISProgress: number[] = [];

    const maxAISProgress =
      cumulativeAISProgress[cumulativeAISProgress.length - 1];

    let aisProgress = 0; // Mesured in year index
    for (let aisYear = 0; aisYear < nbYears; aisYear++) {
      aisProgress += speedupPerYear[aisYear];

      shiftedCumulativeAISProgress.push(
        interpolate(cumulativeAISProgress, aisProgress, maxAISProgress)
      );
      aisProgress++;
    }

    result[agiYear] = cumulativeToDensity(shiftedCumulativeAISProgress);
  }

  return result;
};

export const shiftProbDensityT = (
  density: number[][],
  speedupPerYear: number[]
): number[][] => {
  return transpose(shiftProbDensity(transpose(density), speedupPerYear));
};

export const probDoom = (probabilityDensity: number[][]): number => {
  let result = 0;
  for (let aisYear = 0; aisYear < nbYears; aisYear++) {
    for (let agiYear = 0; agiYear <= aisYear; agiYear++) {
      result += probabilityDensity[agiYear][aisYear];
    }
  }
  return result;
};

export const speedUpFromChain = (chain: SpeedUpFactorChain): number => {
  return chain.speedUpFactors.reduce((previousValue, currentValue) => {
    const [value, _] = currentValue.state;
    const multiplicativeValue = currentValue.inverted ? 1 - value : value;
    return previousValue * multiplicativeValue;
  }, 1);
};
