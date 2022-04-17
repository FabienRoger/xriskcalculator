import React, { createContext, ReactNode, useState } from "react";
import { nbYears } from "./constants";
import {
  constantDistribution,
  crossProduct,
  subtract,
  triangleDistribution,
} from "./mathUtils";
import { probDoom, shiftProbDensity } from "./updateParametersUtils";

export const ParametersContext = createContext({
  agiProb: 0,
  agiWrongProb: 0,
  speedUpEveryYear: 0,
  aisProb: 0,
  agiProbModeYear: 0,
  aisProbModeYear: 0,
  setAgiProb: (_) => {},
  setAgiWrongProb: (_) => {},
  setAisProb: (_) => {},
  setAgiProbModeYear: (_) => {},
  setAisProbModeYear: (_) => {},
  setSpeedUpEveryYear: (_) => {},
  probabilityDensityAGI: [0],
  probabilityDensityAIS: [0],
  probabilityDensity: [[0]],
  deltaProbabilityDensity: [[0]],
  doomProbWithoutYou: 0,
  doomProbWithYou: 0,
  saveProb: 0,
});

export const ParametersContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [agiProb, setAgiProb] = useState<number>(0.5);
  const [agiWrongProb, setAgiWrongProb] = useState<number>(0.5);
  const [aisProb, setAisProb] = useState<number>(0.8);
  const [agiProbModeYear, setAgiProbModeYear] = useState<number>(10);
  const [aisProbModeYear, setAisProbModeYear] = useState<number>(10);
  const [speedUpEveryYear, setSpeedUpEveryYear] = useState<number>(5e-2);

  const probabilityDensityAGI = triangleDistribution(
    agiProbModeYear,
    nbYears,
    agiProb * agiWrongProb
  );
  const probabilityDensityAIS = triangleDistribution(
    aisProbModeYear,
    nbYears,
    aisProb
  );
  const probabilityDensity = crossProduct(
    probabilityDensityAIS,
    probabilityDensityAGI
  );
  const speedUpPerYear = constantDistribution(nbYears, speedUpEveryYear);
  const shiftedProbabilityDensity = shiftProbDensity(
    probabilityDensity,
    speedUpPerYear
  );
  const deltaProbabilityDensity = subtract(
    shiftedProbabilityDensity,
    probabilityDensity
  );
  const doomProbWithoutYou = probDoom(probabilityDensity);
  const doomProbWithYou = probDoom(shiftedProbabilityDensity);

  const saveProb = doomProbWithoutYou - doomProbWithYou;

  return (
    <ParametersContext.Provider
      value={{
        agiProb,
        setAgiProb,
        agiWrongProb,
        setAgiWrongProb,
        aisProb,
        setAisProb,
        agiProbModeYear,
        setAgiProbModeYear,
        aisProbModeYear,
        setAisProbModeYear,
        speedUpEveryYear,
        setSpeedUpEveryYear,
        probabilityDensityAGI,
        probabilityDensityAIS,
        probabilityDensity,
        deltaProbabilityDensity,
        doomProbWithoutYou,
        doomProbWithYou,
        saveProb,
      }}
    >
      {children}
    </ParametersContext.Provider>
  );
};
