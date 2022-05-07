import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  defaultAGIDistributionXCoordinates,
  defaultAGIProb,
  defaultAGIWrongProb,
  defaultAISDistributionXCoordinates,
  defaultAISProb,
  defaultSpeedUpChain,
  defaultSpeedUpFactorsChains,
  defaultSpeedUpRange,
} from "./defaultParameters";
import { PiecewiseDistributionParameters } from "./types";
import { distributionPieces, nbYears } from "./utils/constants";
import { createGenericContext } from "./utils/genericContext";
import {
  constantDistribution,
  crossProduct,
  cumulativeToDensity,
  piecewiseLinearCumulativeDistribution,
  subtract,
  uniformlyDistributedPoints,
} from "./utils/mathUtils";
import { probDoom, shiftProbDensity } from "./utils/updateParametersUtils";

type ParametersContext = {
  agiProb: number;
  aisProb: number;
  agiWrongProb: number;
  agiDistribution: PiecewiseDistributionParameters;
  aisDistribution: PiecewiseDistributionParameters;
  currentSpeedUpChain: number;
  speedUpFactorsChains: SpeedUpFactorChain[];
  speedUpRange: [number, number];
  setAgiProb: Dispatch<SetStateAction<number>>;
  setAgiWrongProb: Dispatch<SetStateAction<number>>;
  setAisProb: Dispatch<SetStateAction<number>>;
  setAgiDistribution: Dispatch<SetStateAction<PiecewiseDistributionParameters>>;
  setAisDistribution: Dispatch<SetStateAction<PiecewiseDistributionParameters>>;
  setCurrentSpeedUpChain: Dispatch<SetStateAction<number>>;
  setSpeedUpRange: Dispatch<SetStateAction<[number, number]>>;
  probabilityDensityAGI: number[];
  probabilityDensityAIS: number[];
  probabilityDensity: number[][];
  deltaProbabilityDensity: number[][];
  doomProbWithoutYou: number;
  doomProbWithYou: number;
  saveProb: number;
};

type SpeedUpFactor = {
  question: string;
  type: "%prob" | "%increase";
  state: [number, Dispatch<SetStateAction<number>>];
  inverted?: boolean;
};

export type SpeedUpFactorChain = {
  title: string;
  description: string;
  speedUpFactors: SpeedUpFactor[];
};

const [useParametersContext, ParametersContextProviderBlank] =
  createGenericContext<ParametersContext>();

export const ParametersContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [agiProb, setAgiProb] = useState<number>(defaultAGIProb);
  const [agiWrongProb, setAgiWrongProb] = useState<number>(defaultAGIWrongProb);
  const [aisProb, setAisProb] = useState<number>(defaultAISProb);
  const [agiDistribution, setAgiDistribution] =
    useState<PiecewiseDistributionParameters>({
      xCoordinates: defaultAGIDistributionXCoordinates,
      yCoordinates: uniformlyDistributedPoints(distributionPieces),
      length: nbYears,
      area: 1,
    });
  const [aisDistribution, setAisDistribution] =
    useState<PiecewiseDistributionParameters>({
      xCoordinates: defaultAISDistributionXCoordinates,
      yCoordinates: uniformlyDistributedPoints(distributionPieces),
      length: nbYears,
      area: 1,
    });
  const [currentSpeedUpChain, setCurrentSpeedUpChain] =
    useState<number>(defaultSpeedUpChain);

  const speedUpFactorsChains: SpeedUpFactorChain[] =
    defaultSpeedUpFactorsChains.map((chain) => ({
      title: chain.title,
      description: chain.description,
      speedUpFactors: chain.speedUpFactors.map((factor) => {
        return {
          question: factor.question,
          type: factor.type,
          state: useState<number>(factor.defaultValue),
          inverted: factor.inverted,
        };
      }) as SpeedUpFactor[],
    }));

  const [speedUpRange, setSpeedUpRange] =
    useState<[number, number]>(defaultSpeedUpRange);

  const probabilityDensityAGI = cumulativeToDensity(
    piecewiseLinearCumulativeDistribution(
      agiDistribution.xCoordinates,
      agiDistribution.yCoordinates,
      agiDistribution.length,
      agiProb * agiWrongProb
    )
  );
  const probabilityDensityAIS = cumulativeToDensity(
    piecewiseLinearCumulativeDistribution(
      aisDistribution.xCoordinates,
      aisDistribution.yCoordinates,
      aisDistribution.length,
      aisProb
    )
  );
  const probabilityDensity = crossProduct(
    probabilityDensityAGI,
    probabilityDensityAIS
  ); // probabilityDensity[agiYear][aisYear]

  const speedUp = speedUpFactorsChains[
    currentSpeedUpChain
  ].speedUpFactors.reduce((previousValue, currentValue) => {
    const [value, setValue] = currentValue.state;
    const multiplicativeValue = currentValue.inverted ? 1 - value : value;
    return previousValue * multiplicativeValue;
  }, 1);

  // Equal to speedUp inside the range and 0 outisde the range
  const speedUpPerYear = constantDistribution(nbYears, speedUp).map((v, i) =>
    i >= speedUpRange[0] && i <= speedUpRange[1] ? v : 0
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
        agiProb,
        agiWrongProb,
        aisProb,
        currentSpeedUpChain,
        speedUpFactorsChains,
        speedUpRange,
        setAgiProb,
        setAgiWrongProb,
        setAisProb,
        setAgiDistribution,
        setAisDistribution,
        setCurrentSpeedUpChain,
        setSpeedUpRange,
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
