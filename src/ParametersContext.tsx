import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { nbYears } from "./constants";
import { createGenericContext } from "./genericContext";
import {
  constantDistribution,
  crossProduct,
  piecewiseLinearDistribution,
  subtract,
  triangleDistribution,
} from "./mathUtils";
import { PiecewiseDistributionParameters } from "./types";
import { probDoom, shiftProbDensity } from "./updateParametersUtils";

type ParametersContext = {
  agiProb: number;
  aisProb: number;
  agiWrongProb: number;
  agiDistribution: PiecewiseDistributionParameters;
  aisDistribution: PiecewiseDistributionParameters;
  speedUpEveryYear: number;
  speedUpFraction: number;
  setAgiProb: Dispatch<SetStateAction<number>>;
  setAgiWrongProb: Dispatch<SetStateAction<number>>;
  setAisProb: Dispatch<SetStateAction<number>>;
  setAgiDistribution: Dispatch<SetStateAction<PiecewiseDistributionParameters>>;
  setAisDistribution: Dispatch<SetStateAction<PiecewiseDistributionParameters>>;
  setSpeedUpEveryYear: Dispatch<SetStateAction<number>>;
  setSpeedUpFraction: Dispatch<SetStateAction<number>>;
  probabilityDensityAGI: number[];
  probabilityDensityAIS: number[];
  probabilityDensity: number[][];
  deltaProbabilityDensity: number[][];
  doomProbWithoutYou: number;
  doomProbWithYou: number;
  saveProb: number;
};

const [
  useParametersContext,
  ParametersContextProviderBlank,
] = createGenericContext<ParametersContext>();

export const ParametersContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [agiProb, setAgiProb] = useState<number>(0.5);
  const [agiWrongProb, setAgiWrongProb] = useState<number>(0.5);
  const [aisProb, setAisProb] = useState<number>(0.5);
  const [agiDistribution, setAgiDistribution] = useState<
    PiecewiseDistributionParameters
  >({
    xCoordinates: [0, 10, nbYears - 1],
    yCoordinates: [0, 1, 0],
    length: nbYears,
    area: 1,
  });
  const [aisDistribution, setAisDistribution] = useState<
    PiecewiseDistributionParameters
  >({
    xCoordinates: [0, 10, nbYears - 1],
    yCoordinates: [0, 1, 0],
    length: nbYears,
    area: 1,
  });
  const [speedUpEveryYear, setSpeedUpEveryYear] = useState<number>(5e-2);
  const [speedUpFraction, setSpeedUpFraction] = useState<number>(0.5);
  const probabilityDensityAGI = piecewiseLinearDistribution(
    agiDistribution.xCoordinates,
    agiDistribution.yCoordinates,
    agiDistribution.length,
    agiProb * agiWrongProb
  );
  const probabilityDensityAIS = piecewiseLinearDistribution(
    aisDistribution.xCoordinates,
    aisDistribution.yCoordinates,
    aisDistribution.length,
    aisProb
  );
  const probabilityDensity = crossProduct(
    probabilityDensityAIS,
    probabilityDensityAGI
  );
  const speedUpPerYear = constantDistribution(
    nbYears,
    speedUpEveryYear * speedUpFraction
  );
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
    <ParametersContextProviderBlank
      value={{
        agiDistribution,
        aisDistribution,
        speedUpEveryYear,
        speedUpFraction,
        agiProb,
        agiWrongProb,
        aisProb,
        setAgiProb,
        setAgiWrongProb,
        setAisProb,
        setAgiDistribution,
        setAisDistribution,
        setSpeedUpEveryYear,
        setSpeedUpFraction,
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
    </ParametersContextProviderBlank>
  );
};

export { useParametersContext };
