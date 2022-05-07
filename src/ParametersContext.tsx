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
  currentSpeedUpChain: number;
  speedUpFactorsChains: SpeedUpFactorChain[];
  setAgiProb: Dispatch<SetStateAction<number>>;
  setAgiWrongProb: Dispatch<SetStateAction<number>>;
  setAisProb: Dispatch<SetStateAction<number>>;
  setAgiDistribution: Dispatch<SetStateAction<PiecewiseDistributionParameters>>;
  setAisDistribution: Dispatch<SetStateAction<PiecewiseDistributionParameters>>;
  setCurrentSpeedUpChain: Dispatch<SetStateAction<number>>;
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

type SpeedUpFactorChain = {
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
  const [agiProb, setAgiProb] = useState<number>(0.5);
  const [agiWrongProb, setAgiWrongProb] = useState<number>(0.8);
  const [aisProb, setAisProb] = useState<number>(0.5);
  const [agiDistribution, setAgiDistribution] =
    useState<PiecewiseDistributionParameters>({
      xCoordinates: [0, 5, 10, nbYears - 1],
      yCoordinates: uniformlyDistributedPoints(distributionPieces),
      length: nbYears,
      area: 1,
    });
  const [aisDistribution, setAisDistribution] =
    useState<PiecewiseDistributionParameters>({
      xCoordinates: [2, 8, 14, nbYears - 1],
      yCoordinates: uniformlyDistributedPoints(distributionPieces),
      length: nbYears,
      area: 1,
    });
  const [currentSpeedUpChain, setCurrentSpeedUpChain] = useState<number>(0);
  const speedUpFactorsChains: SpeedUpFactorChain[] = [
    {
      title: "You increase the speed at which an organisation works",
      description: `Describe what fraction of the AGI safety work your organization is doing,
        and how much you think you will speedup your organization's progress in this direction`,
      speedUpFactors: [
        {
          question: "What fraction of the work is your org. doing?",
          type: "%prob",
          state: useState<number>(0.01),
        },
        {
          question: "How much do you speed it up?",
          type: "%increase",
          state: useState<number>(0.005),
        },
      ],
    },
    {
      title: "You are an independent researcher",
      description: `Describe what fraction of the AGI safety progress your field will be responsible for,
        and how much you think you will speedup your field's progress`,
      speedUpFactors: [
        {
          question: "For what fraction of the progress will you field do?",
          type: "%prob",
          state: useState<number>(0.01),
        },
        {
          question: "How much do you speed it up?",
          type: "%increase",
          state: useState<number>(0.005),
        },
      ],
    },
    {
      title: "You are creating an AGI safety organization",
      description: `Describe how likely you are to be successful at creating this new organization,
      how much it will speed up AGI safety progress if it is successful, 
      how likely it is that you are creating an organization that would have existed otherwise
      (that somebody would have created an organization very similar to yours), 
      and how much you think that you prevent another organization with a similar impact
      on AGI safety from existing (for example, by taking funds it would have used).`,
      speedUpFactors: [
        {
          question: "How likely is it that you will be successful",
          type: "%prob",
          state: useState<number>(0.5),
        },
        {
          question: "How much will your org. speed up the progress?",
          type: "%increase",
          state: useState<number>(0.05),
        },
        {
          question: "How likely is it that it would have existed?",
          type: "%prob",
          state: useState<number>(0.4),
          inverted: true,
        },
        {
          question:
            "How likely is it that you prevent a similar org. from existing?",
          type: "%prob",
          state: useState<number>(0.4),
          inverted: true,
        },
      ],
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

  const speedUp = speedUpFactorsChains[
    currentSpeedUpChain
  ].speedUpFactors.reduce((previousValue, currentValue) => {
    const [value, setValue] = currentValue.state;
    const multiplicativeValue = currentValue.inverted ? 1 - value : value;
    return previousValue * multiplicativeValue;
  }, 1);

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
        currentSpeedUpChain,
        speedUpFactorsChains,
        setAgiProb,
        setAgiWrongProb,
        setAisProb,
        setAgiDistribution,
        setAisDistribution,
        setCurrentSpeedUpChain,
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
