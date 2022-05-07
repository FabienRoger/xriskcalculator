import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
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
  speedUpFactors: SpeedUpFactor[];
  setAgiProb: Dispatch<SetStateAction<number>>;
  setAgiWrongProb: Dispatch<SetStateAction<number>>;
  setAisProb: Dispatch<SetStateAction<number>>;
  setAgiDistribution: Dispatch<SetStateAction<PiecewiseDistributionParameters>>;
  setAisDistribution: Dispatch<SetStateAction<PiecewiseDistributionParameters>>;
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
};

const [useParametersContext, ParametersContextProviderBlank] =
  createGenericContext<ParametersContext>();

export const ParametersContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [agiProb, setAgiProb] = useState<number>(0.5);
  const [agiWrongProb, setAgiWrongProb] = useState<number>(0.8);
  const [aisProb, setAisProb] = useState<number>(0.5);
  const [agiDistribution, setAgiDistribution] =
    useState<PiecewiseDistributionParameters>({
      xCoordinates: [0, 5, 10, nbYears - 1],
      // xCoordinates: [10, 10, 10, 10],
      yCoordinates: uniformlyDistributedPoints(distributionPieces),
      length: nbYears,
      area: 1,
    });
  const [aisDistribution, setAisDistribution] =
    useState<PiecewiseDistributionParameters>({
      xCoordinates: [2, 8, 14, nbYears - 1],
      // xCoordinates: [10, 10, 10, 10],
      yCoordinates: uniformlyDistributedPoints(distributionPieces),
      length: nbYears,
      area: 1,
    });
  const speedUpFactors: SpeedUpFactor[] = [
    {
      question: "What fraction of the work is your org. doing?",
      type: "%prob",
      state: useState<number>(0.01),
    },
    {
      question: "How much do you speed it up (%)",
      type: "%increase",
      state: useState<number>(0.005),
    },
  ];

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

  const speedUp = speedUpFactors.reduce(
    (previousValue, currentValue) => previousValue * currentValue.state[0],
    1
  );

  const speedUpPerYear = constantDistribution(nbYears, speedUp);
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
        speedUpFactors,
        setAgiProb,
        setAgiWrongProb,
        setAisProb,
        setAgiDistribution,
        setAisDistribution,
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
