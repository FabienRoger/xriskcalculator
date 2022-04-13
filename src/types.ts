export type Parameters = {
  // Inputs
  agiProb: number;
  aisProb: number;
  agiProbModeYear: number;
  aisProbModeYear: number;
  speedUpEveryYear: number;

  // Derived
  speedUpPerYear: number[];
  probabilityDensityAGI: number[];
  probabilityDensityAIS: number[];
  probabilityDensity: number[][];
  probabilityDensityT: number[][];
  shiftedProbabilityDensity: number[][];
  deltaProbabilityDensity: number[][];
  deltaProbabilityDensityT: number[][];

  //Results
  doomProbWithoutYou: number;
  doomProbWithYou: number;
  saveProb: number;
};
