import { probDoom } from "./../utils/updateParametersUtils";
import { nbYears } from "../utils/constants";
import { constantDistribution, zeros2DArray } from "../utils/mathUtils";
import {
  shiftProbDensity,
  shiftProbDensityT,
} from "../utils/updateParametersUtils";
import { expect2DArraysToBeClose, random2DArray } from "./testUtils";

test("shift probability density on no speedup doesn't speed up", () => {
  const density = random2DArray(nbYears, nbYears);
  const noSpeedup = constantDistribution(nbYears, 0);

  const sameDensity = shiftProbDensity(density, noSpeedup);
  expect2DArraysToBeClose(density, sameDensity);
});

test("shift probability density on speedup = 1 halves times", () => {
  const density = random2DArray(nbYears, nbYears);
  const fullSpeedUp1 = constantDistribution(nbYears, 1);
  let halfTimeDensityExpected = zeros2DArray(nbYears, nbYears);
  for (let agiYear = 0; agiYear < nbYears; agiYear++) {
    for (let aisYear = 0; aisYear <= Math.floor(nbYears / 2); aisYear++) {
      halfTimeDensityExpected[agiYear][aisYear] =
        (2 * aisYear < nbYears ? density[agiYear][2 * aisYear] : 0) +
        (2 * aisYear + 1 < nbYears ? density[agiYear][2 * aisYear + 1] : 0);
    }
  }
  const halfTimeDensity = shiftProbDensity(density, fullSpeedUp1);
  expect2DArraysToBeClose(halfTimeDensity, halfTimeDensityExpected);
});

test("double shift works on 2x2 array", () => {
  const density = [
    [0.2, 0.1],
    [0.4, 0.3],
  ];
  expect2DArraysToBeClose(
    shiftProbDensityT(shiftProbDensity(density, [1, 1]), [1, 1]),
    [
      [1, 0],
      [0, 0],
    ]
  );
  expect2DArraysToBeClose(
    shiftProbDensityT(shiftProbDensity(density, [1, 1]), [0, 1]),
    [
      [0.3, 0],
      [0.7, 0],
    ]
  );
  expect2DArraysToBeClose(
    shiftProbDensityT(shiftProbDensity(density, [0, 1]), [0, 1]),
    density
  );
  expect2DArraysToBeClose(
    shiftProbDensityT(shiftProbDensity(density, [0, 1]), [1, 1]),
    [
      [0.6, 0.4],
      [0, 0],
    ]
  );
});

test("doom is diagonal and bellow on 2x2", () => {
  const density = [
    [0.2, 0.1],
    [0.4, 0.3],
  ];
  expect(probDoom(density)).toBeCloseTo(0.6);
});
